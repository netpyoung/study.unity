## Dots

- `D`ata `O`riented `T`echnology `S`tack

- https://unity.com/resources/introduction-to-dots-ebook
- Loadmap https://unity.com/roadmap/unity-platform/dots
  - https://docs.unity3d.com/Packages/com.unity.entities@1.3/manual/index.html
  - https://docs.unity3d.com/Packages/com.unity.entities.graphics@1.4/manual/index.html
  - https://docs.unity3d.com/Packages/com.unity.physics@1.3/manual/index.html
  - https://docs.unity3d.com/Packages/com.unity.charactercontroller@1.2/manual/index.html


https://learn.unity.com/project/basics-dots-jobs-entities
https://learn.unity.com/course/dots-best-practices
https://github.com/Unity-Technologies/EntityComponentSystemSamples

Entities.ForEach() relies on a large amount of automatic code generation which significantly slows down iteration speeds on a project. This automatic code-gen also introduces a number of unintuitive edge-cases in which unexpected behavior might occur. Idiomatic foreach is a cleaner, more intuitive interface for iterating over components on the main thread, and IJobEntity / IJobChunk are more explicit ways to express your desired behavior when multithreading is required.


## Burst

- Burst uses a high performance subset of C# called High Performance C# (HPC#).
  -  https://docs.unity3d.com/Packages/com.unity.burst@1.8/manual/csharp-hpc-overview.html
  -  https://docs.unity3d.com/Packages/com.unity.burst@1.8/manual/docs/Presentations.html


|                       |                   |
| --------------------- | ----------------- |
| Unity.Entities        |                   |
| Unity.Collections     |                   |
| Unity.Entities.Hybrid | `Baker`           |
| Unity.Burst           | `[BurstCompile] ` |
| Unity.Transforms      | `LocalTransform ` |
| Unity.Mathematics     | `float3`          |
| Unity.Physics         | `PhysicsVelocity` |

Edit > Project Settings > Editor menu, and enable the Enter Play Mode Options setting, but leave the Reload Domain and Reload Scene boxes disabled.



## Authoring "작성" - "제작"

- Baker는 에디터에서만 실행되고 런타임 시에는 생성된 엔티티 데이터만 사용됩니다.
- Authoring이란, MonoBehaviour와 GameObject 기반의 데이터를 ECS의 엔티티 데이터로 변환하는 과정

`MonoBehaviour => Baker =Authoring=> entity`

``` cs
public class MyAuthoring : MonoBehaviour
{
    public int Value;
}

public struct MyComponent : IComponentData
{
    public int Value;
    public float3 Position;
}

public class MyBaker : Baker<MyAuthoring>
{
    public override void Bake(MyAuthoring authoring)
    {
      Entity entity = GetEntity(TransformUsageFlags.Dynamic);  // 런타임에 필요한 변환 데이터만 포함하도록 최적화합니다
      AddComponent(entity, new MyAuthoring
```



[Flags]
public enum TransformUsageFlags
{
    None = 0,
    Renderable = 1,
    Dynamic = 2,
    WorldSpace = 4,
    NonUniformScale = 8,
    ManualOverride = 0x10
}

|                 |                                                                                          |
| --------------- | ---------------------------------------------------------------------------------------- |
| Dynamic         | 런타임에서 움직이기 위해 LocalTransform과 LocalToWorld를 필요로 하는 엔티티.             |
| ManualOverride  | 변환 과정을 수동으로 제어하고 싶을 때 사용.                                              |
| NonUniformScale | 비균일 스케일(축마다 다른 스케일)이 필요한 엔티티.                                       |
| None            | 해당 엔티티에 Transform 컴포넌트가 필요 없을 때 사용.                                    |
| Renderable      | 엔티티가 렌더링되도록 LocalToWorld만 필요할 때 사용. 이동 관련 컴포넌트는 포함되지 않음. |
| WorldSpace      | 엔티티가 월드 좌표계에서 동작해야 할 때 사용. Dynamic 부모 관계에 영향을 받지 않음.      |

## System

만들어두면 따로 등록하거나 할 필요없이 동작함.

`[ReadOnly]` https://docs.unity3d.com/ScriptReference/Unity.Collections.ReadOnlyAttribute.html
|                 |                 |
| --------------- | --------------- |
| RefRO           | RefRW           |
| EnableableRefRO | EnableableRefRW |

/// RefRW Read/Write stores a reference (with write access) to native memory
//  RefRO ReadOnly
``` cs

// [BurstCompile]을 트리거삼아 로슬린 컴파일 때문에 partial struct
public partial struct UnitMoverSystem : ISystem
{
    [BurstCompile]
    public void OnUpdate(ref SystemState state)
    {
        foreach (RefRW<LocalTransform> localTransform in SystemAPI.Query<RefRW<LocalTransform>>())
        {
            localTransform.ValueRW.Position = localTransform.ValueRO.Position + new float3(1, 0, 0) * SystemAPI.Time.DeltaTime;
        }
    }
}
```

``` cs
// job에는 Execute 메서드가 필수.

[BurstCompile]
public partial struct UnitMover_Job : IJobEntity
{
    public void Execute(in UnitMover_Comp comp, ref LocalTransform localTransform, ref PhysicsVelocity physicsVelocity)
}


public partial struct UnitMoverSystem : ISystem
{
    [BurstCompile]
    public void OnUpdate(ref SystemState state)
    {
        Job job = new Job();
        job.ScheduleParallel() // or job.Run();
```


##
``` cs
void Update()
{
    if (Input.GetMouseButtonDown(1))
    {
        Vector3 mouseWorldPosition = GoMouseWorld.Instance.GetPosition();

        World world = World.DefaultGameObjectInjectionWorld;
        EntityManager manager = world.EntityManager;
        EntityQuery query = new EntityQueryBuilder(Allocator.Temp).WithAll<UnitMover_Comp>().Build(manager);
        NativeArray<Entity> entityArr = query.ToEntityArray(Allocator.Temp);
        NativeArray<UnitMover_Comp> arr = query.ToComponentDataArray<UnitMover_Comp>(Allocator.Temp);
        for (int i = 0; i < arr.Length; ++i)
        {
            UnitMover_Comp comp = arr[i];
            Entity e = entityArr[i];
            comp.TargetPosition = mouseWorldPosition;
            manager.SetComponentData(e, comp);
        }
    }
}
```

##
테그 체크박스

``` cs
public struct Selected_Comp : IComponentData, IEnableableComponent
public override void Bake(Selected_Authoring authoring)
{
    Entity entity = GetEntity(TransformUsageFlags.Dynamic);
    SetComponentEnabled<Selected_Comp>(entity, false);


SystemAPI.Query<>().WithDisabled<Selected_Comp>()
SystemAPI.Query<>().WithPresent<Selected_Comp>()
```

## PhysicsWorldSingleton

``` cs
EntityQuery query = manager.CreateEntityQuery(typeof(PhysicsWorldSingleton));
PhysicsWorldSingleton physics = query.GetSingleton<PhysicsWorldSingleton>();
CollisionWorld collision = physics.CollisionWorld;

UnityEngine.Ray mouseCameraRay = Camera.main.ScreenPointToRay(Input.mousePosition);
int unitLayer = 6;
RaycastInput input = new RaycastInput
{
    Start = mouseCameraRay.GetPoint(0),
    End = mouseCameraRay.GetPoint(9999),
    Filter = new CollisionFilter
    {
        BelongsTo = ~0u,
        CollidesWith = 1u << unitLayer,
        GroupIndex = 0,
    }
};
if (collision.CastRay(input, out Unity.Physics.RaycastHit hit))
{
    if (manager.HasComponent<UnitMover_Comp>(hit.Entity))
    {
        manager.SetComponentEnabled<Selected_Comp>(hit.Entity, true);
    }
}
```

SetComponentEnabled로 컴포넌트를 disable 시 쿼리에서 벗어나게됨



                query.CopyFromComponentDataArray(arr);


## Group

``` cs
[UpdateInGroup(typeof(SimulationSystemGroup), OrderFirst = true)] 
[UpdateBefore(typeof(BeginSimulationEntityCommandBufferSystem))] 
public partial class PreSimulationSystemGroup : ComponentSystemGroup { }
```


UNITY_DISABLE_MANAGED_COMPONENTS 
플레이어 설정 에서 스크립팅 정의 에 UNITY_DISABLE_MANAGED_COMPONENTS 를 추가하여 누군가가 실수로 IComponentData 를 클래스로 선언하는 것을 방지합니다 .


##

LinkedEntityGroupAuthoring
entity == Entity.Null검사는 파괴된 엔터티에 대해 작동하지 않습니다
## 
|                                |
| ------------------------------ |
| CreateEntity / DestroyEntity   |
| Instantiate                    |
| AddComponent / RemoveComponent |
| GetComponent / SetComponent    |

| Component             | Description                                                                                                                                                                 |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Unmanaged components  | The most common component type, but can only store fields of certain types.                                                                                                 |
| Managed components    | A managed component type that can store any field type.                                                                                                                     |
| Shared components     | Components that group entities in chunks based on their values.                                                                                                             |
| Cleanup components    | When you destroy an entity that contains a cleanup component, Unity removes all non-cleanup components. This is useful to tag entities that require cleanup when destroyed. |
| Tag components        | An unmanaged component that stores no data and takes up no space. You can use tag components in entity queries to filter entities.                                          |
| Buffer components     | A component that acts as a resizable array.                                                                                                                                 |
| Chunk components      | A component that stores a value associated with an entire chunk, instead of a single entity.                                                                                |
| Enableable components | A component that can be enabled or disabled on an entity at runtime, without requiring an expensive structural change.                                                      |
| Singleton components  | A component that only has one instance in a given world.                                                                                                                    |


Dragon Crashers - UI Toolkit Sample project https://assetstore.unity.com/packages/essentials/tutorial-projects/dragon-crashers-ui-toolkit-sample-project-231178
QuizU - A UI toolkit sample https://assetstore.unity.com/packages/essentials/tutorial-projects/quizu-a-ui-toolkit-sample-268492?aid=1011l5f3d


https://docs.unity3d.com/Packages/com.unity.entities@1.3/manual/editor-authoring-runtime.html?q=authoring

Authoring mode : 버전 제어되는 데이터(예: 자산, 장면 게임 객체)를 포함합니다. 편집기에서 흰색 또는 회색 원으로 표시됩니다.
Runtime mode : 런타임에서 사용하고 수정하는 데이터를 포함합니다. 예를 들어, Play 모드를 종료할 때 Unity가 파괴하는 데이터 또는 상태입니다. 편집기에서 주황색 또는 빨간색 원으로 표시됩니다.
Mixed mode: 런타임과 실시간을 모두 볼 수 있는 뷰를 나타냅니다.저술데이터이지만저술데이터가 우선합니다. 편집기에서 흰색과 주황색 또는 회색과 빨간색 원으로 표시됩니다.


## quicksheet

SystemAPI.Time.DeltaTime
SystemAPI.Query<>

Entity e = GetEntity(TransformUsageFlags.Dynamic);
AddComponent(e, new Comp_A {});
float3 spawnPos = localTransform.ValueRO.TransformPoint(shootAttack.ValueRO.BulletSpawnLocalPosition);



DisableRendering
A tag component that disables the rendering of an entity.

TransformUsageFlags.NonUniformScale - PostTransformMatrix
                localTransform.ValueRW.Rotation = parentLocalTransform.InverseTransformRotation(quaternion.LookRotation(cameraForward, math.up()));

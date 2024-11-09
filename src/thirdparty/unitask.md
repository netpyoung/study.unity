
## Unity Coroutine

- <https://github.com/Unity-Technologies/UnityCsReference/blob/master/Runtime/Export/Scripting/Coroutine.bindings.cs>

``` cs
public Coroutine StartCoroutine(IEnumerator routine);
public void StopCoroutine(Coroutine routine);

IEnumerator

public abstract class CustomYieldInstruction : IEnumerator
public sealed class Coroutine : YieldInstruction
```

``` plantuml
Caller -> Coroutine: Call
Caller <- Coroutine: Yield
Caller -> Coroutine: Resume
Caller <- Coroutine: Yield

```

## UniTask

- https://github.com/Cysharp/UniTask

### UniTask 특징

- Struct based
- custom AsyncMethodBuilder


``` cs
// https://github.com/Cysharp/UniTask/blob/master/src/UniTask/Assets/Plugins/UniTask/Runtime/PlayerLoopHelper.cs
[RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.BeforeSceneLoad)]
static void Init()
{
    // capture default(unity) sync-context.
    unitySynchronizationContext = SynchronizationContext.Current;
    mainThreadId = Thread.CurrentThread.ManagedThreadId;
    ...
}
```

### UniTask 장/단점

- 테스트코드 유무

UniTaskVoid
Forget()

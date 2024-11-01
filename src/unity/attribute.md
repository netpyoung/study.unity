# attribute


## Runtime

| attr                                   |                                                                                  |
| -------------------------------------- | -------------------------------------------------------------------------------- |
| HelpURLAttribute                       |                                                                                  |
| DisallowMultipleComponent              |                                                                                  |
| HideInCallstackAttribute               | Strip logging callstack                                                          |
| ExecuteAlways                          |                                                                                  |
| ExecuteInEditMode                      |                                                                                  |
| ImageEffectAllowedInSceneView          | Any Image Effect with this attribute can be rendered into the Scene view camera. |
| RuntimeInitializeOnLoadMethodAttribute |                                                                                  |
| SelectionBaseAttribute                 |                                                                                  |
| SerializeField                         |                                                                                  |
| SerializeReference                     |                                                                                  |

<br />

| attr              |        |
| ----------------- | ------ |
| IconAttribute     |        |
| HeaderAttribute   | fields |
| SpaceAttribute    |        |
| TextAreaAttribute |        |
| TooltipAttribute  |        |
| HideInInspector   |        |


## Editor

- <https://docs.unity3d.com/ScriptReference/CallbackOrderAttribute.html>

| attr                               |     |
| ---------------------------------- | --- |
| CanEditMultipleObjects             |     |
| CustomEditor                       |     |
| CustomPreviewAttribute             |     |
| CustomPropertyDrawer               |     |
| DrawGizmo                          |     |
| InitializeOnEnterPlayModeAttribute |     |
| InitializeOnLoad                   |     |
| InitializeOnLoadMethodAttribute    |     |


## RuntimeInitializeOnLoadMethod

- [RuntimeInitializeLoadType](https://docs.unity3d.com/ScriptReference/RuntimeInitializeLoadType.html)

| RuntimeInitializeLoadType | 첫 번째 씬의 오브젝트는 로드 |                                                         |
| ------------------------- | ---------------------------- | ------------------------------------------------------- |
| SubsystemRegistration     | X                            | 런타임을 시작할 때                                      |
| AfterAssembliesLoaded     | X                            | 모든 어셈블리가 로드되고 미리 로드된 에셋이 초기화될 때 |
| BeforeSplashScreen        | X                            | 스플래시 화면이 표시되기 전                             |
| BeforeSceneLoad           | X                            | Awake가 호출되기 전                                     |
| .                         | O                            | Unity MonoBehaviour.Awake                               |
| .                         | O                            | Unity MonoBehaviour.OnEnable                            |
| AfterSceneLoad            | O                            | Awake가 호출된 후                                       |
| .                         | O                            | RuntimeInitializeOnLoadMethod 단독                      |
| .                         | O                            | Unity MonoBehaviour.Start                               |

## Ref

- <https://gist.github.com/hybridherbst/36ae70b6520981c8edc7b478423fae5e>
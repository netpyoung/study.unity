# Input

## Ref

- <https://docs.unity3d.com/Packages/com.unity.inputsystem@1.5/manual/index.html>
- <https://github.com/Unity-Technologies/InputSystem>
- <https://docs.unity3d.com/ScriptReference/Input.GetKey.html>
- <https://github.com/Unity-Technologies/UnityCsReference/blob/master/Modules/Input/Private/Input.cs>
- <https://github.com/Unity-Technologies/UnityCsReference/blob/master/Modules/InputLegacy/Input.bindings.cs>
- <https://docs.google.com/presentation/d/1-FC3ktc4LJ3oHlYOIA4FuIOPVJ4YFg4dvVwczwzNh4s/edit#slide=id.p>

에셋 - paid asset Rewired https://assetstore.unity.com/packages/tools/utilities/rewired-21676

Edit > Project Settings > Input System Package > Input Actions.


InputAction moveAction = InputSystem.actions.FindAction("Move");
Vector2 moveValue = moveAction.ReadValue<Vector2>();
bool jumpValue = jumpAction.IsPressed();


migration - https://docs.unity3d.com/Packages/com.unity.inputsystem@1.11/manual/Migration.html


[**중요한것** 이벤트 처리] https://docs.unity3d.com/Packages/com.unity.inputsystem@1.11/manual/Events.html

InputSystem.onEvent +=
   (eventPtr, device) =>
   {
       Debug.Log($"Received event for {device}");
   };


InputSystem.QueueStateEvent(Mouse.current, new MouseState { position = new Vector2(123, 234) });


var trace = new InputEventTrace(growBuffer: true);
trace.Enable();


class로 맵핑 - https://docs.unity3d.com/Packages/com.unity.inputsystem@1.11/manual/Layouts.html



[지원 장치](https://docs.unity3d.com/Packages/com.unity.inputsystem@1.11/manual/SupportedDevices.html)



햇갈리네

InputSystem.RegisterLayoutOverride(json, name)
InputSystem.RegisterLayout<T>
InputSystem.AddDevice<T>
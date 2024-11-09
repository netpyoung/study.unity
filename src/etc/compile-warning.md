# 컴파일 경고

유니티 흔히 보게 되는 경고

| Warning | type     |                                                                                                                                            |
| ------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| CS4014  | async    | Because this call is not awaited                                                                                                           |
| CS1998  | async    | This async method lacks 'await'                                                                                                            |
| CS0219  | unused   | The variable is assigned but its value is never used                                                                                       |
| CS0168  | unused   | The variable is declared but never used                                                                                                    |
| CS0067  | unused   | The event 'event' is never used                                                                                                            |
| CS0414  | unused   | field assigned but value is never used                                                                                                     |
| CS0612  | obsolete | 'member' is obsolete                                                                                                                       |
| CS0618  | obsolete | 'member' is obsolete: 'text'                                                                                                               |
| CS0109  | hides    | does not hide an accessible member. The new keyword is not required.                                                                       |
| CS0108  | hides    | hides inherited member Use the new keyword if hiding was intended.                                                                         |
| CS0114  | hides    | hides inherited member . To make the current member override that implementation, add the override keyword. Otherwise add the new keyword. |
| CS0162  |          | Unreachable code detected                                                                                                                  |
| CS0252  |          | Possible unintended reference comparison; to get a value comparison, cast the left hand side to type 'Object'                              |


| Warning                                                                                                                                                | type |                                       |
| ------------------------------------------------------------------------------------------------------------------------------------------------------ | ---- | ------------------------------------- |
| [CS8618](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/compiler-messages/nullable-warnings#nonnullable-reference-not-initialized) | null | Nonnullable reference not initialized |
|                                                                                                                                                        |      |                                       |


## Ref

- [Resolve nullable warnings](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/compiler-messages/nullable-warnings)

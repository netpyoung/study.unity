
https://github.com/PlayFab/CSharpSDK

PlayFabClientAPIAsync.cs : https://gist.github.com/yKimisaki/5a3d331a0c1db909d8e10c9ce079b25d

| Playfab SDK |          |                                      |
| ----------- | -------- | ------------------------------------ |
| CSharpSDK   | TAP      | https://github.com/PlayFab/CSharpSDK |
| UnitySDK    | callback | https://github.com/PlayFab/UnitySDK  |

https://community.playfab.com/questions/23516/unity-sdk-vs-c-sdk.html


``` cs
LoginResult result = null;
PlayFabError error = null;

PlayFabClientAPI.LoginWithCustomID(request, x => result = x, x => error = x);
await new WaitUntil(() => result != null || error != null);
if (error != null)
{
    return;
}
```


- netstandard2.0/PlayFabAllSDK.dll
- link.xml

``` xml
<linker>
    <assembly fullname="PlayFabAllSDK">
        <type fullname="*" preserve="all"/>
    </assembly>
</linker>
```


Rename the following variables:

G: Gold coin
M: Recharge Maximum
R: Recharge Rate
T: Time(define 1 day to be 1, then 1 day = 24 hours = 1440 minutes... )

(G >= M): G = G
(G <  M): G = G + (R / T)


- <https://learn.microsoft.com/en-us/rest/api/playfab/economy/inventory/add-inventory-items?view=playfab-rest#request-body>
  - IdempotencyId
# Snippet


``` cs
using UnityEngine;
Color setColor;
ColorUtility.TryParseHtmlString("#7F7E83FF", out setColor);
```



- proguard.txt
  - ref: <https://github.com/playgameservices/play-games-plugin-for-unity/blob/master/scripts/proguard.txt>
  1. ProjectSetting/Player/Publishing Settings으로 접근
  2. Minify에  Release와 Dubug를 체크
  3. Build에 'Custom Proguard File' 체크
  4. Assets/Plugins/Android 폴더에 접근
  5. proguard-user.txt 파일을 열어서 아래의 내용을 추가

``` txt
-keep class com.google.android.gms.games.PlayGames { *; }
-keep class com.google.android.gms.games.leaderboard.** { *; }
-keep class com.google.android.gms.games.snapshot.** { *; }
-keep class com.google.android.gms.games.achievement.** { *; }
-keep class com.google.android.gms.games.event.** { *; }
-keep class com.google.android.gms.games.stats.** { *; }
-keep class com.google.android.gms.games.video.** { *; }
-keep class com.google.android.gms.games.* { *; }
-keep class com.google.android.gms.common.api.ResultCallback { *; }
-keep class com.google.android.gms.signin.** { *; }
-keep class com.google.android.gms.dynamic.** { *; }
-keep class com.google.android.gms.dynamite.** { *; }
-keep class com.google.android.gms.tasks.** { *; }
-keep class com.google.android.gms.security.** { *; }
-keep class com.google.android.gms.base.** { *; }
-keep class com.google.android.gms.actions.** { *; }
-keep class com.google.games.bridge.** { *; }
-keep class com.google.android.gms.common.ConnectionResult { *; }
-keep class com.google.android.gms.common.GooglePlayServicesUtil { *; }
-keep class com.google.android.gms.common.api.** { *; }
-keep class com.google.android.gms.common.data.DataBufferUtils { *; }
-keep class com.google.android.gms.games.quest.** { *; }
-keep class com.google.android.gms.nearby.** { *; }
```
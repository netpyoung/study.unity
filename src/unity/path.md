# ref: http://unitystudy.net/bbs/board.php?bo_table=dustin&wr_id=357


``` txt
[윈도우 에디터]
Application.persistentDataPath : 사용자디렉토리/AppData/LocalLow/회사이름/프로덕트이름
Application.dataPath : 프로젝트디렉토리/Assets
Application.streamingAssetsPath : 프로젝트디렉토리/Assets/StreamingAssets

[윈도우 응용프로그램]
Application.persistentDataPath : 사용자디렉토리/AppData/LocalLow/회사이름/프로덕트이름
Application.dataPath : 실행파일/실행파일_Data
Application.streamingAssetsPath : 실행파일/실행파일_Data/StreamingAssets

[맥 에디터]
Application.persistentDataPath : 사용자디렉토리/Library/Caches/unity.회사이름.프로덕트이름
Application.dataPath : 프로젝트디렉토리/Assets
Application.streamingAssetsPath : 프로젝트디렉토리/Assets/StreamingAssets

[맥 응용프로그램]
Application.persistentDataPath : 사용자디렉토리/Library/Caches/unity.회사이름.프로덕트이름
Application.dataPath : 실행파일.app/Contents
Application.streamingAssetsPath : 실행파일.app/Contents/Data/StreamingAssets

[안드로이드 External]
Application.persistentDataPath : /mnt/sdcard/Android/data/번들이름/files
파일 읽기 쓰기 가능
Application.dataPath : /data/app/번들이름-번호.apk
Application.streamingAssetsPath : jar:file:///data/app/번들이름.apk!/assets  (File이 아닌 WWW로 읽기 가능)

[안드로이드 Internal] 
Application.persistentDataPath : /data/data/번들이름/files/
파일 읽기 쓰기 가능
Application.dataPath : /data/app/번들이름-번호.apk
Application.streamingAssetsPath : jar:file:///data/app/번들이름.apk!/assets (File이 아닌 WWW로 읽기 가능)

[iOS]
Application.persistentDataPath : /var/mobile/Applications/프로그램ID/Documents 
Application.dataPath : /var/mobile/Applications/프로그램ID/앱이름.app/Data
Application.streamingAssetsPath : /var/mobile/Applications/프로그램ID/앱이름.app/Data/Raw  (File 읽기 가능, 쓰기 불가능)

[웹 플랫폼]
웹에서는 명시적인 파일 쓰기 불가능. 애셋번들로 해야함
Application.persistentDataPath : /
Application.dataPath : unity3d파일이 있는 폴더
Application.streamingAssetsPath : 값 없음.
```

| Application.temporaryCachePath |                                                    |
| ------------------------------ | -------------------------------------------------- |
| 윈도우                         | %LocalAppData%/Local/Temp/Temp/%Company%/%Product% |
| Android Internal               | /data/data/%BundleIdentifier%/cache                |
| Android External               | /mnt/sdcard/Android/data/%BundleIdentifier%/cache  |
| iOS                            | /var/mobile/Applications/프로그램ID/Library/Caches |


# accelerator

AssetPipeline2

https://docs.unity3d.com/Manual/UnityAccelerator.html

|                        |                      |               |
| ---------------------- | -------------------- | ------------- |
| 에셋 파이프라인 임포트 | 무료                 | 2019.3 Beta 6 |
| 콜라보레이트 소스 관리 | 팀즈 어드밴스드 구독 |               |

https://hub.docker.com/r/unitytechnologies/accelerator


## 종료

- Windows
  - 설치파일로 설치하면 서비스로 등록이된다.
  - Win + R => services.msc
  - Unity Accelerator

- Mac OS X
  - Run the launchctl command from the terminal to control the “com.unity.accelerator” service from the LaunchControl utility. For more information, visit https://www.launchd.info/.

- Linux
  - Use the service console utility to control the “unity-accelerator” service. For more information, visit http://manpages.ubuntu.com/manpages/bionic/man8/service.8.html.

## 주의

https://forum.unity.com/threads/connection-successful-but-cant-download-using-accelerator.1314711/


``` txt
# Checking-out and checking-in
# These attributes affect how the contents stored in the repository are copied to the working tree files when commands such as git switch,
# git checkout and git merge run. They also affect how Git stores the contents you prepare in the working tree in the repository upon git add and git commit.

# These setting used for:
# Upload and download (cache server): Windows, Unix-based machine

# Text file.
# These files will always have line ending eol=lf because Unity always set eol=lf when these files being created/modified (don't know why)
*.meta          text eol=lf
*.prefab        text eol=lf
*.unity         text eol=lf
*.mat           text eol=lf
*.renderTexture text eol=lf
*.terrainlayer  text eol=lf
*.anim          text eol=lf
*.controller    text eol=lf
*.compute       text eol=lf
*.lighting      text eol=lf
*.asset         text eol=lf

# These files will always have eol being normalized to support cross OS, means that they'll have there eol based on OS (CRLF on Windows or LF on Unix-based)
*.lua           text=auto
*.cs            text=auto
*.txt           text=auto
*.md            text=auto
*.mdown         text=auto
*.xlsx          text=auto
*.xml           text=auto
*.XML           text=auto
*.csv           text=auto
*.h             text=auto
*.shader        text=auto
*.json          text=auto


# Denote all files that are truly binary and should not have eol being modified.
# Image
*.png           binary
*.PNG           binary
*.jpg           binary
*.JPG           binary
*.jpeg          binary
*.JPEG          binary
*.tif           binary
*.psd           binary
*.tga           binary
*.TGA           binary
*.hdr           binary
*.exr           binary
*.cubemap       binary

# 3D model
*.fbx           binary
*.FBX           binary

# Sound
*.wav           binary
*.mp3           binary

# Font
*.ttf           binary
*.TTF           binary

# Other
*.bytes         binary


# Better not touching these files, because don't know how it will affect the project (might update in the future)
# *.gradle
# *.in
# *.dylib
# *.colors
# *.dll
# *.aar
# *.so
# *.a
# *.asmdef
# *.jar
# *.properties
# *.obj
# *.sh
# *.plist
# *.mdb
# *.cginc
# *.projmods
# *.lib
# *.sqlite
# *.mm
# *.db
# *.pdb
# *.m

```

## path

- service: C:\myHome\acc\install\unity-accelerator.exe run --persist C:\myHome\acc\storage
- help: unity-accelerator.exe --all-help

- C:\Users\Eunpyoung Kim\AppData\Local\Programs\unity-accelerator-app
  - unity-accelerator-app.exe , Uninstall unity-accelerator-app.exe

C:\myHome\acc\install
C:\myHome\acc\storage

``` json
{
    "IP": "192.168.1.150",
    "HTTPPort": 7077,
    "ProtobufPort": 10080,

    "MetricReportInterval": "10m0s",
    "ConfigQueryInterval": "24h0m0s",
    "MetricsUpdateInterval": "1m0s",
    "InfoUpdateInterval": "10m0s",
    "MaintenanceStart": "00:00",
    "MaintenanceDuration": "1h0m0s",
    "CDPOptIn": false,
    "CDPAgentUUID": "59c57126-81c5-11ee-9f57-a8a159f81ffb",
    
    "Debug": true,

    "LogUploadEventsBuffer": 100,
    
    "InstallDir": "C:\\Users\\Eunpyoung Kim\\AppData\\Local\\Programs\\unity-accelerator-app\\extrafiles",

    "NoAutoUpdates": false,
    "CollabEnabled": false,
    "ADBV2Enabled": true,
    "LegacyEnabled": false,

    "BinaryDir": "bin",
    "LogDir": "log",
    "RuntimeDir": "runtime",
    "CacheDir": "C:\\myHome\\acc\\storage",
    "CacheDirSplit": 2,

    "CacheMonitorInterval": "1m0s",

    "CacheMaxPending": 100,
    "CacheNoAccessTimes": false,
    "PrefetchMaxPending": 10000,
    "PrefetchConcurrency": 4,
    
    "DefaultHTTPTimeout": "10s",
    "DefaultHTTPKeepAlive": "10s",
    "DefaultHTTPInsecureSkipVerify": false,
    "DefaultHTTPAutoEnableHTTP2": false,
    "DefaultHTTPAttempts": 5,
    "DefaultHTTPDelay": "1s",
    "DefaultHTTPChunkSize": 65536,
    "UTAServiceURL": "https://accelerator.cloud.unity3d.com",
    "UTAServiceTimeout": "10s",
    "UTAServiceKeepAlive": "10s",
    "UTAServiceInsecureSkipVerify": false,
    "UTAServiceAutoEnableHTTP2": false,
    "UTAServiceAttempts": 5,
    "UTAServiceDelay": "1s",
    "UTAServiceChunkSize": 65536,
    "CollabURL": "https://collab.cloud.unity3d.com",
    "CollabTimeout": "10m0s",
    "CollabKeepAlive": "10s",
    "CollabInsecureSkipVerify": false,
    "CollabAutoEnableHTTP2": false,
    "CollabAttempts": 5,
    "CollabDelay": "1s",
    "CollabChunkSize": 65536,
    "CoreURL": "https://api.unity.com/v1/core",
    
    
    "ProtobufPerStreamBuffer": 16,
    "ProtobufTLSRequired": false,
    "ProtobufAuthRequired": false,
    "ProtobufBlobHashRequired": false,
    "ProtobufBlobHashValidateGets": false,
    "ProtobufBlobHashValidatePuts": false,
    "ProtobufForwardPuts": "",
    "ProtobufForwardPutsQueue": 100000,
    "ProtobufForwardPutsConcurrency": 100,
    "ProtobufForwardPutsErrorRateLimit": 60,
    "ProtobufForwardPutsErrorRateInterval": "1m0s",
    "ProtobufForwardPutsErrorRatePunishment": "1h0m0s",
    "ProtobufRetrieveItems": "",
    "ProtobufRetrieveItemsConcurrency": 100,
    "ProtobufRetrieveItemsInterval": "10m0s"
}
```
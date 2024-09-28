# log

- unity logging도 있긴한데 그냥 logging은 따로 라이브러리 만드는게 좋을듯.

### UnityEngine

- [Debug](https://docs.unity3d.com/ScriptReference/Debug.html)
  - Debug.unityLogger.logEnabled
- [Logger](https://docs.unity3d.com/ScriptReference/Logger.html)
- [ILogHandler](https://docs.unity3d.com/ScriptReference/ILogHandler.html)
- Attribute
  - [HideInCallstackAttribute](https://docs.unity3d.com/ScriptReference/HideInCallstackAttribute.html)
  - [ConditionalAttribute](https://learn.microsoft.com/en-us/dotnet/api/system.diagnostics.conditionalattribute?view=net-8.0)

- src
  - [src: ILogHandler](https://github.com/Unity-Technologies/UnityCsReference/blob/master/Runtime/Export/Logging/ILogHandler.cs)
  - [src: DebugLogHandler](https://github.com/Unity-Technologies/UnityCsReference/blob/master/Runtime/Export/Logging/DebugLogHandler.cs)
  - <https://github.com/Unity-Technologies/UnityCsReference/blob/611307378c56a1b2f90eb1018332166cbe3c9c03/Runtime/Export/Scripting/StackTrace.cs#L154>

### com.unity.logging

- [github: com.unity.logging](https://github.com/needle-mirror/com.unity.logging)
- [CHANGELOG.md](https://github.com/needle-mirror/com.unity.logging/blob/master/CHANGELOG.md)
- [HideInStackTrace ](https://docs.unity3d.com/Packages/com.unity.logging@1.3/api/Unity.Logging.HideInStackTrace.html)

### asset

- [Editor Console Pro](https://assetstore.unity.com/packages/tools/utilities/editor-console-pro-11889)
- [SRDebugger - Console & Tools On-Device](https://assetstore.unity.com/packages/tools/gui/srdebugger-console-tools-on-device-27688)



## collector

``` elk
E L K
E : elasticsearch (db 겸 query machine)
L : logstash - collector | indexer
K : Kibana ( UI viewer )

docker - https://github.com/deviantony/docker-elk

kibana plugin - realtime tail - https://github.com/sivasamyk/logtrail


ElasticSearch
http://localhost:9200/

https://github.com/mobz/elasticsearch-head - 단순 테이블 보기

LogStash
logstash.bat -f logstash.conf
입력 - input
필터 - filter
 grok을 이용 비정형 데이터에서 구조 도출
 mutate
 date
출력 - output


Kibana
http://localhost:5601
```


https://github.com/grafana/loki - Loki is a horizontally-scalable, highly-available, multi-tenant log aggregation system
https://github.com/grafana/grafana - ui Visualize 


- NSSM
  - NSSM - the Non-Sucking Service Manager
  - https://nssm.cc/download
  - https://woony-sik.tistory.com/9

focus on pronunciation.
https://www.amazon.com/dp/0133046850/ref=cm_sw_r_cp_awdb_l5R.ybCQE0NQR





- <https://github.com/ErnSur/Unity-Http-Debugger>
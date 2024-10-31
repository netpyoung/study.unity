# Scriptable Build Pipeline SBP

- SBP(Scriptable Build Pipeline) (Unity 2018.3 ~ )



``` cs
AssetBundleCreateRequest abcr = AssetBundle.LoadFromFileAsync(fpath);               // 비동기: 번들로드(파일로부터)
AssetBundle ab = abcr.assetBundle;
AssetBundleRequest abr = ab.LoadAssetAsync<CompatibilityAssetBundleManifest>(name); // 비동기: 에셋로드(번들로부터)
UnityEngine.Object obj = abr.asset;
_manifest = obj as CompatibilityAssetBundleManifest;
```


- [Scriptable Build Pipeline - 2018.3 Getting Started Guide](https://docs.google.com/document/d/1uuiEDV7WqpHEylzE4GQwOztCttrwPu6ak0kfELz6ilc/edit#)
- [src(mirror)](https://github.com/needle-mirror/com.unity.scriptablebuildpipeline)
- [doc](https://docs.unity3d.com/Packages/com.unity.scriptablebuildpipeline@2.0/manual/index.html)



### 현재와 SBP 비교

#### 빌드 결과물

``` txt
// Built-in
// outputPath : "__AssetBundle/Windows"

|- prj/
    |- Assets/
    |- __AssetBundle/Windows/
        |- Windows                   - class AssetBundleManifest
        |- Windows.manifest
        |- sphere
        |- sphere.manifest
        |- cube
        |- cube.manifest
```

``` txt
// SBP
// outputPath : "__AssetBundle/Windows"

|- prj/
    |- Assets/
    |- __AssetBundle/Windows/
        |- buildlogtep.json
        |- Windows.manifest
        |- sphere
        |- cube
```

- buildlogtep.json
  - tep(Trace Event Profileing)
  - <https://www.chromium.org/developers/how-tos/trace-event-profiling-tool> 로 확인 가능하다
    - 크롬 열고 주소창에 `chrome://tracing`

### 기본(옵션없이) 빌드시 로드시 이름

| 방식 | 로드 가능한 이름                                         |
| ---- | -------------------------------------------------------- |
| 기존 | Assets/ExampleFolder/Asset.prefab , Asset , Asset.prefab |
| SBP  | Assets/ExampleFolder/Asset.prefab                        |

- SBP에서는 저대로는 불편하니 따로 AssetBundleBuild의 addressableNames을 지정해 주어야 한다.
- 현재 SBP에서는 AssetBundle Variants을 지원하지 않는다.

``` cs
// ref: https://docs.unity3d.com/ScriptReference/AssetBundleBuild.html
// ref: https://github.com/Unity-Technologies/UnityCsReference/blob/61f92bd79ae862c4465d35270f9d1d57befd1761/Editor/Mono/BuildPipeline.bindings.cs#L176
public struct AssetBundleBuild
{
    // - assetBundleName 은 lower_case만 올 수 있다.(under_score방식으로 내이밍을 지정하야할듯.)
    public string   assetBundleName;
    public string   assetBundleVariant;
    public string[] assetNames;
    [NativeName("nameOverrides")]
    public string[] addressableNames;
}

// 예) 확장자 없는 소문자 파일명.
AssetBundleBuild[] bundles = ContentBuildInterface.GenerateAssetBundleBuilds();
for (var i = 0; i < bundles.Length; ++i)
{
    bundles[i].addressableNames = bundles[i].assetNames.Select(x => Path.GetFileNameWithoutExtension(x).ToLower()).ToArray();
}
```

### 빌드

``` cs
// Built-in - BuildPipeline.cs
// AssetBundleManifest 반환
public static AssetBundleManifest BuildAssetBundles(string outputPath, BuildAssetBundleOptions assetBundleOptions, BuildTarget targetPlatform);
public static AssetBundleManifest BuildAssetBundles(string outputPath, AssetBundleBuild[] builds, BuildAssetBundleOptions assetBundleOptions, BuildTarget targetPlatform);

// SBP - CompatibilityBuildPipeline.cs
// CompatibilityAssetBundleManifest 반환
public static CompatibilityAssetBundleManifest
  BuildAssetBundles(string outputPath, BuildAssetBundleOptions assetBundleOptions, BuildTarget targetPlatform);
public static CompatibilityAssetBundleManifest
  BuildAssetBundles(string outputPath, AssetBundleBuild[] builds, BuildAssetBundleOptions assetBundleOptions, BuildTarget targetPlatform)
```

## 더 알아보기

### guid and LocalID(fileID)

|                          |                                                                         |
| ------------------------ | ----------------------------------------------------------------------- |
| guid                     | 파일 위치 추상화(따라서 파일위치를 옮겨도 guid를 추적해서 찾음)         |
| local ID                 | UnityEngine.Object 구분                                                 |
| Instance ID              | guid, localID 비교는 느리기에 해당 정보를 담은 integer. 세션 라이프타임 |
| PersistentManager(Cache) | Instance ID변환 정보 관리                                               |

시작할 때, Instance ID 캐시는 프로젝트에 내장되어있는 모든 오브젝트에 대한 데이터(즉, 씬에서 참조된 데이터)와 Resources 폴더에 포함된 오브젝트에 대한 데이터로 초기화 됩니다. 런타임에 새로운 애셋이 임포트되거나 애셋번들(AssetBundle)로 부터 오브젝트가 로드되면[3], 해당 정보가 캐시에 추가 저장됩니다. Instance ID 정보는 생성된후 일정 시점이 지나면 삭제됩니다. Instance ID의 삭제는 File GUID와 Local ID에 대한 접근을 제공하는 애셋번들이 해제(unload)될 때 발생합니다.

애셋번들의 해제가 발생하면 Instance ID는 더이상 유효하지 않은 데이터로 간주되어, Instance ID, File GUID, Local ID간의 변환 정보(Mapping)는 메모리 회수를 위해서 삭제됩니다
 해당 애셋번들이 다시 로드되면, 이 애셋번들로부터 로드된 모든 오브젝트를 위한 새로운 Instance ID가 생성됩니다.



- <https://forum.unity.com/threads/how-to-get-filename-from-the-local-file-id.693103/#post-4643452>

``` yml
# material.mat
# LocalID : 2100000
%YAML 1.1
%TAG !u! tag:unity3d.com,2011:
--- !u!21 &2100000
Material:
  serializedVersion: 6
  m_ObjectHideFlags: 0
```

``` yml
# material.meta
# GUID: 66b49cbbb446b3c4b9801dc253c7a006
fileFormatVersion: 2
guid: 66b49cbbb446b3c4b9801dc253c7a006
NativeFormatImporter:
  externalObjects: {}
  mainObjectFileID: 2100000
  userData: 
  assetBundleName: 
  assetBundleVariant: 

```

``` yml
# sphere.prefab
--- !u!23 &6079199813687459354
MeshRenderer:
  m_Materials:
  - {fileID: 2100000, guid: 66b49cbbb446b3c4b9801dc253c7a006, type: 2}
```

### 파일 파해치기

``` txt
// 에셋번들 파일 확인해보기
// 사용툴은 다음 위치에 있다
//   Editor/Data/Tools/binary2text
//   Editor/Data/Tools/WebExtract

> WebExtract sphere
Extracting file 'sphere'...
  stream version: 7
  unity version: 5.x.x
  unity revision: 2020.3.19f1
  data size: 26159 bytes
  creating folder 'sphere_data'
All ok!

> binary2text sphere_data/CAB-8a62162a93540272034efdc07505212c
> cat sphere_data/CAB-8a62162a93540272034efdc07505212c.txt
External References
path(1): "Library/unity default resources" GUID: 0000000000000000e000000000000000 Type: 0
path(2): "Resources/unity_builtin_extra" GUID: 0000000000000000f000000000000000 Type: 0


ID: -7488534698980864708 (ClassID: 33) MeshFilter
    ...
    ...
ID: 1 (ClassID: 142) AssetBundle
    m_Name "sphere" (string)
    m_PreloadTable  (vector)
        size 9 (int)
        data  (PPtr<Object>)
            m_FileID 2 (int)
            m_PathID 6 (SInt64)
        data  (PPtr<Object>)
            m_FileID 1 (int)
            m_PathID 10207 (SInt64)
        data  (PPtr<Object>)
            m_FileID 0 (int)
            m_PathID -7488534698980864708 (SInt64)
        data  (PPtr<Object>)
            m_FileID 0 (int)
            m_PathID -4850512016903265157 (SInt64)
        data  (PPtr<Object>)
            m_FileID 0 (int)
            m_PathID -1682175822698124268 (SInt64)
        data  (PPtr<Object>)
            m_FileID 0 (int)
            m_PathID 527392551035676803 (SInt64)
        data  (PPtr<Object>)
            m_FileID 0 (int)
            m_PathID 1116404136810533953 (SInt64)
        data  (PPtr<Object>)
            m_FileID 0 (int)
            m_PathID 4331563248782702586 (SInt64)
        data  (PPtr<Object>)
            m_FileID 0 (int)
            m_PathID 7652242249691182802 (SInt64)

    m_Container  (map)
        size 1 (int)
        data  (pair)
            first "assets/new folder/sphere.prefab" (string)
            second  (AssetInfo)
                preloadIndex 0 (int)
                preloadSize 9 (int)
                asset  (PPtr<Object>)
                    m_FileID 0 (int)
                    m_PathID 1116404136810533953 (SInt64)

    m_MainAsset  (AssetInfo)
        preloadIndex 0 (int)
        preloadSize 0 (int)
        asset  (PPtr<Object>)
            m_FileID 0 (int)
            m_PathID 0 (SInt64)
    m_RuntimeCompatibility 1 (unsigned int)
    m_AssetBundleName "sphere" (string)
    m_Dependencies  (vector)
        size 0 (int)

    m_IsStreamedSceneAssetBundle 0 (bool)
    m_ExplicitDataLayout 0 (int)
    m_PathFlags 7 (int)
    m_SceneHashes  (map)
        size 0 (int)
```

### sphere.manifest

|                                                  | byte   | CRC32      |
| ------------------------------------------------ | ------ | ---------- |
| sphere                                           | 26159  | 371129445  |
| sphere_data\CAB-8a62162a93540272034efdc07505212c | 132220 | 3139283453 |

``` txt
ManifestFileVersion: 0
CRC: 3139283453
Hashes:
  AssetFileHash:
    serializedVersion: 2
    Hash: ad5878df927dcf4b8029307918156950
  TypeTreeHash:
    serializedVersion: 2
    Hash: b1c185c72cdafab906a20d7064a9cd59
HashAppended: 0
ClassTypes:
- Class: 1
  Script: {instanceID: 0}
- Class: 4
  Script: {instanceID: 0}
- Class: 21
  Script: {instanceID: 0}
- Class: 23
  Script: {instanceID: 0}
- Class: 33
  Script: {instanceID: 0}
- Class: 43
  Script: {instanceID: 0}
- Class: 48
  Script: {instanceID: 0}
- Class: 135
  Script: {instanceID: 0}
SerializeReferenceClassIdentifiers: []
Assets:
- Assets/New Folder/Sphere.prefab
Dependencies: []

```

### AssetFileHash와 TypeTreeHash

|               |     |
| ------------- | --- |
| AssetFileHash |     |
| TypeTreeHash  |     |

#### AssetFileHash

ex) 파일 내용 변경

```yaml
# A.txt => A
  CRC: 4046214375
  AssetFileHash: 61d898772c9a833793dbaf6bebe6e50b
  TypeTreeHash: 1033bf7ddfd4c6d43e7a6382c0a0a61a
# A.txt => Ab
  CRC: 2593905627
  AssetFileHash: 575d09e564dfa87a3d1944e6ec6c6ee0
  TypeTreeHash: 1033bf7ddfd4c6d43e7a6382c0a0a61a
# A.txt => A
  CRC: 4046214375
  AssetFileHash: caea7ff4da8c26db06dda68fe7fe81a9
  TypeTreeHash: 1033bf7ddfd4c6d43e7a6382c0a0a61a
```

#### TypeTreeHash

ex) 스크립트 코드 변경

```yaml
# Aprefab.prefab(번들) - AScript.cs(번들로 할 수 없음.)
# aprefab.manifest
CRC: 420622857
Hashes:
  AssetFileHash:
    serializedVersion: 2
    Hash: bd07c562a9845e21ce9b377999a8d5e5
  TypeTreeHash:
    serializedVersion: 2
    Hash: cb793a1a0e0d96bcd61e08b4b42ececd
  Script: {fileID: 11500000, guid: 64be57d524a10794bb32a78c6b86769a, type: 3}


# public int a = 10; 라인 추가.
CRC: 2838598984
Hashes:
  AssetFileHash:
    serializedVersion: 2
    Hash: bd07c562a9845e21ce9b377999a8d5e5
  TypeTreeHash:
    serializedVersion: 2
    Hash: 9523d3cf1bd04d4ae7937ea9cae4ba0e
  Script: {fileID: 11500000, guid: 64be57d524a10794bb32a78c6b86769a, type: 3}



# public int a = 10; 라인 삭제.
CRC: 3037027640
Hashes:
  AssetFileHash:
    serializedVersion: 2
    Hash: bd07c562a9845e21ce9b377999a8d5e5
  TypeTreeHash:
    serializedVersion: 2
    Hash: cb793a1a0e0d96bcd61e08b4b42ececd
  Script: {fileID: 11500000, guid: 64be57d524a10794bb32a78c6b86769a, type: 3}
```

# Assetbundle

## 목차

<!-- toc -->

## AssetBundle이란

| .           | .                                                              |
| ----------- | -------------------------------------------------------------- |
| Asset       | prefab, scene, texture, material, animation, audio, script ... |
| AssetBundle | group of assets in single file.                                |

<br />

| 버전    | 특징                      | 압축      |
| ------- | ------------------------- | --------- |
| 2018.4+ | Scriptable Build Pipeline | lzma, lz4 |
| 2018.2+ | Addressables              |           |
| 5.3     | lz4 지원                  | lzma, lz4 |
| 5.0     | AssetBundleManifest 도입  | lzma      |
| 4.x     | Push/PopAssetDependencies | lzma      |

- 에셋번들을 다룰때에는 의존성(Dependency)관리가 관건


## 방식

### 예전방식 (Unity 4.x)

에셋번들 의존성 관리를 Push/Pop으로 수동으로 관리를 했었다.

``` cs
BuildPipeline.PushAssetDependencies();
BuildPipeline.BuildAssetBundle(AssetDatabase.LoadMainAssetAtPath("Assets/ShadersList.prefab"), null, "WebPlayer/ShadersList.unity3d", options);
BuildPipeline.PopAssetDependencies();
```


### 현재방식 (Unity 5.x ~ )

- 알아서 의존성 관리를 해준다.
- 번들검색
  - 프로젝트 윈도우(Ctrl + F5)에서 bundle 검색시 검색창에 `b:`를 입력
- 번들 지정
  - 수동은 인스펙터 하단에 `Asset Labels > AssetBundle [name] [variant]` 
  - 코드지정은 `AssetBundleBuild`이용.

```cs
// ref: http://docs.unity3d.com/ScriptReference/BuildPipeline.BuildAssetBundles.html
// ref: http://docs.unity3d.com/ScriptReference/BuildAssetBundleOptions.html

public static AssetBundleManifest
  BuildAssetBundles(
      string outputPath,
      BuildAssetBundleOptions assetBundleOptions = BuildAssetBundleOptions.None,
      BuildTarget targetPlatform = BuildTarget.WebPlayer
);

public static AssetBundleManifest
  BuildAssetBundles(
      string outputPath,
      AssetBundleBuild[] builds,
      BuildAssetBundleOptions assetBundleOptions = BuildAssetBundleOptions.None,
      BuildTarget targetPlatform = BuildTarget.WebPlayer
);


AssetBundleBuild
http://docs.unity3d.com/ScriptReference/AssetBundleBuild.html
    assetBundleName	AssetBundle name.
    assetBundleVariant	AssetBundle variant.
    assetNames	Asset names which belong to the given AssetBundle.

AssetBundleManifest
http://docs.unity3d.com/ScriptReference/AssetBundleManifest.html
    GetAllAssetBundles	Get all the AssetBundles in the manifest.
    GetAllAssetBundlesWithVariant	Get all the AssetBundles with variant in the manifest.
    GetAllDependencies	Get all the dependent AssetBundles for the given AssetBundle.
    GetAssetBundleHash	Get the hash for the given AssetBundle.
    GetDirectDependencies	Get the direct dependent AssetBundles for the given AssetBundle.

```

| BuildAssetBundleOptions (Flag)          | 설명                                                                                             |
| --------------------------------------- | ------------------------------------------------------------------------------------------------ |
| None                                    | .                                                                                                |
| UncompressedAssetBundle                 | 압축안함                                                                                         |
| DisableWriteTypeTree                    | type information 포함 안함                                                                       |
| DeterministicAssetBundle                | Builds an asset bundle using a hash for the id of the object stored in the asset bundle.         |
| ForceRebuildAssetBundle                 | 강제 재빌드                                                                                      |
| IgnoreTypeTreeChanges                   | Ignore the type tree changes when doing the incremental build check.                             |
| AppendHashToAssetBundleName             | Append the hash to the assetBundle name.                                                         |
| ChunkBasedCompression                   | Use chunk-based LZ4 compression when creating the AssetBundle.                                   |
| StrictMode                              | 에러시 빌드 안함                                                                                 |
| DryRunBuild                             | dry run build.                                                                                   |
| DisableLoadAssetByFileName              | Disables Asset Bundle LoadAsset by file name.                                                    |
| DisableLoadAssetByFileNameWithExtension | Disables Asset Bundle LoadAsset by file name with extension.                                     |
| AssetBundleStripUnityVersion            | Removes the Unity Version number in the Archive File & Serialized File headers during the build. |

#### 현재방식 문제

- 레퍼런스 카운트관리로 로드 언로드 기능이 없어서 중복 로드가 가능
- 비동기 로드가 2개 있는데 이게 비동기여서 동기화 문제를 처리하기 곤란
  - 파일에서 번들을 로드하는 AssetBundleCreateRequest
  - 번들에서 에셋을 로드하는 AssetBundleRequest


## 구조

### AssetBundleManifest

- include all the assetbundles
- include all the assetbundle dependencies

### .manifest

- CRC
- Asset names
- Dependent AssetBundle names
- Hash
- ClassTypes

### AssetBundle을 다시 빌드하는 경우

- type tree가 변경되었을 경우.
- asset 파일이 변경되었을 경우
  - runtime class type tree change
    - upgrade to a new version of unity-asset-bundles/
  - script type tree change
    - change the public members ...

### Lz4 지원

|       | BuildCompression | 압축률 | 해제시간 | 기타                                      |
| ----- | ---------------- | ------ | -------- | ----------------------------------------- |
| Lzma  | LZMA             | 큼     | 큼       | 통으로 압축                               |
| Lz4HC | LZ4              | 중간   | 중간     | Lz4에서 압축률을 높인것(High-Compression) |
| Lz4   | LZ4Runtime       | 작음   | 작음     | Chunk단위 압축/로드                       |

| 번들 압축타입별 성능            | LZ4일때                    | LZMA일때                                                |
| ------------------------------- | -------------------------- | ------------------------------------------------------- |
| assetBundle.LoadFromFile(Async) | 디스크 읽기(Mem: 헤더크기) | 디스크 읽기 + LZMA 해제 + LZ4압축(Mem: LZ4 bundle size) |

- `AssetBundle.LoadFromFileAsync`은 LZMA일때 메모리를 사용한다.
  - `AssetBundle.RecompressAssetBundleAsync`를 이용하여 LZ4로 변환하여 저장하여 성능향상을 도모할 수 있다.
  - BuildCompression.LZ4Runtime 처럼 뒤에 Runtime이 붙는걸로 변환해야하며 아니면 ArgumentException 이 뜬다.


## UnityWebRequest(UWR)와 Caching

- 2017.1 부터 캐싱 api가 확장됨 https://docs.unity3d.com/ScriptReference/Caching.html

If you provide a version parameter to the UWR API, Unity stores your AssetBundle data in the Disk Cache. If you do not provide a version parameter, Unity uses the Memory Cache. The version parameter can be either a version number or a hash.

| Caching.compressionEnabled |                                                                                                                                                               |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| true                       | Unity applies LZ4 compression when it writes AssetBundles to disk for all subsequent downloads. It does not compress existing uncompressed data in the cache. |
| false                      | Unity applies no compression when it writes AssetBundles to disk.                                                                                             |


--------------------------------------------------------------------------------------------------------------------------------------------------------


|      |                                                                                |                                                                  |
| ---- | ------------------------------------------------------------------------------ | ---------------------------------------------------------------- |
| CRC  | CRC32                                                                          | bytes                                                            |
| Hash | [SpookyHashV2](https://en.wikipedia.org/wiki/Jenkins_hash_function#SpookyHash) | asset files, type trees, buildtarget, buildoption, callbacks ... |



CollectDependencies : on
DeterministicAssetBundle : on
CompleteAssets : deprecated
DisableWritetypeTree : nope
UncompressedAssetBundle : nope

-new
ForceRebuildAssetBundle
IgnoreTypeTreeChanges
AppendHashToAssetBundleName
 - get different name when bundle changes
 - easy to detect if you want to upload to CDN
 

=======================================
Editor Simulation
Use assetbundle without actually building them
GetAssetPathsFromAssetBundleAndAssetName


=======================================

assetbundle hash
 - asset files
 - type trees
 - buildtarget
 - buildoptino
 - callbacks
 - ...



 % name을 뺐을시 빌드되는 bundle의 삭제는 일어나지 않았다.
=======================================


AppendHashToAssetBundleName
- Get different name when bundle changes.



A.assetBundleName  = "group0/a"

assetBundleName 은 소문자만 올 수 있다.(under_score방식으로 내이밍을 지정하야할듯.)

heirachy search filter
b: - bundle

b:group0 A


# Manifest
* CRC
* Asset names
* Dependent AssetBundle names
* Hash
* ClassTypes

# Single manifest file
include all the assetbundles
include all the assetbundle dependencies



        // AssetImporter atPath = AssetImporter.GetAtPath(AssetDatabase.GetAssetPath(current));



delta building
http://blog.juiceboxmobile.com/2013/06/19/per-asset-versioning-with-unity-asset-bundles/



# BuildAssetBundleOptions


```txt
    CollectDependencies : on
    DeterministicAssetBundle : on
    CompleteAssets : deprecated
    DisableWritetypeTree : nope
    UncompressedAssetBundle : nope


    ForceRebuildAssetBundle
    IgnoreTypeTreeChanges
    AppendHashToAssetBundleName
     - get different name when bundle changes
     - easy to detect if you want to upload to CDN
```



----
# AssetBundleBuild
* http://docs.unity3d.com/ScriptReference/AssetBundleBuild.html
* assetBundleName 은 lower_case만 올 수 있다.(under_score방식으로 내이밍을 지정하야할듯.)

```txt
    assetBundleName	AssetBundle name.
    assetBundleVariant	AssetBundle variant.
    assetNames	Asset names which belong to the given AssetBundle.
```



----
# AssetBundleManifest
* http://docs.unity3d.com/ScriptReference/AssetBundleManifest.html

```txt
    GetAllAssetBundles	Get all the AssetBundles in the manifest.
    GetAllAssetBundlesWithVariant	Get all the AssetBundles with variant in the manifest.
    GetAllDependencies	Get all the dependent AssetBundles for the given AssetBundle.
    GetAssetBundleHash	Get the hash for the given AssetBundle.
    GetDirectDependencies	Get the direct dependent AssetBundles for the given AssetBundle.
```



---
# 에셋번들 빌드
```yaml
r_in
  group_00
    a - "group_00/a"
  group_01
    b - "group_01/b"


r_out
  r_out           - assetbundle "AssetBundleManifest"
  r_out.manifest
  group_00
    a             - assetbundle
    a.manifest
  group_01
    b             - assetbundle
    b.manifest
```

# a.manifest
```yaml
ManifestFileVersion: 0
CRC: 1388230569
Hashes:
  AssetFileHash:
    serializedVersion: 2
    Hash: 61d898772c9a833793dbaf6bebe6e50b
  TypeTreeHash:
    serializedVersion: 2
    Hash: 1033bf7ddfd4c6d43e7a6382c0a0a61a
HashAppended: 0
ClassTypes:
- Class: 49
  Script: {instanceID: 0}
Assets:
- Assets/r_in/A.txt
Dependencies: []
```

----

# Manifest
* CRC
* Asset names
* Dependent AssetBundle names
* Hash
* ClassTypes


----
# AssetBundleManifest
* include all the assetbundles
* include all the assetbundle dependencies


----
# assetbundle hash의 구성 요소
* asset files
* type trees
* buildtarget
* buildoptino
* callbacks
* ...

----
## CRC(Cyclic redundancy check)
* https://en.wikipedia.org/wiki/Cyclic_redundancy_check

A cyclic redundancy check (CRC) is an error-detecting code commonly used in digital networks and storage devices to detect accidental changes to raw data. Blocks of data entering these systems get a short check value attached, based on the remainder of a polynomial division of their contents. On retrieval the calculation is repeated, and corrective action can be taken against presumed data corruption if the check values do not match.

```
message : 11010011101100
polynomial : (1x^3 + 0x^2 + 1x^1 + 1x^0) = 1011

  11010011101100 000 (padding)
/ 1011
--------------------
  00000000000000 100 (3bit crc)
```
----
## ex) 파일 내용 변경

```yaml
A.txt => A
  CRC: 4046214375
  AssetFileHash: 61d898772c9a833793dbaf6bebe6e50b
  TypeTreeHash: 1033bf7ddfd4c6d43e7a6382c0a0a61a
A.txt => Ab
  CRC: 2593905627
  AssetFileHash: 575d09e564dfa87a3d1944e6ec6c6ee0
  TypeTreeHash: 1033bf7ddfd4c6d43e7a6382c0a0a61a
A.txt => A
  CRC: 4046214375
  AssetFileHash: caea7ff4da8c26db06dda68fe7fe81a9
  TypeTreeHash: 1033bf7ddfd4c6d43e7a6382c0a0a61a
```

----
## ex) 스크립트 코드 변경
```yaml
Aprefab.prefab(번들) - AScript.cs(번들로 할 수 없음.)

CRC: 420622857
Hashes:
  AssetFileHash:
    serializedVersion: 2
    Hash: bd07c562a9845e21ce9b377999a8d5e5
  TypeTreeHash:
    serializedVersion: 2
    Hash: cb793a1a0e0d96bcd61e08b4b42ececd
  Script: {fileID: 11500000, guid: 64be57d524a10794bb32a78c6b86769a, type: 3}


public int a = 10; 라인 추가.

CRC: 2838598984
Hashes:
  AssetFileHash:
    serializedVersion: 2
    Hash: bd07c562a9845e21ce9b377999a8d5e5
  TypeTreeHash:
    serializedVersion: 2
    Hash: 9523d3cf1bd04d4ae7937ea9cae4ba0e
  Script: {fileID: 11500000, guid: 64be57d524a10794bb32a78c6b86769a, type: 3}



public int a = 10; 라인 삭제.
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


---
# 하이어라키 검색 필터

```
b: - bundle
```


---
# 주의사항
* name 변경시, 사전빌드되는 bundle의 삭제는 일어나지 않았다.

## Ref

- [BuildingAssetBundles in 5.x](http://docs.unity3d.com/Manual/BuildingAssetBundles5x.html)
- [wiki - yaml](https://en.wikipedia.org/wiki/YAML)
- [Unite 2014 - New AssetBundle Build System in Unity 5](https://www.youtube.com/watch?v=gVUgF2ZHveo)
- [WORKING WITH ASSET BUNDLES IN UNITY 5](http://unity3d.com/learn/tutorials/modules/intermediate/live-training-archive/unity5-asset-bundles)
- [Live Training April 29th, 2015: Working with Asset Bundles in Unity 5](https://www.youtube.com/watch?v=6D9AbQodeVg)
- [Per Asset Versioning with Unity Asset Bundles](http://blog.juiceboxmobile.com/2013/06/19/per-asset-versioning-with-unity-asset-bundles/)
- [AssetBundleを完全に理解する](https://qiita.com/k7a/items/d27640ac0276214fc850)
- [AssetBundles-Dependencies](https://docs.unity3d.com/Manual/AssetBundles-Dependencies.html)
- <https://github.com/Perfare/AssetStudio>
- [에셋번들 실전 가이드 (AssetBundle Best Practices)](https://www.youtube.com/watch?v=Lx61ZEKEvnQ)


## Etc
[【Unity】AssetBundleのManifestファイルに書かれている内容について](https://tsubakit1.hateblo.jp/entry/2016/07/20/235900)
[【Unity】SBP - Scriptable Build Pipeline 郡墙](https://zhuanlan.zhihu.com/p/369264807)


- https://github.com/HearthSim/UnityPack
- https://github.com/lujian101/AssetBundleDecompressor



------------------

        


## 셰이더

- 로딩: https://docs.unity3d.com/Manual/shader-loading.html
- [[유니티 TIPS] 셰이더 배리언트 A to Z](https://www.youtube.com/watch?v=v3v3Q4TqMeM)

- Always Includes
  - Project Settings > Graphics > Built-in Shader Settings > Always Includes

- ShaderVariantCollection
  - https://blog.unity.com/engine-platform/stripping-scriptable-shader-variants
  - https://note.com/wotakuro/n/n5bbd88c62d61
  - IPreprocessShaders

셰이더 키워드
- FrameDebugger 에서도 사용중인 키워드 확인가능
- 활성화
  - Material.EnableKeywrod
  -  Shader.EnableKeyword

  - Project Settings > Graphics > Shader Loading > Preloaded Shaders
    - 게임을 로드하는 동안 preload

런타임에서는 플랫폼에 관계없이 셰이더 객체의 내용은 장면에 들어갈 때 메모리에 로드되지만 실제로 처음 렌더링이 호출될 때 컴파일되고 컴파일이 완료된 후 캐시됩니다.

warmup
- ShaderVariantCollection.WarmUp
- ShaderWarmup.WarmupShader
- ShaderWarmup.WarmupShaderFromCollection

https://forum.unity.com/threads/new-shader-warmup-api.1231287/
https://tsubakit1.hateblo.jp/entry/2018/11/18/001612


https://blog.unity.com/technology/optimizing-loading-performance-understanding-the-async-upload-pipeline

# scriptablebuildpipeline

## 로딩

``` cs
AssetBundleCreateRequest abcr = AssetBundle.LoadFromFileAsync(fpath);               // 비동기: 번들로드(파일로부터)
AssetBundle ab = abcr.assetBundle;
AssetBundleRequest abr = ab.LoadAssetAsync<CompatibilityAssetBundleManifest>(name); // 비동기: 에셋로드(번들로부터)
UnityEngine.Object obj = abr.asset;
_manifest = obj as CompatibilityAssetBundleManifest;
```

- 유니티 AssetBundle의 문제
  - 레퍼런스 카운트관리로 로드 언로드 기능이 없어서 중복 로드가 가능
  - 비동기 로드가 2개 있는데 이게 비동기여서 동기화 문제를 처리하기 곤란
    - 파일에서 번들을 로드하는 AssetBundleCreateRequest
    - 번들에서 에셋을 로드하는 AssetBundleRequest

- 메인아이디어
  - Request_BundleLoad로 AssetBundleRef를 만들고 레퍼런스증가 후 AssetBundle(unity)을 로드하고 Bundle에 넘겨줌
  - Request_BundleUnload로 Bundle을 반환받아 AssetBundleRef를 하나 내리면서 아무도 안쓰면 실제 AssetBundle 언로드
  - 전부 콜백 및 테스크로 관리하게되면 동기화 문제를 해결하기 힘듬
    - 싱글 업데이트 루프에서 다음 요청을 관리하여 동기화를 한다
      - Request_BundleLoad // Request_BundleUnload // AssetBundle(unity)

http://blog.coolcoding.cn/?p=2148


            


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


# Fxxxxxx AssetBundle

asset : prefab, scene, texture, material, animation, audio, script ...
assetbundle : group of assets in single file.

=======================================

경우에따라 1:1로 묶거나, 그룹핑하는 경우에는 정책이 필요.





BuildingAssetBundles in 5.x
http://docs.unity3d.com/Manual/BuildingAssetBundles5x.html





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




lagacy
BuildPipeline.PushAssetDependencies();
BuildPipeline.PopAssetDependencies();

절차가 복잡!



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


AssetBundles rebuild
- asset file changes
- type tree changes
 - runtime class type tree change : upgrade to a new version of unity-asset-bundles/
 - script type tree change : change the public members ...


assetbundle hash
 - asset files
 - type trees
 - buildtarget
 - buildoptino
 - callbacks
 - ...



 yaml : https://en.wikipedia.org/wiki/YAML
 
 % name을 뺐을시 빌드되는 bundle의 삭제는 일어나지 않았다.
=======================================




Unite 2014 - New AssetBundle Build System in Unity 5
https://www.youtube.com/watch?v=gVUgF2ZHveo


http://unity3d.com/learn/tutorials/modules/intermediate/live-training-archive/unity5-asset-bundles



Live Training April 29th, 2015: Working with Asset Bundles in Unity 5
https://www.youtube.com/watch?v=6D9AbQodeVg



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

---

# Asset과 AssetBundle

* Asset : prefab, scene, texture, material, animation, audio, script ...
* AssetBundle : group of assets in single file.
 - 경우에따라 1:1로 묶거나, 그룹핑하는 경우에는 정책이 필요.



---

# lagacy
* BuildPipeline.PushAssetDependencies();
* BuildPipeline.PopAssetDependencies();
* 절차가 복잡!




---
# 새로운 빌드절차



----
# BuildPipeline.BuildAssetBundles
* http://docs.unity3d.com/ScriptReference/BuildPipeline.BuildAssetBundles.html

```cs
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
```


----
# BuildAssetBundleOptions
http://docs.unity3d.com/ScriptReference/BuildAssetBundleOptions.html

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

---
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
# AssetBundle을 다시 빌드하는 경우
* type tree가 변경되었을 경우.
* asset 파일이 변경되었을 경우
 - runtime class type tree change
    - upgrade to a new version of unity-asset-bundles/
 - script type tree change
    - change the public members ...

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


---
# TODO
* 데이터검증
 - Excel과 AssetBundleManifest간의 유효성 검증.
* assetbundle test환경
 - assetbundle될 asset을 assetbundle로 로드
 - offline assetbundle을 로드
 - online assetbundle을 로드
* chatops&automate - delta building system
 - 메신져를 통해 빌드명령
 - 변경된 부분만 빌드
 - delta building된 결과물을 타겟저장소로 업로드 및 백업(cdn같은 경우, 중복파일 삭제 처리)
* loading 정책
 - 시작할때 통짜로 불러올것인가?
 - lazy로 갈것인가?

---
# 작업플로우(WIP)

* 경험상 `리소스패치`, `데이터패치`, `빌드` 명령에 해당하는 작업이 필요하다.
* 작업자가 chatops로 채팅창에

STAGE: DEV, ALPHA, Live
COUNTRY: KOR, JPN, ENG // 보통 국가 나중에 작업이 어느정도 진행되면 추가하게된다.
MARKET: GOOGLE, NAVER, TSTORE // 보통 마켓은 나중에 작업이 어느정도 진행되면 추가하게된다.

!리소스패치 {COUNTRY} {STAGE}
!데이터패치 {COUNTRY} {STAGE}
!빌드 {COUNTRY} {STAGE}

* 채팅봇이 CI툴에 작업을 알려준다.
* CI툴에서 해당 작업을 실행시킨다.
* CI툴의 결과를 채팅봇을 통해 작업자에게 알려준다.


* 리소스패치
* 데이터패치
- 에셋번들 금지.
- 데이터패치는 상당히 빈번하게 일어나게 됨으로 에셋번들로 묶으려면
* 빌드


----
## step1
작업자가 bundle/dlg_hello.prefab을 수정후, apply

## step2
bundle/dlg_hello.prefab을 커밋
svn hook을 이용하여
jenkins의 job을 실행시킨다.

## step3, step4
* Delta Bundle Generation
* asset manifest generation

* 빌드머신
```
assetbundle/
  ASSETBUNDLE_MANIFEST.txt
   - include update date
  patch
  patch.manifest
  all/
    test
    test.manifest
    dlg_hello
    dlg_hello.manifest
  kor/
    kor_a
    kor_a.manifest
  jpn/
    jpn_a
    jpn_a.manifest
```

* 서비스 cdn에 데이터를 올리는 경우 이 단계에서, 에셋 데이터 백업을 수행하는게 좋다.

## step5
cdn sync

* ssh라면 rsync, ftp라면 명령어 찾아야함(덮어쓰는게아니라, 지운다음 올려야되서)

* CDN - KOR
```
CDNROOT/
  IOS/
    ingame.db
    ASSETBUNDLE_MANIFEST.txt
    assetbundle/
      test
      dlg_hello
      kor_a
```


## step6
client patch download




---

## Ref

- [BuildingAssetBundles in 5.x](http://docs.unity3d.com/Manual/BuildingAssetBundles5x.html)
- [wiki - yaml](https://en.wikipedia.org/wiki/YAML)
- [Unite 2014 - New AssetBundle Build System in Unity 5](https://www.youtube.com/watch?v=gVUgF2ZHveo)
- [WORKING WITH ASSET BUNDLES IN UNITY 5](http://unity3d.com/learn/tutorials/modules/intermediate/live-training-archive/unity5-asset-bundles)
- [Live Training April 29th, 2015: Working with Asset Bundles in Unity 5](https://www.youtube.com/watch?v=6D9AbQodeVg)
- [Per Asset Versioning with Unity Asset Bundles](http://blog.juiceboxmobile.com/2013/06/19/per-asset-versioning-with-unity-asset-bundles/)
- https://qiita.com/k7a/items/d27640ac0276214fc850
- [AssetBundles-Dependencies](https://docs.unity3d.com/Manual/AssetBundles-Dependencies.html)

---


## Etc
https://www.twblogs.net/a/5c2a27f0bd9eee01606d384a
https://tsubakit1.hateblo.jp/entry/2016/07/20/235900
https://zhuanlan.zhihu.com/p/369264807

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
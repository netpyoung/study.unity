# Bolt



## 설정

- 유니티 메뉴바 > Window > Package Manager > Unity Registry > 검색 " Visual Scripting "
- 유니티 메뉴바 > Edit > Preferences... > Visual Scripting
- 유니티 메뉴바 > Edit > Project Settings... > Visual Scripting
  - 노드 재생성(Regenerate Nodes)
  - 인스펙터 Generate
  - 그래프 백업
- Assets 창 우클릭 > Create > Visual Scripting
  - State Graph: 상태관리
  - Script Graph: 스크립팅



- https://docs.unity3d.com/Packages/com.unity.visualscripting@1.8/manual/index.html


## 시작

- 유니티 프로젝트 생성
- 유니티 메뉴바 > Edit > Project Settings... > Visual Scripting
  - 노드 재생성(Regenerate Nodes)
- 씬 Hierachy > UI > Text - TextMeshPro
- Create Empty > 이름 `===Main===`
  - Add Component > Script Machine
- Assets 창 우클릭 > Create > Visual Scripting
  - Script Graph: 스크립팅

- On Start > Debug  & String Literal > 안녕
- 버튼클릭
  - 변수만들기
    - Blackboard > Object Variables > (New Variable Name) > Name `HelloBtton` > Type `Button`
  - Get Varaible(앞서 만든 변수를 드래그하면 됨)
    - OnButtonClick > Debug & String Literal > 안녕
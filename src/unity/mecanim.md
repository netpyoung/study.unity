# mecanim

- MecanimAnimationSystem
  - http://docs.unity3d.com/Manual/MecanimAnimationSystem.html



1. asset import
2.
- Humanoid character
 - retargeting http://docs.unity3d.com/Manual/Retargeting.html
 - muscle  http://docs.unity3d.com/Manual/MuscleDefinitions.html
 - avatar http://docs.unity3d.com/Manual/class-Avatar.html
 - IK https://docs.unity3d.com/Manual/InverseKinematics.html
- Generic character



FK
Forward Kinematics


Concept + Modeling + Texture(UV Unwrapped) => ChracterMesh
=> Skeletal Joints + Binding + Skin Weighting
=> Exporting to FBX




http://en.wikipedia.org/wiki/FBX

FBX(FilmBoX)
Kaydara에 의해 만들어진, 2006년부터 Autodesk사가 소유한 상용 파일 포맷.


``` txt
## Body

Body
    Hips
    Spine
    Chest
Left Arm
    Shoulder
    Upper Arm
    Lower Arm
    Hand
Left Leg
    Upper Leg
    Lower Leg
    Foot
    Toes

## Head
Head
    Neck
    Head
    Left Eye
    Right Eye
    Jaw

## Left Hand
    Thumb Proximal
    Thumb Intermediate
    Thumb Distal
    Index/Middle/Ring/Little


- ref:
  - https://github.com/SebLague/Blender-to-Unity-Character-Creation/tree/master/Reference%20images
  - https://youtu.be/WnPkrxz4AQQ?si=WKW0XmRGIxyUwO9f
  - [Houdini KineFX 101: Rigging From Scratch, Binding Skin to bones, Simple Constraints](https://www.youtube.com/watch?v=dkuLzQn7u_U)
  - https://www.sidefx.com/learn/collections/rigging-series/
```


Hips - Upper Leg - Lower Leg - Foot - Toes

Hips - Spine - Chest - Neck - Head

Chest - Shoulder - Arm - Forearm - Hand

Hand - Proximal - Intermediate - Distal



## 휴머노이드

- 애니메이션 공유
  - IK
  - 루트모션
  - 리그



## 작업

리깅 뼈대 심고, 
[Houdini Auto Rigging Tutorial - Rigging - Part 01 - Auto rig Biped - Wild VFX](https://youtu.be/FD5AQhq1ChQ?si=nrGqgDR9iQMk30xY)

Akeytsu
Cascadeur
KineFx APEX (All-Purpose EXecution) - https://www.sidefx.com/docs/houdini/character/kinefx/apexgraphs.html


## Ref

- https://blog.unity.com/engine-platform/mecanim-humanoids
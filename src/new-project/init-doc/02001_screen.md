# 00004_screen.md

# Canvas Scaler

- iphone5 화면 기준(640/1136 | 9:16)으로 작업한다.
- Canvas Scaler
  - UI Scale Mode : Scale With Screen Size
  - Reference Resolution : 640 / 1136
  - Match : 1
  - Reference Pixels Per Unit : 100
- in game camera
  - Projection : Orthographic
  - Size : 640

## Sprite TODO(kep): 이거 잘못된거 체크할 수 있는 스크립트 필요.

- NPOT(Non Power of 2) 사용금지
- Pixels Per Unit : 100 // default
- Filter Mode : Bilinear
- Max Size : 2048
- Resize Algorithm : Mitchell
- Compression : Normal Quality




## ref

- http://smilejsu.tistory.com/990
- https://zetawiki.com/wiki/%EC%8A%A4%EB%A7%88%ED%8A%B8%ED%8F%B0_%ED%95%B4%EC%83%81%EB%8F%84,_%ED%99%94%EB%A9%B4%EB%B9%84%EC%9C%A8

| 화면비율 | 추세 | 대표사례                                                |
| -------- | ---- | ------------------------------------------------------- |
| 9:16     | ★★★  | 1440 × 2560(갤6, 갤7, 갤노4, 갤노5, G3, G4, G5, 픽셀XL) |
| 10:16    | ★★   | 1600 × 2560(갤탭S, 넥10)                                |
| 3:4      | ★    | 1536 × 2048(아이패드3, 아이패드4)                       |

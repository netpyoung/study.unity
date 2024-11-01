# fmod

- [fmod](https://www.fmod.com/)
- [장용석, fmod를이용한사운드프로그래밍, NDC2010](https://www.slideshare.net/devcatpublications/ndc2010-fmod-4335542)

- 이벤트 기반
  - 거리별
    - rifle
      - near / mid /far
  - 타입별
    - footstep
      - grass / stone / water / dirt / wooden
  - 여러가지
    - 거리 + 레이어 + 등등
- 트러블 슈팅
  - 거리가 가까우면 2D사운드


``` cs
EventObj event = EventSystem.GetEvent("rifle");
event.SetPosition(currentPosition);
event.Play();

EventObj event = EventSystem.GetEvent("footstep");
event.SetPosition(groundType);
event.Play();
```

|                   |                                                         |
| ----------------- | ------------------------------------------------------- |
| FMOD Ex           | low level api                                           |
| FMOD Event System | FMOD Ex 상위 레이어, FMOD Designer로 제작된 데이터 재생 |
| FMOD Designer     | 에디터                                                  |

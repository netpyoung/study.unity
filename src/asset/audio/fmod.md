# FMOD

- [fmod](https://www.fmod.com/)
  - FMOD는 Firelight Technologies Pty Ltd 사의 Adaptive Audio(게임 속 환경에 따라 변화하는 오디오) 처리 라이브러리
  - [licencing](https://www.fmod.com/licensing)
- [장용석, fmod를이용한사운드프로그래밍, NDC2010](https://www.slideshare.net/devcatpublications/ndc2010-fmod-4335542)
- [유니티 FMOD를 통한 적응형 배경음악 만들기 - FMOD Studio로 전환하기](https://www.youtube.com/watch?v=4-nQB1qrhoE)



- FMOD for Unity
  - https://assetstore.unity.com/packages/tools/audio/fmod-for-unity-161631

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

| Legacy            |                                                         |
| ----------------- | ------------------------------------------------------- |
| FMOD Ex           | low level api                                           |
| FMOD Event System | FMOD Ex 상위 레이어, FMOD Designer로 제작된 데이터 재생 |
| FMOD Designer     | 에디터                                                  |




| 탭     |                                                                                                |
| ------ | ---------------------------------------------------------------------------------------------- |
| Events | 삽입된 소스로 적응형 오디오의 로직(리버브 효과, 소리 전환, BGM 루프 등)을 설계하는 곳          |
| Banks  | 비슷한 성격의 Event 집합. 나중에 빌드(F7)를 통해 유니티 프로젝트와 직접적인 상호작용을 하는 곳 |
| Assets | .wav, .ogg, .mp3 와 같은 오디오 소스 파일을 삽입하는 곳                                        |


``` txt
# .gitignore
# https://github.com/fmod/fmod-for-unity/blob/master/.gitignore

# FMOD files
Assets/Plugins/FMOD/Resources/FMODStudioCache.asset
Assets/StreamingAssets/*.bank
fmod_editor.log
```

## FMOD Studio

- FMOD Studio https://www.fmod.com/download#fmodstudio

|                 |                           |
| --------------- | ------------------------- |
| {project}.fspro | `F`MOD `S`tudio `Pro`ject |
| Asset/          | 오디오 파일들             |
| Metadata/       | mofd 설정                 |
| Build/          | 빌드된 뱅크파일들         |
| .cache/         | ignore                    |
| .unsaved/       | ignore                    |
| .user/          | ignore. 사용자 설정       |

.user/Metadata/Asset/{guid}.user.xml => Metadata/Asset/{guid}.xml

  	<object class="MasterAssetFolder" id="{guid}">
		<property name="assetDirectory">
			<value>../AnotherMasterAsset</value>
		</property>
	</object>

## unity Integration

``` cs
FMODUnity.RuntimeManager.PlayOneShot(strKey, value);

StudioEventEmitter : MonoBehaviour
 
StudioEventEmitter emitter;
emitter.SetParameter(strKey, value);
emitter.EventInstance.setVolume(volume);

// Events에걸 Banks에 끌어다 넣을 수 있다.
// 플레이시 "event:/{banks에서 나온 이름 그대로}"
[SerializableField]
[FMODUnity.EventRef]
private string _eventKey;



EventReference fmodEvent;
EventInstance eventInstance = RuntimeManager.CreateInstance(fmodEvent);      
eventInstance.getDescription(out EventDescription eventDescription;);
eventDescription.getMarkerList(out Marker[] markers);
eventInstance.setTimelinePosition(marker.position);
eventInstance.release();
```


## Scripting

- <https://www.fmod.com/docs/2.00/studio/scripting-terminal-reference.html>
- <https://github.com/michaelhartung/fmod-types>

## [Getting Started in FMOD](https://www.youtube.com/playlist?list=PLp4vT3ssm5SUgEJpDeA0Nb-1BKGxnDu2m)

- Episode 1 - FMOD Basics
- Episode 2 Part 1 - Events
- Episode 2 Part 2 - Sheets
- Episode 3 - Instruments
  - 타임라인 시트에 Multi Instruments로 렌덤 음악플레이
- Episode 4 - Logic Tracks
  - Timeline
    - Tempo
    - Destination
    - Loop
    - Transition
      - 컨디션 지정가능
- Episode 5 - Parameters
  - Parameter
    - Continuous (연속)
    - Discrete (불연속, 이산)
      - 상태 변수로 사용함 int
    - Labbeled
      - 상태 변수로 사용함 string
  - Timeline
    - Sound
      - Cut 하면 타임라인 이동시 재생 중지.
      - Cut 안하면 타임라인 이동시에도 재생.
  - Timeline Audio Volume에 우클릭해서 Automation추가 가능
    - 밤낮 페이드인아웃효과
  - Transition Region
    - quantization 양자화 - 템포간격에 맞춤
- Episode 6 - Banks



``` cs
// Setting random seed
// ref: https://qa.fmod.com/t/setting-random-seed/11650

FMOD.ADVANCEDSETTINGS advancedsettings = new FMOD.ADVANCEDSETTINGS();
long seed = global::System.DateTime.Now.ToBinary();
advancedsettings.randomSeed = ((uint)seed) ^ ((uint)(seed >> 32));
FMOD.System lowlevel;
ERRCHECK(system.getLowLevelSystem(out lowlevel));
ERRCHECK(lowlevel.setAdvancedSettings(ref advancedsettings));
```


snapshot ??

midi => fmod ???

Volume은 상대적인 크기를 0.0 ~ 1.0 범위로 표현하며, 사용자가 직관적으로 볼륨을 조절할 때 주로 사용됩니다.
Gain은 절대적인 크기 조절을 위한 매개변수로, 주로 데시벨(dB)로 세밀하게 조정됩니다.

Alt + Mouse Wheel 줌 인/아웃
Windows -> Audio Bin Ctrl + 3
Windows -> Preset Browser Ctrl + 8 - Parameters/Effects
Windows -> Sandbox  Ctrl + 7

- Effect
  - spatializer 공간화 효과
    - Distance Attenuation 거리 감쇠
    - Min & Max Distance 거리 감쇠 범위
    - Envelopment
       - Auto
       - User
          - Sound Size 소리가 들리는 거리
          - Min Extend 소리를 들을 수 있는 각도
- Event Macros
  - Max Instances 동시 소리 갯수
  - Stealing
    - Oldest 시간상 가장 이전의 출력된 것(동일 Event)을 정지시키고 새로 발생한 것을 재생
    - Quietest 거리상 감쇠 효과를 고려하여 가장 작은 음량의 이벤트를 정지하고 새로 발생한 이벤트를 재생
    - Virtualize Quietest와 동일하나 가상화하여 소리는 안 들릴지라도 Event 동작은 지속
    - Furthest 직접적인 거리만을 고려하여 가장 작은 음량의 이벤트를 정지하고 새로 발생한 이벤트를 재생
  - Cooldown 동일 이벤트 무시
  - Persistent 이벤트 진행 멈춤 방지
  - Doppler 도플러 효과
    - [Bending Sound - Doppler in FMOD](https://www.youtube.com/watch?v=Be7PNN9G1UM)
    - Doppler Scale
- Output 에 우클릭
  - Mono 하나의 채널로 녹음되어 들리며, 공간감이 없다
  - Stereo 두 개 이상의 채널로 녹음되어 좌우로 나뉘어 공간감이 있다.

lufs Loudness Unit Relative to Full Scale
-24 ~ -20 Lufs 


- Encoding Format
  - Vorbis - Ogg
  - PADPCM 압축 형식으로 대략적으로 원본 대비 1/4
  - PCM 비압축
- Advanced Loading Mode
  - Compressed
  - Decompressed
  - Streaming
- Sample Rate Mode
  - Optimized
  - Pressed

- Sound
  - Async 루프시 끊기더라도 마지막까지 플레이
    - https://www.fmod.com/docs/2.03/studio/working-with-instruments.html#synchronous-and-asynchronous-instruments
  - Cut Async라도 끊기면 멈추게
    - https://www.fmod.com/docs/2.03/studio/working-with-instruments.html#cut

- AHDSR 
  - `A`ttack, `H`old, `D`ecay, `S`ustain, `R`elease
- LFO
  - `L`ow `F`requency `O`scillator

- Built In Parameter
  - Distance
  - Direction
    - 좌 -180   180 우
  - Elevations
    - 하 -90 90 상
  - Event Cone Angle
  - Orientation
  - Speed


Sustain Point, Keyoff
Sustain: 지속시키다


Mixer ??

VCA: `V`oltage `C`ontrolled `A`mplifier
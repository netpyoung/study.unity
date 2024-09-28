# 02002_resource

# Naming

- nameing convention : snake_case

## illust
- illust_*.png

## import
## 아이콘 : icon_
## ui 아틀라스 : atlas_

## fx naming

- animator based : fx_a_
- particle based : fx_p_
- spine based : fx_s_

## sound

### bgm

- bgm_*.mp3
- Load Type : Compressed In Memory
- Preload Audio Data : false
- Compression Format : Vorbis / mp3
- Quality : 100
- Sample Rate Setting : Preserve Sample Rate

### effect

- se_*.wave
- Load Type : Decompress On Load
- Preload Audio Data : false
- Compression Format : PCM
- Quality : 100
- Sample Rate Setting : Preserve Sample Rate

## Texture

- if need to compression : <https://developers.google.com/speed/webp/docs/using>
- sega tech : <http://techblog.sega.jp/entry/2017/02/27/100000>
- <https://docs.unity3d.com/2017.1/Documentation/Manual/SpriteAtlas.html>

### import setting

- `ProjectSettings -> Graphic -> Always Included Shader  :  UI/DefaultETC1`

### Android

- Texture Type : Sprite (2D and UI)
- Non Power of 2 : ToNearest
- Pixels Per Unit : 100 // default
- Filter Mode : Bilinear
- Max Size : 2048
- Resize Algorithm : Mitchell
- Compression : Normal Quality

- Max Size : 2048
- format : RGB Compressed ETC 4 bits
- Compressor Quality : Normal
- Compress using ETC1(split alpha channel) : True (if alpha)

### iOS

- <http://www.webtech.co.jp/clearpvrtc/>

- Texture Type : Sprite (2D and UI)
- Non Power of 2 : ToNearest
- Max Size : 2048
- format : RGB Compressed PVRTC 4 bits | RGBA Compressed PVRTC 4 bits (if alpha)
- Compressor Quality : Normal

## https://docs.unity3d.com/2017.1/Documentation/Manual/SpriteAtlas.html

# Planner

- working datasheet
- git commit
- chatbot : `build gamedb|locale command`
- relaunch game application

## issue flow

- Planner <-issue-> designer
- Planner <-*-> ui
- Planner -*-> client
- Planner -issue-> server
- Planner <-*- client
- Planner -build-> chatbot


# Client

- working code
- git commit
 - commit hook
 - static analysis && check coding standard && unit test


## changelog

- https://pypi.python.org/pypi/gitchangelog

## static analysis

- https://www.sonarqube.org/
- https://www.jetbrains.com/help/resharper/Code_Analysis__Code_Inspections.html

## codestyle

- https://www.jetbrains.com/resharper/features/code_formatting.html

## unit test

- vs enterprise: https://docs.microsoft.com/en-us/visualstudio/test/getting-started-with-unit-testing
- NCrunch : http://www.ncrunch.net/

## ui test

- http://appium.io/
- https://bitbar.com/testing/pricing/public-cloud/

## ci

- https://docs.unity3d.com/ScriptReference/AssetPostprocessor.html

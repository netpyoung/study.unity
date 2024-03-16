
apple developer program

# (CSR) 개발 컴퓨터에서 인증서 요청 파일 만들기
* [키체인 접근]
* [키체인 접근 > 인증서 지원 > 인증 기관에서 인증서 요청]
* file: certSigningRequest 
* file: login key(private, public) .p12


# iOS Provisioning Poratal
* https://developer.apple.com/account/overview.action
## Certificates
* Development, Production
  - Development: for devleop
  - Production: appstore, adhoc

* [Development > iOS App Development]메뉴를 선택하고, 아래쪽 Intermediate Certificates 섹션이 있는데 "Worldwide Developer Relations Certificate Authority" 링크가 있는것을 볼 수 있는데 클릭해서
* file:  AppleWWDRCA.cer
* (CSR)
* file: ios_development.cer 

# Identifiers
# Devices
# Provisioning Profiles 


# ref
* http://lab.anybuild.co.kr/page/basic_app2


### 사전작업

* 필요 파일
  - .p12
  - .mobileprovision
    - 배포하는 데 필요한 인증 및 권한 정보를 담고 있는 파일.
    - security find-identity -v -p codesigning ~/Library/MobileDevice/Provisioning\ Profiles/*.mobileprovision
      - v Show valid identities only
      - Specify policy to evaluate (multiple -p options are allowed).

* 참고
  - 애플 Certificate등록, Devices, App ID, Provisioning 등록 과정 : http://liebus.tistory.com/137
  - [iOS] 인증서와 코드 사이닝 이해하기 : http://la-stranger.blogspot.kr/2014/04/ios.html


### Unity ipa 생성 과정


```
* Unity.
    XCODEPRJ를 생성하고,
        XCODEPRJ에 있는, project.pbxproj를 수정해준다
        - 프레임워크
        - 파일 복사
        - 프로비저닝
        - 등등
        
        XCODEPRJ에 있는, Info.plist를 수정해준다
        - CFBundleIconFiles
        - CFBundleURLTypes
        - 등등


        
* Command

    사용자 스킴 재생성.
    
    xcodeproj를 가지고 xcarchive를 생성한다.
    
    xcarchive가지고 ipa 생성. (provisioning_name 필요)
```


### Ref.
Account Setup
http://docs.unity3d.com/Manual/iphone-accountsetup.html


iOS Player Settings
http://docs.unity3d.com/Manual/class-PlayerSettingsiOS.html


Upgrading to 64 bit iOS
http://docs.unity3d.com/Manual/iphone-64bit.html

    
Customising WWW Requests on iOS
http://docs.unity3d.com/Manual/iosCustomWWWRequest.html
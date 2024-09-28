# 00003_ios_device_add.md

## 디바이스 추가

- 주의, Admin 권한이 있어야함
- 디바이스 등록 100개 제한( 지워도 바로 삭제가 안됨 )
- https://developer.apple.com/ => Account
- Certificates, Identifiers & Profiles => Devices => All => [ + ]
- => Provisioning Profiles => All => [helloworld] => Edit => Devices 체크 => Generate


## Build Machine

- Xcode Preference
- Account
- => View Detail.
- latest - download => Show Finder => 빌드머신 코드 변경.


# TODO(kep) 관리이슈 - 엔터프라이즈 고려

- https://developer.apple.com/programs/enterprise/enroll/kr/
- http://hongary.blog.me/80191418816



# 빌드머신 - https://developer.apple.com/account/ios/profile/


```
Certificates
 iOS Distribution
 APNs Development

Keys
 private key
 public key

Identifiers

Provisions


## build_resources/apple/
private key | key.p12
iOS Distribution | dist.cert
APNs Development | apn.cert
Provision | device.mobileprovision
```


# Account

* Apple Developer
* Unity (for Build Machine)
* AWS (`/build_resource/s3_login_credentials.csv`)




Semantic Versioning 2.0.0
http://semver.org/



git branch model
http://nvie.com/posts/a-successful-git-branching-model/

git branch rebase
http://git-scm.com/book/ko/v1/Git-%EB%B8%8C%EB%9E%9C%EC%B9%98-Rebase%ED%95%98%EA%B8%B0



```
# rename git branch locally and remotely
# https://gist.github.com/lttlrck/9628955

    git branch -m old_branch new_branch         # Rename branch locally    
    git push origin :old_branch                 # Delete the old branch    
    git push --set-upstream origin new_branch   # Push the new branch, set local branch to track the new remote
```
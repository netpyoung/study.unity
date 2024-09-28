http://mlogcat.tistory.com/ - alternative logcat
====


후보군
https://github.com/fastlane/fastlane

## dotnet

- plist: https://github.com/animetrics/PlistCS
- pbxproj: https://github.com/gforeman/XcodeProjectModifier
* https://github.com/kronenthaler/mod-pbxproj



# Ref

- http://qiita.com/tyfkda/items/be8a17a219de7f5e6ee9
- http://blog.kakeragames.com/2016/04/30/unity-carthage.html
- http://docs.unity3d.com/ScriptReference/iOS.Xcode.PBXProject.html
- http://docs.unity3d.com/ScriptReference/iOS.Xcode.PlistDocument.html
- http://docs.unity3d.com/Manual/CommandLineArguments.html


http://www.rubydoc.info/gems/xcodeproj/Xcodeproj/Plist
http://www.rubydoc.info/gems/xcodeproj/Xcodeproj/Project

|                   |                                                  |
| ----------------- | ------------------------------------------------ |
| Project           | Xcodeproj::Project::Object::PBXProject           |
| Group             | Xcodeproj::Project::Object::PBXGroup             |
| Products          | Xcodeproj::Project::Object::PBXGroup             |
| ConfigurationList | Xcodeproj::Project::Object::XCConfigurationList  |
| Debug             | Xcodeproj::Project::Object::XCBuildConfiguration |
| Release           | Xcodeproj::Project::Object::XCBuildConfiguration |
| Frameworks        | Xcodeproj::Project::Object::PBXGroup             |
| FileReference     | Xcodeproj::Project::Object::PBXFileReference     |




===============================================

unity3d => xcode

BUILD_OUTPUT_DIR/
Unity-iPhone.xcodeproj
 - project.pbxproj
Info.plist


# Unity-iPhone.xcodeproj/project.pbxproj
[require codesigining, provisioning_uuid]

CODE_SIGN_NAME_IDENTITY[sdk=iphoneos*] [code_sign_name] Release
CODE_SIGN_NAME_IDENTITY ????
PROVISIONING_PROFILE [provisioning_uuid] Release

group
libs
frameworks
headerpaths
files
folders
execludes


# Info.plist
[app icon, url scheme)
"CFBundleIconFiles" = ["A", "B"]
"CFBundleURLType" = {
    "CFBundleTypeRole" => "None",
    "CFBundleURLName" => "com.world.hello",
    "CFBUndleURLSchemes" =>  ["com.world.hello"]
}

# recreate scheme
 prj = Xcodeproj::Project.open("#{XCODEPRJ_FPATH}")
 prj.recreate_user_schemes()
 prj.save()


# xcarchive
xcodebuild -project #{XCODEPROJ_FPATH} -scheme Unity-iPhone archive -archivePath #{ARCHIVE_FPATH}

# ipa
xcodebuild -exportArchive -archivePath #{ARCHIVE_FPATH} -exportPath #{IPA_FPATH} -exportFormat ipa -exportProvisioningProfile #{PROVISINING_NAME}


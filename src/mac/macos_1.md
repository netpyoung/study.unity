```
9.120s][1][~/.dotnet/tools]$ xattr -d com.apple.quarantine  libClangSharp.dylib
[16ms][~/.dotnet/tools]$ DYLD_LIBRARY_PATH=`pwd` ClangSharpPInvokeGenerator --version
ClangSharp P/Invoke Binding Generator version 16.0.6
  clang version 16.0.6 (https://github.com/llvm/llvm-project 7cbf1a2591520c2491aa35339f227775f4d3adf6)
  clangsharp version 16.0.6
[0.537s][255][~/.dotnet/tools]$ ls
ClangSharp.dll             ClangSharpPInvokeGenerator libClangSharp.dylib        libLLVM.dylib              libclang.dylib
```

https://www.devontechnologies.com/apps/freeware

/Library/Developer/CommandLineTools/Library/PrivateFrameworks/LLDB.framework/Versions/A/Resources/Clang/include/stddef.h
/Library/Developer/CommandLineTools/Library/PrivateFrameworks/LLDB.framework/Versions/A/Resources/Clang/include/inttypes.h

/Library/Developer/CommandLineTools/SDKs/MacOSX14.0.sdk/usr/include/inttypes.h



DYLD_LIBRARY_PATH : 
  동적 라이브러리를 찾는 경로를 지정하는데
DYLD_LIBRARY_PATH는 macOS 시스템에서 사용되는 환경 변수입니다
Linux 시스템에서 사용되는 LD_LIBRARY_PATH가 있습니다

otool -L blabla.dylib
동적 라이브러리 의존성 확인
리눅스 ldd와 같은 역할

xattr
맥에서 메타데이터 확인 및 변경 
- 맥에서 동적라이브러리 다운로드받으면  파일이 인터넷에서 다운로드되었음을 나타내는 com.apple.quarantine가 메타에 추가됨
- xattr -d com.apple.quarantine blabla.dylib 로 지워주면됨

lipo -info
lipo는 여러 아키텍처로 컴파일된 바이너리를 병합하거나 분리할 수 있는 도구
lipo -info ios/lib/libsodium.a
Architectures in the fat file: ios/lib/libsodium.a are: armv7 armv7s arm64
이처럼 하나의 파일에 armv7 /armv7s/ arm64 아키텍처가 포함될 수 있음.


Xcode > Settings... > Locations > Derived Data
~/Library/Developer/Xcode/DerivedData

Xcode > Settings... > Locations > Archives
~/Library/Developer/Xcode/Archives



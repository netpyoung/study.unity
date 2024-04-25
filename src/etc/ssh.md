
## Windows

### 키생성
puttygen

### plink
GIT_SSH=C:\Program Files\TortoiseGit\bin\TortoiseGitPlink.exe

## MacOS

### 키생성

generate
$ ssh-keygen

### 키체인등록

register keychain
$ ssh-add -K ~/.ssh/id_rsa

~/.ssh/config

``` txt
Host *
    AddKeysToAgent yes
    UseKeychain yes
```


## Ref

- https://qiita.com/onokatio/items/397a5899a0ec16c7e60a


## Example

``` txt
test-repo/unity_p1/Assets/p1_Hello/package.json
{
  "name": "com.p1_hello",
  "displayName": "p1_hello",
  "version": "0.0.1",
  "unity": "2018.4",
  "description": "",
  "keywords": [""],
  "license": "",
  "category": "",
  "dependencies": {
  }
}

test-repo/unity_p2/Assets/p2_Hello/package.json
{
  "name": "com.p2_hello",
  "displayName": "p2_hello",
  "version": "0.0.1",
  "unity": "2018.4",
  "description": "",
  "keywords": [""],
  "license": "",
  "category": "",
  "dependencies": {
    "com.p1_hello": "0.0.1"
  }
}

OtherRepo/Packages/manifest.json
    "com.p1_world": "ssh://git@github.com/{XXXX}/test-repo.git?path=unity_p1/Assets/p1_World",
    "com.p2_world": "ssh://git@github.com/{XXXX}/test-repo.git?path=unity_p2/Assets/p2_World"
```
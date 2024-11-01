# Package

- [[unite copenhagen2019] Understanding the package management ecosystem - Unite Copenhagen](https://youtu.be/22HIEQTyozQ?si=iDa45oQW6xCmRoKc)

- Install a UPM package from a Git URL : <https://docs.unity3d.com/Manual/upm-ui-giturl.html>
- 패키지 구조 : <https://docs.unity3d.com/Manual/cus-tests.html>

``` json

- https://docs.unity3d.com/Manual/upm-localpath.html

{
  "dependencies": {
    "my_package_a": "file:../github/my_package_folder",
```



```
- https://docs.unity3d.com/Manual/upm-config-https-git.html
  - https://github.com/git-ecosystem/git-credential-manager
  - https://git-scm.com/book/en/v2/Git-Tools-Credential-Storage

git config --global credential.helper manager
git ls-remote --heads https://<url-to-repository> HEAD
```
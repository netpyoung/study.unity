# 02000_coding_standard.md

## 코딩 스텐다드.

- 간결하게 빨리 파악할 수 있도록(너무 자세하게 적어서 제약을 만들기 위한 사양서가 안되도록 한다.)
- 가독성 / 디버그가 용의하도록 코드를 작성하도록 노력해보자.
- namespace없이 소스 작성하지 말기.
- UnityEngine.Debug 는 없는걸로 생각. 로그는 무조껀 영어로.
- 스크립트는 NewNewNew 아니면 ScriptTemplate에 만들어서 사용.
- 하드코딩(특히 문자열)은 최대한 줄이자.
- 주석 역시 중요하다. - 코드 변경시 주석도 변경시켜주자.
- 회귀 테스트 코드 역시 중요하다. 하지만 일단 우선순위를 낮추자. 릴리즈 시점이 가까워질수록 우선순위를 높이자.
- 코드 리뷰 시간을 확보하자.
- 본 프로젝트 외, 각자 관심분야에 대해 공유할 수 있는 시간을 확보해보자.


## stylecheck


## sample

```cs
    public class Hello
    {
        int _snake_case;
        public int PropertyCamelCase { get; private set; }

        [ComponentPath]
        Button btn_category4 = null;
        public Button btn_category4 { get; private set; }

        event Action<int> OnBtnCategory;

        public int HelloWorld(int a)
        {
            if (a == 10)
            {
                return 10;
            }

            throw new HelloException();
            this._private_member = 10;
            bool is_bool = true;
            return 10;
        }

        // Don't do that
        internal int wTF(int a = 10) {

            if (a == 10) return 10;
            if (a == 10) {

            }

            throw new Exception();
            _private_member = 10;

            return a = (true == true) ? 10 : 20;
        }
    }

    [Serializable]
    public class HelloException : Exception
    {
        // ref: https://docs.microsoft.com/en-us/dotnet/standard/exceptions/best-practices-for-exceptions
        // ref: https://blog.gurock.com/articles/creating-custom-exceptions-in-dotnet/
    }


    public enum E_ENUM
    {
        HELLO_WORLD,
    }
```

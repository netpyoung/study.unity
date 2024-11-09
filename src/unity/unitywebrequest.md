# UnityWebRequest

UnityWebRequest.Get
		return new UnityWebRequest(uri, "GET", new DownloadHandlerBuffer(), null);

- Abort()
  - 호출하면 요청이 즉시 취소되고, 요청의 상태가 isDone = true로 설정되면서 콜백도 정상적으로 종료.

## downloadProgress

- <https://docs.unity3d.com/ScriptReference/Networking.UnityWebRequest-downloadProgress.html>
  - Send전에는 : -1
  - 성공/실패 : 1
  - 통신중
    - (downloadHandler == null) : 0.5 고정
    - downloadHandler.GetProgress()

| UnityWebRequest.Result |                                                                                      |
| ---------------------- | ------------------------------------------------------------------------------------ |
| Success                | 요청이 성공했습니다.                                                                 |
| InProgress             | 요청이 아직 완료되지 않았습니다.                                                     |
| ConnectionError        | 서버와의 통신에 실패했습니다. (연결할 수 없거나 / 보안 채널을 설정할 수 없었습니다.) |
| ProtocolError          | 서버와의 통신은 성공했지만, 연결 프로토콜에 정의된 오류를 받았습니다.                |
| DataProcessingError    | 서버와의 통신은 성공했지만, 받은 데이터를 처리하는 과정에서 오류가 발생했습니다.     |


## Ref

- [【Unity】UnityWebRequestの詳細なエラー内容で処理を分岐する方法](https://qiita.com/su10/items/538e39a2a2cd84dc032b)


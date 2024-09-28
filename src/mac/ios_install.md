``` xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
	<dict>
		<key>items</key>
		<array>
			<dict>
				<key>assets</key>
				<array>
					<dict>
						<key>kind</key>
						<string>software-package</string>
						<key>url</key>
						<string>https://192.168.1.123/StaticFiles/x.ipa</string>
					</dict>
					<dict>
						<key>kind</key>
						<string>display-image</string>
						<key>url</key>
						<string>https://192.168.1.123/StaticFiles/57×57.png</string>
					</dict>
					<dict>
						<key>kind</key>
						<string>full-size-image</string>
						<key>url</key>
						<string>https://192.168.1.123/StaticFiles/512×512.png</string>
					</dict>
				</array>
				<key>metadata</key>
				<dict>
					<key>bundle-identifier</key>
					<string>com.x.x</string>
					<key>bundle-version</key>
					<string>1.0.x</string>
					<key>kind</key>
					<string>software</string>
					<key>platform-identifier</key>
					<string>com.apple.platform.iphoneos</string>
					<key>title</key>
					<string>x</string>
				</dict>
			</dict>
		</array>
	</dict>
</plist>
```
``` html
<a href="itms-services://?action=download-manifest&url=https://192.168.1.123/StaticFiles/manifest.plist">DOWNLOAD</a>
```

``` cs
// Add services to the container.
builder.Services.AddRazorPages();
builder.Services.AddDirectoryBrowser();
builder.Services.Configure<KestrelServerOptions>(options =>
{
	var crt = "@RES/server.pfx";
	var cert = new X509Certificate2(crt, "1234567890");

	options.Listen(IPAddress.Loopback, 80); // http
	options.Listen(IPAddress.Loopback, 443, listenOptions => // https
	{
		listenOptions.UseHttps(cert);
	});
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
	app.UseExceptionHandler("/Error");
	// The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
	//app.UseHsts();
}

//app.UseHttpsRedirection();
app.UseStaticFiles();

PhysicalFileProvider fileProvider = new PhysicalFileProvider(Path.Combine(builder.Environment.ContentRootPath, "@RES"));
string requestPath = "/StaticFiles";
var provider = new FileExtensionContentTypeProvider();
provider.Mappings[".ipa"] = "application/octet-stream";
provider.Mappings[".plist"] = "application/xml";

void OnPrepareResponse(StaticFileResponseContext context)
{
	if (Path.GetExtension(context.File.Name) == ".ipa")
	{
		context.Context.Response.Headers.Add(
			"Content-Disposition",
			//$"attachment; filename=\"{context.File.Name}\""
			"attachment"
		);
	}
}
app.UseStaticFiles(new StaticFileOptions
{
	FileProvider = fileProvider,
	RequestPath = requestPath,
	ContentTypeProvider = provider,
	OnPrepareResponse = OnPrepareResponse,
});


app.UseDirectoryBrowser(new DirectoryBrowserOptions
{
	FileProvider = fileProvider,
	RequestPath = requestPath
});

```
 

1-2. TLS(Transport Sockets Layer, 전송 소켓 계층)이란?
- 1999년에 SSL 3.0의 업그레이드 버전으로 TLS 1.0이 공개되었음.
- 이후 SSL에서 TLS로 명칭이 변경되었으나, SSL이라는 명칭이 아직까지 보편적으로 사용되고 있어서 TLS/SSL을 혼용하여 사용함.


``` plantuml
title csr

participant Client
' CSR Certificate Signing Request
' CA: Certificate Authority
' CRT: CeRTificate

Client -> Client: create private / public key
Client -> Client: create CSR via public key
Client -> CA: submit CSR
Client <- CA: X.509 Certificate
```

``` plantuml
title https

Client -> Server: Browser
Client <- Server: Certificate
Client -> Client: check Certificate list
Client -> Client: decript via Certificate's public key
```


- https의 ssl 인증서는 서비스를 등록할 때 마다 비밀번호를 입력해야하기 때문에 비밀번호 없이 사용

openssl genrsa -out test/hello.key 2048 

|     |                                     |                                                                                                |
| --- | ----------------------------------- | ---------------------------------------------------------------------------------------------- |
| PEM | `P`rivacy `E`nhanced `M`ail         |                                                                                                |
| CSR | `C`ertificate `S`igning `R`equest   |                                                                                                |
| CRT | `C`e`rt`ificate                     |                                                                                                |
| PFX | `P`ersonal In`f`ormation `E`xchange | PKCS#12 format, contains the SSL certificate (public keys) and the corresponding private keys. |


HSTS Strict-Transport-Security response header

### 키

#### 사설
서버 개인키
openssl genrsa -aes256 -out test/server.key 2048
서버 서명 요청
openssl req -config openssl.cnf -new -key test/server.key -out test/server.csr -subj /CN=192.168.1.123

## 루트
openssl genrsa -aes256 -out test/ca.key 2048
openssl req -config openssl.cnf -new -x509 -days 365 -key test/ca.key -out test/ca.crt  -subj /CN=192.168.1.123
폴더 생성
demoCA/index.txt: empty
demoCA/serial: 01
demoCA/newcerts/


서버 서명 인증서
openssl ca -config openssl.cnf -in test/server.csr -cert test/ca.crt -keyfile test/ca.key -out test/server.crt

openssl pkcs12 -export -inkey test/x.key -in test/x.crt -out test/x.pfx




https://support.apple.com/en-us/HT211025
398days
https://support.apple.com/en-us/HT210176
- 2048비트 키
- TLS 서버 인증서 및 발급 CA는 서명 알고리즘에서 SHA-2 제품군의 해시 알고리즘을 사용
- TLS 서버 인증서는 인증서의 주체 대체 이름 확장에 서버의 DNS 이름을 표시해야 합니다. 인증서의 CommonName에 있는 DNS 이름은 더 이상 신뢰할 수 없습니다.


## Ref

- [[OpenSSL] SSL/TLS 인증서 발급받기](https://heodolf.tistory.com/94)
- https://learn.microsoft.com/en-us/aspnet/core/security/enforcing-ssl?view=aspnetcore-7.0&tabs=visual-studio%2Clinux-ubuntu&viewFallbackFrom=aspnetcore-2.1#http-strict-transport-security-protocol-hsts
- https://engineering.circle.com/https-authorized-certs-with-node-js-315e548354a2
- https://qiita.com/keeey/items/c29250c47e262ea5ea0f


zh-CN / zh-TW로 분류하는건 ISO 639 기준 언어 코드입니다. Language code
zh-Hans / zh-Hant로 분류하는건 ISO 15924 기준 문자 코드입니다. script code

IETF's BCP 47 standard
(Internet Engineering Task Force)
RFC 5646 and RFC 4647

- RFC 1766
  - ISO 639-1(alpha2) - ISO3166(alpha2)
  - zh-TW

국가코드 Country Codes ISO 3166-1


- https://github.com/ModernFlyouts-Community/ModernFlyouts/issues/250

zh-CN represents Chinese as spoken in China (Simplified).
zh-TW represents Chinese as spoken in Taiwan (Traditional).

- https://learn.microsoft.com/en-us/bingmaps/rest-services/common-parameters-and-types/supported-culture-codes

en english
es spanish Spain
fr french France
pt Portuguese Portugal
de german Germany
it italian Italy
ja japanese Japan
ko korean Korea
ru russian Russia
pl polish Poland
el greek Greece
zh-Hant chinese traditional Taiwan
  - zh-TW (Taiwan)
  - zh-MO (Macau)
  - zh-HK (Hong Kong).
zh-Hans chinese simplified China
  - zh-CN (China Mainland)
  - zh-SG (Singapore)
  - zh-MY (Malaysia)
tr turkish Turkey


 Hanzi Simplified
 Hanzi Traditional

|             | iOS     | Android |
| ----------- | ------- | ------- |
| 간체 (중국) | zh-Hans | zh-rCN  |
| 번체 (대만) | zh-Hant | zh-tTW  |

public enum E_LANGUAGE_CODE
{
  // LANGUAGE(_{SUB_CATEGORY}) // {country}
  
  ENGLISH,             // US ...
  SPANISH,             // Spain
  FRENCH,              // France
  PORTUGUESE,          // Portugal
  GERMAN,              // Germany
  ITALIAN,             // Italy
  JAPANESE,            // Japan
  KOREAN,              // Korea
  RUSSIAN,             // Russia
  POLISH,              // Poland
  GREEK,               // Greece
  CHINESE_SIMPLIFIED,  // China, ...
  CHINESE_TRADITIONAL, // Taiwan, ...
  TURKISH,             // Turkey
}

## CultureInfo(String, Boolean useUserOverride)

useUserOverride
true to use the user-selected culture settings (Windows only); false to use the default culture settings.

ArgumentNullException : name is null.
CultureNotFoundException : name is not a valid culture name. See the Notes to Callers section for more information.


``` cs
 CultureInfo myCultureInfo = new CultureInfo("zh-TW", false);
 //while (!myCultureInfo.IsNeutralCulture)
 //{
 //    myCultureInfo = myCultureInfo.Parent;
 //}

 Console.WriteLine(myCultureInfo.NativeName);
 Console.WriteLine(myCultureInfo.LCID);

 RegionInfo r = new RegionInfo(myCultureInfo.LCID);
 Console.WriteLine(r.ThreeLetterISORegionName);
 ```

RegionInfo(string name)
name: A string that contains a two-letter code defined in ISO 3166 for country/region.

RegionInfo(int culture)
culture : cultureInfo.LCID

``` cs
JsonSerializerOptions options = new JsonSerializerOptions
{
    WriteIndented = true,
    IncludeFields = true,
    Encoder = JavaScriptEncoder.Create(new TextEncoderSettings(UnicodeRanges.All))
};
```
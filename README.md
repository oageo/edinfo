# edinfo
![GitHub commit activity](https://img.shields.io/github/commit-activity/y/oageo/edinfo)
![GitHub License](https://img.shields.io/github/license/oageo/edinfo)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/oageo/edinfo)

緊急車両の出動情報をWebサイトの形で掲載する

## データソース
データは[emergency-dispatch](https://github.com/oageo/emergency-dispatch)からJSON形式で取得しています。このサイトにおいては、emergency-dispatchで得られたJSONファイルを人間に見やすい形で表示出来るような加工を行っています。

また、地方公共団体名の表示に関しては[jmcjson](https://github.com/oageo/jmcjson)からJSON形式で表示しています。

## 環境変数
このサイトを独自でホストする際は`nuxt.config.ts`中において、`EDBOT_BASE_URL`及び`JMCJSON_BASE_URL`の指定を行ってください。

## 参考情報
* [全国の消防出動情報をいい感じに見れるサイト「edinfo」を作った - osumiakari.jp](https://www.osumiakari.jp/articles/20250509-edinfo/)
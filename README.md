# past-tweets-notifier

下記で Notion Database に保存している過去の Tweet を通知するツール。現状は Gmail を用いたメール通知に対応

https://github.com/shun91/ifttt-to-notion

## セットアップ

### Notion Database に `rand` プロパティの追加

後述する `notifyRandomly.ts` を利用したい場合、`rand` プロパティを追加する必要があります。  
各項目の値は以下のように設定します。

| 項目       | 値                                                                                                |
| ---------- | ------------------------------------------------------------------------------------------------- |
| 種類       | 数式                                                                                              |
| 数式       | `toNumber((floor(timestamp(now()) / 60000) * toNumber(replaceAll(id(), "[^0-9]", ""))) % 100000)` |
| 数値の形式 | 数値                                                                                              |

参考：[Notion のデータベースでランダムに 1 件だけ表示する方法 - Notion ラボ](https://notion-lab.jp/2023-08-05-database-random-filter/)

### 環境変数の設定

[.envrc.sample](./.envrc.sample)に記載されている環境変数を設定します。

`NOTION_API_KEY` については、[Notion API を使用したインテグレーションの作成](https://www.notion.so/ja-jp/help/create-integrations-with-the-notion-api) を参考にして、Notion API のトークン（key）を作成します。

`GMAIL_APP_PASSWORD` については、[アプリ パスワードでログインする - Gmail ヘルプ](https://support.google.com/mail/answer/185833?hl=ja) を参考にして、Gmail のアプリパスワードを作成します。

### 依存ライブラリのインストール

```bash
yarn
```

## 使用方法

```bash
yarn ts-node src/notifyRandomly.ts
```

上記のコマンドを実行すると、Notion Database からランダムに選ばれた過去の Tweet を 1 件取得し、それをメールで通知します。

```bash
yarn ts-node src/notifyYesterdayTweets.ts
```

上記のコマンドを実行すると、Notion Database から前日に作成された全ての Tweet を取得し、それをメールで通知します。

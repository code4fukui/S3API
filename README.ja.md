# S3API

AWS S3バケットとやり取りするためのAPIです。

## 機能
- AWS S3バケットとやり取りするためのシンプルなAPIを提供
- ファイルのアップロード、ダウンロード、一覧取得、削除などの基本操作をサポート
- AWS認証情報を使用した認証を自動的に処理
- アップロードするファイルに対するデフォルトのアクセス制御ポリシーを設定可能

## 要件
- [Deno](https://deno.land) ランタイム環境

## 使い方
1. `example`ディレクトリに以下の内容で`s3.secret.yml`ファイルを作成します：

```yaml
AWS_ACCESS_KEY_ID: 
AWS_SECRET_ACCESS_KEY: 
AWS_S3_BUCKET: 
AWS_REGION: ap-northeast-1
```

2. プレースホルダーの値を実際のAWS認証情報とS3バケット情報に置き換えます。

3. コード内で`S3`クラスを使用してS3バケットとやり取りします：

```javascript
import { S3 } from "../S3.js";

const s3 = await new S3().init();

// ファイルをアップロード
await s3.put("test.mov", new Uint8Array(await Deno.readFile("test.mov")), { contentType: "video/quicktime" });

// ファイル一覧を取得
console.log(await s3.list());

// ファイルのURLを取得
console.log(s3.getURL("test.mov"));
```

## ライセンス
MIT License — 詳細は [LICENSE](LICENSE) を参照してください。

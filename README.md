[構成]
-------------------
フロント：React バックエンド：php(Laravel) 画像解析:fastApi

本物のシマエナガとぬいぐるみのシマエナガの分別をしたSNSの作成

[行いたい機能]
-------------------
ユーザー登録・ログイン(完了)

投稿（完了）

いいね

コメント

AI判定への投票

フォロー

タイムライン（全部の取得はしたが個別取得はまだ）

通報

通知

[追加機能の役割]
-------------------
[React]
・ログイン・新規作成（完了）

・プロフィール画面

・プロフィールのQRコード表示

・投稿欄（ここでは投稿内容の確認するためのダイアログも追加）#Postインターフェイスの作成

・シマエナガ判別する

・他の人の投稿（いいね・フォロー・コメントの追加）

※戻るボタンなどはnavgate使ってコンポーネットで逐一作成していく

[php]
以下の内容を行うためのDB設計とModelの追加

ユーザー（完了）

ログイン（完了）

投稿（一部完了）

コメント（postテーブル作成）

いいね

フォロー

[fastApi]
シマエナガの判別（実装はしているため後はレスポンスを返す）

[実行方法]
React : npm run dev 

php : php artisan serve ※backend-laravelファイルの直下で行う

Laravelでのファイル作成

modelの場合

php artisan make:model Post

※modelは頭文字が大文字なのが通例、DB名はpostsの場合このような名前になる

controllerの場合

php artisan make:controller PostController

※controllerも頭文字が大文字なのが通例

fastApi : uvicorn main:app --reload　※main.pyのところで行う


## データセットについて

本プロジェクトでは、シマエナガの「本物」と「ぬいぐるみ」を識別するモデルを構築するため、自作のデータセット（各50枚）を作成しました。

### 前処理（Data Preprocessing）
1. **トリミング（クロップ）:**
   撮影時の背景ノイズ（部屋の壁や床の境界線など）による過学習を防ぐため、すべての画像を中央1:1（正方形）に厳密にトリミングしました。
2. **データ拡張（Data Augmentation）:**
   データ不均衡を解消するため、PyTorch（torchvision.transforms）を用いて、リアルなぬいぐるみ画像に対して「左右反転」「微小な回転（±10度）」のデータ拡張を施し、30枚にアップサンプリングしました。

[ダッシュボード]
-------------------


FastApi_ven: .venv\Scripts\activate 実行 uvicorn app.main:app --reload

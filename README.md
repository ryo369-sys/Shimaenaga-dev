Reaact php fastApi

フロント：React バックエンド：php(MVC) 画像解析:fastApiもといPython

本物のシマエナガとぬいぐるみのシマエナガの分別→写真撮影をするころ

やりたいこと
ページでリクエストの部分を作成
fastApiで簡単なレスポンスを返す
php側でリポジトリで編集するか考える
React,php,fastApiでインターファイスを実装する

実行方法
React : npm run dev 
php : php -S localhost:8000 ※index.phpのあるフォルダで行う
fastApi : uvicorn main:app --reload　

順番
React(axios)
↓
php(file_get_contents()で行う)
↓
fastApi(Resnet　レスポンスにreturn {})
↓
php(echo json_encode()で行う)
↓
React(`response.data` / `response.json()`)


-------------------
メールアドレス
□□□□□□

パスワード
□□□□□□

[ログイン]
-------------------

[ダッシュボード]
-------------------


FastApi_ven: .venv\Scripts\activate 実行 uvicorn app.main:app --reload

Reaact php fastApi

フロント：React バックエンド：php(MVC) 画像解析:fastApiもといPython

本物のシマエナガとぬいぐるみのシマエナガの分別

やりたいこと
php側でリポジトリで編集するか考える
※必要ないなら別のリポジトリで練習する
React,php,fastApiでリアルのシマエナガとぬいぐるみのシマエナガのリクエストとレスポンス用のインターファイスを実装する
RezNetで学習させる

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

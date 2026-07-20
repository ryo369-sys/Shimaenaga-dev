Reaact php fastApi

フロント：React バックエンド：php(MVC) 画像解析:fastApiもといPython

本物のシマエナガとぬいぐるみのシマエナガの分別

やりたいこと
php側でリポジトリで編集するか考える
※必要ないなら別のリポジトリで練習する
React,php,fastApiでリアルのシマエナガとぬいぐるみのシマエナガのリクエストとレスポンス用のインターファイスを実装する
Controllerに代入する引数を代入する→api.phpに代入？


実行方法
React : npm run dev 
php : php -S localhost:8000 ※index.phpのあるフォルダで行う
fastApi : uvicorn main:app --reload　※main.pyのところで行う

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

## データセットについて

本プロジェクトでは、シマエナガの「本物」と「ぬいぐるみ」を識別するモデルを構築するため、自作のデータセット（各50枚）を作成しました。

### 前処理（Data Preprocessing）
1. **トリミング（クロップ）:**
   撮影時の背景ノイズ（部屋の壁や床の境界線など）による過学習を防ぐため、すべての画像を中央1:1（正方形）に厳密にトリミングしました。
2. **データ拡張（Data Augmentation）:**
   データ不均衡を解消するため、PyTorch（torchvision.transforms）を用いて、リアルなぬいぐるみ画像に対して「左右反転」「微小な回転（±10度）」のデータ拡張を施し、30枚にアップサンプリングしました。



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

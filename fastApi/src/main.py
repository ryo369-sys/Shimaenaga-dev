# 📄 fastapi_app/main.py
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

# 🚀 FastAPIのインターフェース（データの形を定義）
class ShimaenagaAccuracy(BaseModel):
    real_accuracy: float
    plush_accuracy: float
    total_attempts: int

# 🟢 疎通用のエンドポイント
# PHPからGETリクエスト（例: /accuracy/user123）を受け取る
@app.get("/accuracy/{user_id}", response_model=ShimaenagaAccuracy)
def get_accuracy(user_id: str):
    # 本来はここでDBから取得しますが、今回は疎通テスト用に固定データを返します
    return ShimaenagaAccuracy(
        real_accuracy=85.5,
        plush_accuracy=92.0,
        total_attempts=25
    )
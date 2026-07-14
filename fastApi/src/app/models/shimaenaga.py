# 📄 fastapi_app/app/schemas/shimaenaga.py
from pydantic import BaseModel

# FastAPI（Pydantic）でのインターフェース定義
class ShimaenagaAccuracy(BaseModel):
    real_accuracy: float   # リアルシマエナガの正答率
    plush_accuracy: float  # ぬいぐるみシマエナガの正答率
    total_attempts: int    # 総回答数
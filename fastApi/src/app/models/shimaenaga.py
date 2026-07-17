# 📄 fastapi_app/app/schemas/shimaenaga.py
from pydantic import BaseModel

# FastAPI（Pydantic）でのインターフェース定義
class ShimaenagaAccuracy(BaseModel):
        names = "test",
        accuracy="92.0",
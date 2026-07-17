from fastapi import FastAPI
# routersフォルダーの中の accuracy.py から router を読み込む
from routers.accuracy import router as accuracy_router

app = FastAPI()

# ルーターを登録する
app.include_router(accuracy_router)
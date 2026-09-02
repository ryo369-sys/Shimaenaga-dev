from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers.accuracy import router as accuracy_router

app = FastAPI()

# 💡 React（ポート3000や5173）からの通信を許可するCORS設定
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 💡 動作確認用のルートエンドポイント
@app.get("/")
def read_root():
    return {"message": "FastAPI is running!"}

# ルーターを登録する
app.include_router(accuracy_router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8001, reload=True)
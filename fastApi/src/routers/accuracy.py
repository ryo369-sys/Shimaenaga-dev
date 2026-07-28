# 📂 routers/accuracy.py の中身

from fastapi import APIRouter
from pydantic import BaseModel
from app.predict import judgeShimaenaga
import io
from PIL import Image

# 🌟 このファイル専用のルーターを作る
router = APIRouter(
    prefix="/accuracy",  # URLの始まりを `/accuracy` にする
    tags=["Accuracy"]
)

# -------------------------------------------------------------
# ① 既存：ユーザーの過去データやステータスを取得するGETエンドポイント
# -------------------------------------------------------------
@router.get("/{user_id}")
def get_user_accuracy(user_id: str):
    # ユーザーの過去の判定結果などを返す処理
    return {
        "success": True,
        "message": f"User: {user_id} の過去データを取得しました",
        "user_id": user_id
    }

# -------------------------------------------------------------
# ② 新規：画像を受け取ってシマエナガ判定を行うPOSTエンドポイント
# -------------------------------------------------------------
@router.post("/judge")
async def judge_shimaenaga_image(file: UploadFile = File(...)):
    # 届いた画像ファイルを読み込む
    contents = await file.read()
    image = Image.open(io.BytesIO(contents))
    
    # 判定を実行
    names, accuracy = judgeShimaenaga(image)
    
    return {
        "success": True,
        "message": "画像の判定が完了しました",
        "names": names,
        "accuracy": accuracy
    }
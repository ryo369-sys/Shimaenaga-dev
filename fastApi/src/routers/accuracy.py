# 📂 routers/accuracy.py の中身

from fastapi import APIRouter
from pydantic import BaseModel
from app.predict import judgeShimaenaga
import io
from PIL import Image
from fastapi import APIRouter, UploadFile , File

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
    try:
        # 届いた画像ファイルを読み込む
        contents = await file.read()
        image = Image.open(io.BytesIO(contents))
        
        #判定を実行
        name, accuracy = judgeShimaenaga(image)    
        
        # 💡 成功した場合のレスポンス
        return {
            "success": True,
            "message": "画像の判定が完了しました",
            "name": name,
            "accuracy": accuracy
        }
    except Exception as e:
        # 💡 画像が壊れている・判定処理でエラーが出た場合のレスポンス
        return {
            "success": False,
            "message": f"画像の判定に失敗しました: {str(e)}",
            "name": None,
            "accuracy": 0.0
        }
# 📂 routers/accuracy.py の中身

from fastapi import APIRouter
from pydantic import BaseModel
from app.predict import judgeShimaenaga
import io
from PIL import Image
from fastapi import APIRouter, UploadFile , File
from fastapi import HTTPException

# 🌟 このファイル専用のルーターを作る
router = APIRouter(
    prefix="/accuracy",  # URLの始まりを `/accuracy` にする
    tags=["Accuracy"]
)

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
        label, accuracy_raw = judgeShimaenaga(image)   

        if isinstance(accuracy_raw, str):
            # '%' を消して '62.95' にしてから float にする
            clean_accuracy = accuracy_raw.replace('%', '').strip()
            accuracy = float(clean_accuracy)
        else:
            accuracy = float(accuracy_raw) 

        # 💡 成功した場合のレスポンス
        return {
            "success": True,
            "message": "画像の判定が完了しました",
            "label": label,
            "accuracy": float(accuracy)
        }
    except Exception as e:
        # 💡 画像が壊れている・判定処理でエラーが出た場合のレスポンス
        raise HTTPException(
            status_code=500,
            detail=f"画像の判定に失敗しました: {str(e)}"
        )
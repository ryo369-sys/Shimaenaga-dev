# 📂 routers/accuracy.py の中身

from fastapi import APIRouter
from pydantic import BaseModel
from app.predict import judgeShimaenaga

# 🌟 このファイル専用のルーターを作る
router = APIRouter(
    prefix="/accuracy",  # URLの始まりを `/accuracy` にする
    tags=["Accuracy"]
)

# 🚀 データの形を定義
class ShimaenagaAccuracy(BaseModel):
    names: str
    accuracy: str

# 🟢 エンドポイント（@router に変更！）
# PHPからは `/accuracy/user123` でアクセスできます
@router.get("/{user_id}", response_model=ShimaenagaAccuracy)
def get_accuracy(user_id: str):
    img = 'C:/Users/anicc/AppData/Local/Shimaenaga/fastApi/src/app/dataset/val/plush/val_plush_shimaenaga (3).JPG'
    names, accuracy = judgeShimaenaga(img)
    
    return {
        "names": names,
        "accuracy": accuracy
    }
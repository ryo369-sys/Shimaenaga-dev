import torch
import torchvision.transforms as transforms
from PIL import Image
import torchvision.models as models
import torch.nn as nn

def judgeShimaenaga(image_path):
    # 1. デバイスとクラス名の設定
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    class_names = ['plush', 'real']

    # 2. モデル構造を定義し、学習済みの重みをロード
    model = models.resnet50()
    num_ftrs = model.fc.in_features
    model.fc = nn.Linear(num_ftrs, len(class_names))

    # 💡 解決策①：モデルの重みのパスを絶対パスにする
    model_weight_path = r'C:\Users\anicc\AppData\Local\Shimaenaga\fastApi\src\app\my_resnet_model.pth'
    model.load_state_dict(torch.load(model_weight_path, map_location=device))
    model = model.to(device)
    model.eval()

    # 💡 解決策②：引数で受け取った image_path をそのまま使う（上書きしない）
    image = Image.open(image_path).convert('RGB')

    transform = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
        transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
    ])
    input_tensor = transform(image).unsqueeze(0).to(device)

    # 4. 推論（予測）
    with torch.no_grad():
        outputs = model(input_tensor)
        _, preds = torch.max(outputs, 1)
        probabilities = torch.nn.functional.softmax(outputs[0], dim=0)

    # 各クラスの確率の表示・取得
    result_percentage = 0.0
    for i, class_name in enumerate(class_names):
        percentage = probabilities[i].item() * 100
        print(f"{class_name} である確率: {percentage:.2f}%")
        if i == preds[0].item():
            result_percentage = percentage  # 予測されたクラスの確率を保存

    # 5. 結果表示
    predicted_class = class_names[preds[0].item()]
    print(f"判定結果：この画像は「{predicted_class}」です！")
    
    # 💡 float型を正しくフォーマットして返す
    return str(predicted_class), f"{result_percentage:.2f}%"
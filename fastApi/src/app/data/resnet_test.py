import torch
import torchvision.models as models

# 1. GPUが使えるか確認して、デバイスを設定
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print(f"使用するデバイス: {device}")

# 2. 学習済みの ResNet-50 モデルをロード
# ※ weights=... を指定するのが現在のPyTorchの推奨スタイルです
weights = models.ResNet50_Weights.DEFAULT
model = models.resnet50(weights=weights)

# 3. モデルをGPU（CUDA）に転送！
model = model.to(device)

# 4. モデルを評価モードに設定
model.eval()

print("ResNet-50 のロードとGPUへの転送が完了しました！")
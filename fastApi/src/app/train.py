import torch
import torch.nn as nn
import torch.optim as optim
from torchvision import datasets, transforms, models
import os

# 1. デバイスの設定（GPUが使えればGPUを使用）
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print(f"Using device: {device}")

# 2. 画像の前処理（リサイズ、テンソル化、標準化）
data_transforms = {
    'train': transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.RandomHorizontalFlip(),  # データ拡張（学習を強くする）
        transforms.ToTensor(),
        transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
    ]),
    'val': transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
        transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
    ]),
}

# 3. データセットの読み込み
data_dir = 'dataset'  # 画像フォルダのパス
image_datasets = {x: datasets.ImageFolder(os.path.join(data_dir, x), data_transforms[x])
                  for x in ['train', 'val']}
dataloaders = {x: torch.utils.data.DataLoader(image_datasets[x], batch_size=4, shuffle=True)
               for x in ['train', 'val']}

class_names = image_datasets['train'].classes
print(f"検出対象クラス: {class_names}")  # 例：['cat', 'dog']

# 4. 学習済みResNet-50のロードと最終層のカスタマイズ
model = models.resnet50(weights=models.ResNet50_Weights.DEFAULT)

# 既存の出力層（1000クラス用）の入力サイズを取得し、自分のクラス数（例：2）に書き換える
num_ftrs = model.fc.in_features
model.fc = nn.Linear(num_ftrs, len(class_names)) 

model = model.to(device)

# 5. 損失関数と最適化手法の設定
criterion = nn.CrossEntropyLoss()
optimizer = optim.SGD(model.parameters(), lr=0.001, momentum=0.9)

# 6. 簡単な学習ループ（今回はひとまず2エポックお試し）
num_epochs = 2
for epoch in range(num_epochs):
    print(f'Epoch {epoch+1}/{num_epochs}')
    print('-' * 10)

    for phase in ['train', 'val']:
        if phase == 'train':
            model.train()
        else:
            model.eval()

        running_loss = 0.0
        running_corrects = 0

        for inputs, labels in dataloaders[phase]:
            inputs, labels = inputs.to(device), labels.to(device)

            optimizer.zero_grad()

            with torch.set_grad_enabled(phase == 'train'):
                outputs = model(inputs)
                _, preds = torch.max(outputs, 1)
                loss = criterion(outputs, labels)

                if phase == 'train':
                    loss.backward()
                    optimizer.step()

            running_loss += loss.item() * inputs.size(0)
            running_corrects += torch.sum(preds == labels.data)

        epoch_loss = running_loss / len(image_datasets[phase])
        epoch_acc = running_corrects.double() / len(image_datasets[phase])

        print(f'{phase} Loss: {epoch_loss:.4f} Acc: {epoch_acc:.4f}')

# 7. 学習したモデルの重みを保存する
torch.save(model.state_dict(), 'my_resnet_model.pth')
print("モデルを 'my_resnet_model.pth' として保存しました！")
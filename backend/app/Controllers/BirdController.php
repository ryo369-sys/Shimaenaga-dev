<?php
// 📄 backend/app/Controllers/BirdController.php

namespace App\Controllers;

class BirdController
{
    // 🟢 テスト用に引数を一旦無くすか、デフォルト値"test_user"を設定します
    public function getFastApiData($userId)
    {
        $fastApiUrl = "http://127.0.0.1:8080/accuracy/" . urlencode($userId);

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $fastApiUrl);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_TIMEOUT, 5);
        curl_setopt($ch, CURLOPT_NOPROXY, '127.0.0.1,localhost');

        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

        // ReactにJSONとして返すための準備（CORS許可も追加しておきます）
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Headers: Content-Type");
        header('Content-Type: application/json');

        if (curl_errno($ch)) {
            $error_msg = curl_error($ch);
            echo json_encode(["success" => false, "message" => "通信エラー: " . $error_msg]);
            exit;
        }

        if ($httpCode === 200) {
            $data = json_decode($response, true);
            
            echo json_encode([
                "success" => true,
                "message"=> "User: {$user_id} の過去データを取得しました",
                "user_id"=> $user_id
            ]);
            exit;
        } else {
            echo json_encode(["success" => false, "message" => "FastAPIエラー。ステータスコード: " . $httpCode]);
            exit;
        }
    }
    public function judgeImage()
    {
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Headers: Content-Type");
        header('Content-Type: application/json');

        // Reactやフォームから画像ファイルが送られてきているか確認
        if (!isset($_FILES['image']) || $_FILES['image']['error'] !== UPLOAD_ERR_OK) {
            echo json_encode(["success" => false, "message" => "画像ファイルが正しくアップロードされていません"]);
            exit;
        }

        // 送られてきた一時ファイルの情報を取得
        $tmpFilePath = $_FILES['image']['tmp_name'];
        $fileName = $_FILES['image']['name'];
        $mimeType = $_FILES['image']['type'];

        // FastAPIの新しいPOST用URL
        $fastApiUrl = "http://127.0.0.1:8080/accuracy/judge";

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $fastApiUrl);
        curl_setopt($ch, CURLOPT_POST, true);
        
        // 💡 multipart/form-data形式で画像ファイルをPOST送信する設定
        // （FastAPI側の file: UploadFile と名前を合わせる！）
        curl_setopt($ch, CURLOPT_POSTFIELDS, [
            'file' => new \CURLFile($tmpFilePath, $mimeType, $fileName)
        ]);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_TIMEOUT, 10); // 画像処理は少し時間がかかる場合があるので10秒に延長

        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        if ($httpCode === 200) {
            $data = json_decode($response, true);

            // 💡 必要であればここで Model を呼び出してDBに保存する！
            // $birdModel = new BirdModel();
            // $birdModel->saveAccuracy($data['accuracy']);

            // Reactへ判定結果を返す
            echo json_encode([
                "success" => true,
                "data" => $data
            ]);
            exit;
        } else {
            echo json_encode(["success" => false, "message" => "判定エラー。HTTPステータス: " . $httpCode]);
            exit;
        }
    }
}
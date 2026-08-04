<?php
// 📄 backend/app/Controllers/ImageController.php

namespace App\Controllers;

class ImageController
{
    // 🟢 デフォルト値nullを設定します
    public function GetAccuracy($fileName = null)
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

        $fastApiUrl = "http://127.0.0.1:8000/accuracy/judge";

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $fastApiUrl);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, [
            'file' => new \CURLFile($tmpFilePath, $mimeType, $fileName)
        ]);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_TIMEOUT, 10); // 画像処理のため10秒に設定
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
                "success" => $data["success"] ?? false,
                "message" => $data["message"] ?? "処理が完了しました",
                "name" => $data["name"] ?? null,
                "accuracy" => $data["accuracy"] ?? 0
            ]);
            exit;
        } else {
            echo json_encode(["success" => false, "message" => "FastAPIエラー。ステータスコード: " . $httpCode]);
            exit;
        }
    }
}
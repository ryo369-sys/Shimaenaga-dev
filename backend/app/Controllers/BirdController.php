<?php
// 📄 backend/app/Controllers/BirdController.php

namespace App\Controllers;

class BirdController
{
    // 🟢 テスト用に引数を一旦無くすか、デフォルト値を設定します
    public function getFastApiData($userId = "test_user")
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
                "data" => $data
            ]);
            exit;
        } else {
            echo json_encode(["success" => false, "message" => "FastAPIエラー。ステータスコード: " . $httpCode]);
            exit;
        }
    }
}
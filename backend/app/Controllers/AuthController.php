<?php

require_once "../app/Models/User.php";

class AuthController
{
    public function login()
    {
        // React（ポート5173）からのアクセスを許可
        header("Access-Control-Allow-Origin: http://localhost:5173"); 
        header("Access-Control-Allow-Headers: Content-Type");
        header("Content-Type: application/json; charset=UTF-8");

        $json = file_get_contents("php://input");
        $data = json_decode($json, true);

        // 💡 データの存在チェック
        if (!empty($data['user_id']) && !empty($data['password'])) {
            
            // 🚀【テスト用】DB接続エラーを回避するため、直に文字を比較します
            if ($data['user_id'] === 'shimaenaga_user' && $data['password'] === 'hashed_password_123') {
                echo json_encode([
                    "success" => true,
                    "message" => "ログイン成功（テスト照合）！"
                ]);
                exit;
            } else {
                echo json_encode([
                    "success" => false,
                    "message" => "ユーザーIDまたはパスワードが間違っています。"
                ]);
                exit;
            }
        }

        // データが空で届いた場合
        echo json_encode([
            "success" => false,
            "message" => "PHPのControllerまで届きましたが、データが空です。",
            "received_data" => $data
        ]);
        exit;
    }
}
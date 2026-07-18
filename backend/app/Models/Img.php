<?php

namespace App\Models;

use PDO;

class ImgModel
{
    public function GetAccuracy($img){
                // ① データベースの接続情報
        $host     = $_ENV['DB_HOST'];
        $dbname   = $_ENV['DB_NAME'];
        $username = $_ENV['DB_USER'];
        $password = $_ENV['DB_PASS'];
        $charset  = $_ENV['DB_CHARSET'];

    // 接続オプション（エラー時に例外を投げる、連想配列で結果を受け取るなど）
    $options = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ];

        $responseJson = file_get_contents("http://localhost:8000/accuracy/user123");

        $data = json_decode($responseJson, true);
        
        // 🌟FastAPI側で決めた名前（キー）で値を取り出せます！
        $namesFromApi    = $data['names'];     
        $accuracyFromApi = $data['accuracy'];  

        $dsn = "mysql:host=$host;dbname=$dbname;charset=utf8mb4";
        try {
            // ② MySQLへ接続
            $pdo = new PDO($dsn, $username, $password, $options);

            $sql = 'INSERT INTO imageaccuracy (img_name, resultName, resultAccuracy) 
                    VALUES (:img_name, :resultName, :resultAccuracy)';
            $stmt = $pdo->prepare($sql);
            $params->execute([':img_name' => $img,
                            ':resultName' => $namesFromApi,
                            ':resultAccuracy' => $accuracyFromApi]);
            return $stmt->execute($params);
        } catch (PDOException $e) {
            // 💡 データベース接続そのものが失敗したときのエラーハンドリング
           return false;
        }
    }

    public function GetImage($data){
        // ① データベースの接続情報
        $host     = $_ENV['DB_HOST'];
        $dbname   = $_ENV['DB_NAME'];
        $username = $_ENV['DB_USER'];
        $password = $_ENV['DB_PASS'];
        $charset  = $_ENV['DB_CHARSET'];

    // 接続オプション（エラー時に例外を投げる、連想配列で結果を受け取るなど）
    $options = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ];

    $dsn = "mysql:host=$host;dbname=$dbname;charset=utf8mb4";
        try {
            // ② MySQLへ接続
            $pdo = new PDO($dsn, $username, $password, $options);

            // ③ SQL文の準備と実行（usersテーブルからデータを全件取得）
            $sql = 'INSERT INTO users (user_id, password, email, gender, age) 
                    VALUES (:user_id, :password, :email, :gender, :age)';
            $stmt = $pdo->prepare($sql);
            $params =   [
                    ':user_id' => $data['user_id'], 
                    ':password' => $data['password'],
                    ':email' => $data['email'],
                    ':gender' => $data['gender'],
                    ':age' => $data['age'],
            ];
        return $stmt->execute($params); // 成功したら true, 失敗したら false を返す
        } catch (PDOException $e) {
            echo json_encode(["success" => false, "message" => "DBエラー: " . $e->getMessage()]);
            exit;
        }
    }
}

?>
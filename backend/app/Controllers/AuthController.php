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

        // ① データベースの接続情報
        $host     = 'localhost';
        $dbname   = 'shimaenaga_app';
        $username = 'root';
        $password = 'Xrqd75uz917!';
        $charset  = 'utf8mb4';

    // 接続オプション（エラー時に例外を投げる、連想配列で結果を受け取るなど）
    $options = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ];

        $dsn = "mysql:host=$host;dbname=$dbname;charset=$charset";
        try {
            // ② MySQLへ接続
            $pdo = new PDO($dsn, $username, $password, $options);

            // ③ SQL文の準備と実行（usersテーブルからデータを全件取得）
            $stmt = $pdo->prepare('SELECT * FROM users WHERE user_id = :user_id');
            $stmt->execute(['user_id' => $data['user_id']]);
            $users = $stmt->fetch();
            if ($users && $data['password'] === $users['password']) {
                echo json_encode(["success" => true, "message" => "ログイン成功！"]);
                exit;
            }else{
            // 接続エラーなどが起きた場合はここでキャッチする
                echo json_encode(["success" => false, "message" => "IDまたはパスワードが違います。"]);
                exit;
                }
        } catch (\PDOException $e) {
                // 💡 データベース接続そのものが失敗したときのエラーハンドリング
               echo json_encode(["success" => false, "message" => "データベースエラーが発生しました。"]);
                exit;
            }
        }
    }

?>


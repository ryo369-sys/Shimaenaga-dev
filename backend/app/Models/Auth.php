<?php

class AuthModel
{
    public function getUserByUser($userId){
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
        $dsn = "mysql:host=$host;dbname=$dbname;charset=$charset";
        try {
            // ② MySQLへ接続
            $pdo = new PDO($dsn, $username, $password, $options);

            // ③ SQL文の準備と実行（usersテーブルからデータを全件取得）
            $stmt = $pdo->prepare('SELECT * FROM users WHERE user_id = :user_id');
            $stmt->execute(['user_id' => $userId]);
            $users = $stmt->fetch();
            return $users;
        } catch (\PDOException $e) {
            // 💡 データベース接続そのものが失敗したときのエラーハンドリング
           return false;
        }
    }

    public function CreateUser($date){
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

    $dsn = "mysql:host=$host;dbname=$dbname;charset=$charset";
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
        } catch (\PDOException $e) {
            return false;
        }
    }
}

?>
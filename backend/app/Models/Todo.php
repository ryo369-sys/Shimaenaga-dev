<?php

namespace App\Models;

use PDO;

class TodoModel
{
    // public function Timeline_show()
    // {
    //     $data = [
    //     [
    //         "id" => 1,
    //         "userName" => "テストユーザー",
    //         "content" => "これが最初のテスト投稿です！"
    //     ],
    //     [
    //         "id" => 2,
    //         "userName" => "しまえなが",
    //         "content" => "2件目の投稿テストです。"
    //     ]
    // ];
    public function Timeline_show(){
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
            $sql = "SELECT id, user_id, user_name 
                AS userName, content, image_path 
                AS imagePath, likes_count 
                AS likesCount, created_at 
                FROM posts ORDER BY created_at DESC";
            
            $stmt = $pdo->prepare($sql);
            $stmt->execute();
            // 2. 配列として全件取得
            $posts = $stmt->fetchAll(PDO::FETCH_ASSOC);
            if ($posts === false) {
                $posts = [];
            }
                // 1. レスポンスがJSONであることをブラウザやReactに伝える
            header('Content-Type: application/json; charset=utf-8');
            // 2. array_values で確実に純粋な配列にしてから json_encode して出力する
            echo json_encode(array_values($posts));
            exit; 
            return $posts;
        } catch (PDOException $e) {
            // 💡 データベース接続そのものが失敗したときのエラーハンドリング
           return false;
        }
    }
}
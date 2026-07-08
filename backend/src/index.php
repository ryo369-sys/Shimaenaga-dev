<?php
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
    $stmt = $pdo->query('SELECT * FROM users');
    $users = $stmt->fetchAll();

} catch (\PDOException $e) {
    // 接続エラーなどが起きた場合はここでキャッチする
    die("データベース接続エラー: " . $e->getMessage());
}
?>

<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>ユーザー一覧</title>
</head>
<body>
    <h1>ユーザー一覧</h1>

    <?php if (empty($users)): ?>
        <p>データはまだありません（テーブルは空です）。</p>
    <?php else: ?>
        <ul>
            <?php foreach ($users as $user): ?>
                <li><?= htmlspecialchars($user['user_id'], ENT_QUOTES, 'UTF-8') ?> (<?= htmlspecialchars($user['email'], ENT_QUOTES, 'UTF-8') ?>)</li>
            <?php endforeach; ?>
        </ul>
    <?php endif; ?>

</body>
</html>
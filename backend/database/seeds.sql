-- -----------------------------------------------------
-- テストデータの挿入
-- -----------------------------------------------------
-- 一度テーブルの中身を空っぽにする（重複エラーを防ぐため）
TRUNCATE TABLE `users`;

INSERT INTO `users` (`name`, `email`, `password`) VALUES
('シマエナガ 太郎', 'taro@example.com', 'hashed_password_123'),
('鈴木 花子', 'hanako@example.com', 'hashed_password_456'),
('佐藤 次郎', 'jiro@example.com', 'hashed_password_789');
<?php
// 📄 backend/src/index.php の【完全版】（これ以外の中身はすべて消してください）

// 1. 全てのリクエストに対してCORS一括許可
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE");
header("Content-Type: application/json; charset=UTF-8");


require_once __DIR__ . '/../vendor/autoload.php';

// 2. .envファイルを読み込む命令（backend直下の.envを探しに行きます）
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();

// 2. 事前テスト（OPTIONS）は200を返して即終了
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once __DIR__ . '/../app/Controllers/AuthController.php';

ini_set('display_errors', 1);
error_reporting(E_ALL);

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$method = $_SERVER['REQUEST_METHOD'];

// ==========================================
// 🔒 ログインのルート
// ==========================================
if (str_ends_with($uri, "/api/login")) {
    if ($method === "POST") {
        $authController = new AuthController();
        $authController->login();
        exit; 
    }
}

// ==========================================
// 🚀 新規登録のルート（完全に外側に独立！）
// ==========================================
if (str_ends_with($uri, "/api/register")) {
    if ($method === "POST") {
        $authController = new AuthController();
        $authController->register();
        exit; 
    }
}

// ==========================================
// ⚠️ どのURLにも当てはまらなかった場合
// ==========================================
http_response_code(404);
echo json_encode(["success" => false, "message" => "APIルートが見つかりません。"]);
exit;
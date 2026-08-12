<?php

require_once "../app/Controllers/TodoController.php";
require_once "../app/Controllers/AuthController.php";
require_once "../app/Controllers/ImageController.php";
require_once "../app/Controllers/BirdController.php";

$todoController = new TodoController();
$authController = new AuthController();
$imageController = new ImageController();
$birdController = new BirdController();

if ($uri === "/api/login" && $method === "POST") {
    $authController->login();
}

if ($uri === "/api/register" && $method === "POST") {
    $authController->register();
}

if ($uri === "/api/fastApi" && $method === "POST") {
    // 1. 送られてきた生のJSON文字列を読み込む
    $jsonRaw = file_get_contents('php://input');
    // 2. JSON文字列をPHPの連想配列（$data）に変換する
    $data = json_decode($jsonRaw, true);
    // 💡 送られてきたJSONデータを連想配列に変換する    
    $userId = $data['user_id'] ?? null;
    
    $imageController->getFastApiData($userId);
}


if ($uri === "/api/GetAccuracy" && $method === "POST") {
    if(is_uploaded_file($_FILES['img']['tmp_name']) === true)
    // 1. 送られてきた生のJSON文字列を読み込む
    $jsonRaw = file_get_contents('php://input');
    // 2. JSON文字列をPHPの連想配列（$data）に変換する
    $data = json_decode($jsonRaw, true);
    $Image = $data['img'] ?? null;
    $imageController->GetAccuracy($Image);
}

if ($uri === "/api/timeline" && $method === "get") {
    $todoController->Timeline_show();
}

if ($uri === "/api/images" && $method === "POST") {
    $imageController->upload();
}
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

if ($uri === "/api/fastApi" && $method === "GET") {
    $birdController->getFastApiData();
}


if ($uri === "/api/todos" && $method === "POST") {
    $todoController->store();
}

if ($uri === "/api/images" && $method === "POST") {
    $imageController->upload();
}
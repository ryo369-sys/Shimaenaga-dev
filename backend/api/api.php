<?php

require_once "../app/Controllers/TodoController.php";
require_once "../app/Controllers/AuthController.php";
require_once "../app/Controllers/ImageController.php";

$todoController = new TodoController();
$authController = new AuthController();
$imageController = new ImageController();

if ($uri === "/api/login" && $method === "POST") {
    $authController->login();
}

if ($uri === "/api/todos" && $method === "GET") {
    $todoController->index();
}

if ($uri === "/api/todos" && $method === "POST") {
    $todoController->store();
}

if ($uri === "/api/images" && $method === "POST") {
    $imageController->upload();
}
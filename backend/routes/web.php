<?php

require_once "../app/Controllers/TodoController.php";

$controller = new TodoController();

$uri = $_SERVER["REQUEST_URI"];
$method = $_SERVER["REQUEST_METHOD"];

if ($uri === "/todos" && $method === "GET") {
    $controller->index();
}

if ($uri === "/todos" && $method === "POST") {
    $controller->store();
}
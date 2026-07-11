<?php

require_once "../app/Controllers/AuthController.php";

$authController = new AuthController();

if ($uri === "/images" && $method === "GET") {
    $authController->index();
}

if ($uri === "/images" && $method === "POST") {
    $authController->store();
}

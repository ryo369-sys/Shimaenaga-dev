<?php

require_once "../app/Controllers/BirdController.php";

$birdcontroller = new BirdController();


if ($uri === "/birds" && $method === "GET") {
    $birdController->index();
}

if ($uri === "/birds" && $method === "POST") {
    $birdController->store();
}
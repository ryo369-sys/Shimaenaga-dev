<?php

require_once "../app/Controllers/ImageController.php";

$imagecontroller = new ImageController();

if ($uri === "/images" && $method === "GET") {
    $imagecontroller->index();
}

if ($uri === "/images" && $method === "POST") {
    $imagecontroller->store();
}

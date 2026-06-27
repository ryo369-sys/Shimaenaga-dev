<?php

require_once "../app/Controllers/TodoController.php";

$todocontroller = new TodoController();

if ($uri === "/todos" && $method === "GET") {
    $todocontroller->index();
}

if ($uri === "/todos" && $method === "POST") {
    $todocontroller->store();
}

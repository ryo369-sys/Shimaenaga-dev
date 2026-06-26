<?php

require_once "../app/Models/Todo.php";

class TodoController
{
    public function index()
    {
        $todo = new Todo();

        $result = $todo->all();

        echo json_encode($result);
    }

    public function store()
    {
        echo json_encode([
            "message" => "登録成功"
        ]);
    }
}
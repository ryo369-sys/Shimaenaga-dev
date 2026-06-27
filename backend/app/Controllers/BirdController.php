<?php

require_once "../app/Models/Bird.php";

class BirdController
{
    public function index()
    {
        $bird = new Bird();

        $result = $bird->all();

        echo json_encode($result);
    }

    public function store()
    {
        echo json_encode([
            "message" => "登録成功"
        ]);
    }
}
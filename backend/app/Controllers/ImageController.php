<?php

require_once "../app/Models/Bird.php";

class ImageController
{
    public function index()
    {
        $Img = new Img();

        $result = $Img->all();

        echo json_encode($result);
    }

    public function store()
    {
        echo json_encode([
            "message" => "登録成功"
        ]);
    }
}
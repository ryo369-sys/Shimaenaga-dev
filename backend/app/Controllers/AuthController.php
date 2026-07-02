<?php

require_once "../app/Models/Bird.php";

class AuthController
{
    public function login()
    {
        $request = json_decode(
            file_get_contents("php://input"),
            true
        );

        $userId = $request["user_id"];
        $password = $request["password"];

        $model = new UserModel();

        $result = $model->login(
            $userId,
            $password
        );

        echo json_encode($result);
    }
}
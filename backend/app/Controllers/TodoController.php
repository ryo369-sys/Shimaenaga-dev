<?php

namespace App\Controllers;
use App\Models\TodoModel;
require_once "../app/Models/Todo.php";

class TodoController
{
    public function Timeline_show()
    {
        $json = file_get_contents("php://input");
        $data = json_decode($json, true);

        $todoModel = new TodoModel();
        
        $success = $todoModel->Timeline_show();
        if ($success) {
                echo json_encode(["success" => true, "message" => "タイムライン取得に成功しました！"]);
                exit;
            } else {
                echo json_encode(["success" => false, "message" => "タイムライン取得に失敗しました。"]);
                exit;
            }
                // 💡 データベース接続そのものが失敗したときのエラーハンドリング
        }
    

    public function store()
    {
        echo json_encode([
            "message" => "登録成功"
        ]);
    }
}
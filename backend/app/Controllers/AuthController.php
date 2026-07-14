<?php
namespace App\Controllers;
require_once "../app/Models/Auth.php";
use App\Models\AuthModel;


class AuthController
{
    public function login()
    {
        // Reactからのデータを受け取る（Controllerの仕事）
        $json = file_get_contents("php://input");
        $data = json_decode($json, true);

        $authModel = new AuthModel();
        // SQLの面倒な処理は、ID（$data['user_id']）を渡して丸投げする！
        $users = $authModel->getUserByUser($data['user_id']);

        // 結果を判定してお返事を返す（Controllerの仕事）
        if ($users && $data['password'] === $users['password']) {
            echo json_encode(["success" => true, "message" => "ログイン成功！"]);
            exit;
        } else {
            echo json_encode(["success" => false, "message" => "IDまたはパスワードが違います。"]);
            exit;
        }

    }

        public function register()
    {
        // // React（ポート5173）からのアクセスを許可
        // header("Access-Control-Allow-Origin: http://localhost:5173"); 
        // header("Access-Control-Allow-Headers: Content-Type");
        // header("Content-Type: application/json; charset=UTF-8");

        $json = file_get_contents("php://input");
        $data = json_decode($json, true);

        $authModel = new AuthModel();
        
            $success = $authModel->createUser($data);
            if ($success) {
                    echo json_encode(["success" => true, "message" => "新規作成に成功しました！"]);
                    exit;
                } else {
                    echo json_encode(["success" => false, "message" => "新規作成に失敗しました。"]);
                    exit;
                }
                // 💡 データベース接続そのものが失敗したときのエラーハンドリング
            }
        }

?>


<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'user_id' => 'required',
            'password' => 'required',
        ]);

        // 2. Reactからの送信データを取得
        $userId = $request->input('user_id');
        $password = $request->input('password');

        // 3. Model（User）を使ってDBからユーザーを1件検索
        $user = User::where('user_id', $userId)->first();

        // 4. ユーザーが存在し、パスワードが一致するか検証
        if ($user && Hash::check($password, $user->password)) {
            // 成功時：200 OK でユーザー情報を返却
            return response()->json([
                'success' => true,
                'message' => 'ログインに成功しました',
                'user' => [
                    'id' => $user->id,
                    'user_id' => $user->user_id,
                    'username' => $user->username,
                ],
            ], 200);
        }

        // 失敗時：401 Unauthorized でエラーメッセージを返却
        return response()->json([
            'success' => false,
            'message' => 'ユーザーIDまたはパスワードが正しくありません',
        ], 401);
    }

    public function register(Request $request)
    {
        try {
            $request->validate([
                'user_id' => 'required|string|unique:users,user_id',
                'username' => 'required|string',
                'password' => 'required|string|min:6',
                'email' => 'required|email',
                'gender' => 'required',
                'age' => 'required|integer',
            ]);
            User::create([
                'user_id'  => $validate['user_id'],
                'username' => $validated['username'],
                'password' => Hash::make($validatedData['password']), // ★必ず Hash::make を使う！
                'email' => $validate['email'],
                'gender' => $validate['gender'],
                'age' => $validate['age'],
            ]);
            
            return response()->json([
                'success' => true,
                'message' => 'ユーザー登録が完了しました',
                'user' => [
                    'id'       => $user->id,
                    'user_id'  => $user->user_id,
                    'username' => $user->username,
                ],
            ], 201);

        }catch (ValidationException $e) {
            // バリデーションエラー時（ID重複や文字数不足など）
            return response()->json([
                'success' => false,
                'message' => '入力内容に誤りがあります',
                'errors'  => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            // その他の予期せぬエラー時
            return response()->json([
                'success' => false,
                'message' => 'サーバーエラーが発生しました',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }
}

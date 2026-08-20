<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\QueryException;

class UserController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if ($user && Hash::check($request->password, $user->password)) {
            return response()->json([
                'success' => true,
                'message' => 'ログインに成功しました',
                'user' => [
                    'id' => $user->id,
                    'username' => $user->username,
                ],
            ], 200);
        }

        return response()->json([
            'success' => false,
            'message' => 'メールアドレスまたはパスワードが正しくありません',
        ], 401);
    }

    public function register(Request $request)
    {
        try {
            $validated = $request->validate([
                'username' => 'required|string',
                'password' => 'required|string|min:6',
                'email' => 'required|email',
                'gender' => 'required',
                'age' => 'required|integer',
            ]);
            $user = User::create([
                'username' => $validated['username'],
                'password' => Hash::make($validated['password']), // ★必ず Hash::make を使う！
                'email' => $validated['email'],
                'gender' => $validated['gender'],
                'age' => $validated['age'],
            ]);
            
            return response()->json([
                'success' => true,
                'message' => 'ユーザー登録が完了しました',
                'user' => [
                    'id'       => $user->id,
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

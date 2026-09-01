<?php

namespace App\Http\Controllers;
use App\Models\Accuracy;

use Illuminate\Http\Request;

class AccuracyController extends Controller
{
    public function GetAccuracy(Request $request)
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
}

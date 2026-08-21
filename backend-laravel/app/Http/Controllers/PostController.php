<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{

    public function getTimeline($id)
    {
        try {
            // ★ where() の後は get() を使う（latest() で新しい順）
            $posts = Post::where('id', $id)->latest()->get();

            return response()->json([
                'success' => true,
                'message' => '投稿の取得に成功しました',
                'posts'   => $posts, // 配列形式で投稿一覧が返ります
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => '投稿の取得に失敗しました',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }
    
    public function getAllTimeline()
    {
        try {
            // ★ with('user') を追加することで、投稿データの中に投稿者情報 (users) も自動で入ります
            $posts = Post::with('user')->latest()->get();

            return response()->json($posts, 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => '取得に失敗しました',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }

    public function store(Request $request)
    {
        // 1. バリデーション
        $request->validate([
            'content' => 'required|string|max:1000',
        ]);

        // ★ 最低限知っておく点: Auth::id() でログインユーザーのIDを自動セット
        // リクエストヘッダー（TokenやCookie）から認証されたユーザーの ID が自動的に入ります
        $user = Auth::user();

        $post = Post::create([
            'user_id'   => Auth::id(),        // ★ 自動でログインユーザーのIDを割り当てる
            'user_name' => $user->username,   // 必要に応じてユーザー名も取得可能
            'content'   => $request->content,
        ]);

        return response()->json([
            'message' => '投稿に成功しました',
            'post'    => $post
        ], 201);
    }
}

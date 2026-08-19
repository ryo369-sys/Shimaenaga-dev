<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PostController extends Controller
{
    use App\Models\Post;

    public function getTimeline($userId)
    {
        try {
            // ★ where() の後は get() を使う（latest() で新しい順）
            $posts = Post::where('user_id', $userId)->latest()->get();

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
}

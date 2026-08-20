<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;

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
            // 投稿を作成日時が新しい順に全件取得
            $posts = Post::latest()->get();

            return response()->json($posts, 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => '取得に失敗しました',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }
}

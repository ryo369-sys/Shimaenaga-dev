<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use App\Models\Follow;

class PostController extends Controller
{
    public function getTimeline($user_id)
    {
        try {
            // ① 自分がフォローしているユーザーの ID 一覧を取得 (followed_id)
            $followingUserIds = Follow::where('follower_id', $user_id)
                ->pluck('followed_id');
        
            $posts = Post::whereIn('user_id', $followingUserIds)
            ->latest()
            ->get();

            return response()->json([
                'success' => true,
                'message' => '投稿の取得に成功しました',
                'posts'   => $posts,
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
        $posts = Post::latest()->get();
        return response()->json($posts, 200);
    } catch (\Throwable $e) {
        return response()->json([
            'error_detail' => $e->getMessage()
        ], 500);
    }
}

    public function store(Request $request)
{
    try {
        $request->validate([
            'content' => 'required|string|max:1000',
        ]);

        $user_id = Auth::id() ?? 1;
        $user = User::find($user_id);

        $user_name = ($user && $user->name) ? $user->name : 'テストユーザー';

        $post = Post::create([
            'user_id' => $user_id,
            'user_name' => $user_name,
            'content' => $request->content,
        ]);

        return response()->json([
            'message' => '投稿に成功しました',
            'post'    => $post
        ], 201);

    } catch (\Exception $e) {
        // ★ エラーの正体を React 側（レスポンス）に返すように変更
        return response()->json([
            'error_detail' => $e->getMessage()
        ], 500);
    }
}
}
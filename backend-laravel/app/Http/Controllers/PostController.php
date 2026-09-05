<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use App\Models\Follow;
use App\Models\Like;

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

    public function getAllTimeline(Request $request)
{
    try {
        // テスト用: クエリパラメータやヘッダーから user_id を取得（デフォルト 1）
        $currentUserId = auth()->id() ?? $request->input('user_id', 1);

        $posts = Post::with(['user'])
            ->withCount('likes') // 💡 likes_count を自動集計
            ->latest()
            ->get()
            ->map(function ($post) use ($currentUserId) {
                // 💡 自分がいいね済みかを boolean で判定して追加
                $post->is_liked = $post->likes()
                    ->where('user_id', $currentUserId)
                    ->exists();
                return $post;
            });

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
        $validated = $request->validate([
            'content' => 'required|string|max:1000',
            'image'   => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'label'    => 'nullable|string', 
            'accuracy' => 'nullable|numeric',
        ]);

        $user_id = Auth::id() ?? 1;
        $user = User::find($user_id);
        $imagePath = null;

        $user_name = ($user && $user->name) ? $user->name : 'テストユーザー';

            // 2. 画像がアップロードされていれば保存処理を行う
        if ($request->hasFile('image')) {
            // storage/app/public/posts ディレクトリに保存
            $path = $request->file('image')->store('posts', 'public');
            $imagePath = $path; // 例: 'posts/abc123xxxx.jpg'
        }

        $post = Post::create([
            'user_id' => $user_id,
            'user_name' => $user_name,
            'content' => $request->content,
            'image_path' => $imagePath,
            'label'      => $request->label,
            'accuracy'   => $request->accuracy,
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

    public function getMyPosts($user_id)
    {
        try {  
            $posts = Post::where('user_id', $user_id)
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

    /**
     * 特定のユーザーの「画像付き投稿（判定済み投稿）」のみを取得するAPI
     */ 
    public function getUserImagePosts($userId)
    {
        // 画像（image_path）が null でなく、指定された user_id の投稿を最新順で取得
        $posts = Post::where('user_id', $userId)
                     ->whereNotNull('image_path')
                     ->orderBy('created_at', 'desc')
                     ->get();

        return response()->json($posts);
    }

    /**
     * 自分の投稿を削除するAPI
     */ 
    public function destroyPosts(Request $request, $id)
    {
        $post = Post::find($id);
       if (!$post) {
            return response()->json(['message' => '投稿が見つかりません'], 404);
        }

        // 💡 1. ログイン中のID、取れなければリクエストBodyの user_id を取得
        $currentUserId = auth()->id() ?? $request->input('user_id');

        // 💡 2. (int) で型を揃えて比較（型の違いによる不一致を防ぐ）
        if ((int)$post->user_id !== (int)$currentUserId) {
            return response()->json([
                'message' => '削除権限がありません',
                'debug' => [
                    'post_user_id' => $post->user_id,
                    'current_user_id' => $currentUserId,
                ]
            ], 403);
        }

        $post->delete();

        return response()->json(['message' => '投稿を削除しました']);
    }

}
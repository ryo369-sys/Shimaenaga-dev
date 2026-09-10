<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Reply;
use App\Models\Notification;
use Illuminate\Http\Request;


class ReplyController extends Controller
{
    // ① 返信一覧を取得
    public function repliesIndex($postId)
    {
        $post = Post::findOrFail($postId);

        // 💡 'user:id,name' を 'user' に変更（ユーザー情報を丸ごと取得してエラーを回避）
        $replies = $post->replies()->with('user')->get();

        return response()->json($replies);
    }

    // ② 返信を投稿
    public function repliesStore(Request $request, $postId)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'content' => 'required|string|max:1000',
            'image'   => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('replies', 'public');
        }

        // 返信を作成
        $reply = Reply::create([
            'post_id'    => $postId,
            'user_id'    => $request->user_id,
            'content'    => $request->content,
            'image_path' => $imagePath,
        ]);

        // 投稿データを取得（投稿者の user_id を特定するため）
        $post = Post::findOrFail($postId);

        // 💡 自分の投稿への返信でない場合のみ通知を作成
        if ((int)$post->user_id !== (int)$request->user_id) {
            Notification::create([
                'user_id'  => $post->user_id,  // 通知を受け取る人（元の投稿者）
                'actor_id' => $request->user_id, // アクションを起こした人（返信した人）
                'type'     => 'reply',
                'post_id'  => $postId,
                'reply_id' => $reply->id,
                'is_read'  => false,
            ]);
        }

        return response()->json($reply->load('user'), 201);
    }
}
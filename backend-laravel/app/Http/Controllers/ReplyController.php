<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Reply;
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

        $reply = Reply::create([
            'post_id'    => $postId,
            'user_id'    => $request->user_id,
            'content'    => $request->content,
            'image_path' => $imagePath,
        ]);

        // 💡 ここも 'user:id,name' から 'user' に変更
        return response()->json($reply->load('user'), 201);
    }
}
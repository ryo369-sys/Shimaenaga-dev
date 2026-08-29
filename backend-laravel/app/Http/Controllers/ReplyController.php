<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Reply;
use Illuminate\Http\Request;

class ReplyController extends Controller
{
    // ① 特定の投稿に対する返信一覧を取得する
    public function repliesIndex($postId)
    {
        // 投稿が存在するか確認
        $post = Post::findOrFail($postId);

        // 返信一覧と、書いたユーザーの情報（id, name）もセットで取得
        $replies = $post->replies()->with('user:id,name')->get();

        return response()->json($replies);
    }

    // ② 返信を投稿（作成）する
    public function repliesStore(Request $request, $postId)
    {
        // バリデーション
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'content' => 'required|string|max:1000',
            'image'   => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $imagePath = null;

        // 画像が送信されている場合は保存処理を行う
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('replies', 'public');
        }

        // 返信データを作成
        $reply = Reply::create([
            'post_id'    => $postId,
            'user_id'    => $request->user_id,
            'content'    => $request->content,
            'image_path' => $imagePath,
        ]);

        // 作成した返信データとユーザー情報を一緒に返す
        return response()->json($reply->load('user:id,name'), 201);
    }
}
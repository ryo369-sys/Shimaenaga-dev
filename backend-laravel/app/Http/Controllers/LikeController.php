<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use App\Models\User;
use App\Models\Like;
use App\Models\Notification;

class LikeController extends Controller
{
    public function isLike(Request $request, $post_id)
    {
        $userId = auth()->id() ?? $request->input('user_id');

        if (!$userId) {
            return response()->json(['message' => 'ユーザーIDが必要です'], 400);
        }

        // 💡 1. 投稿データを取得（投稿者の ID や post_id を参照するため）
        $post = Post::findOrFail($post_id);

        // firstOrCreate で重複登録（二重いいね）を防止
        Like::firstOrCreate([
            'user_id' => $userId,
            'post_id' => $post_id,
        ]);

        // 💡 2. 自分の投稿へのいいねでない場合のみ通知を作成
        if ((int)$post->user_id !== (int)$userId) {
            Notification::create([
                'user_id'  => $post->user_id, // 投稿主（通知を受ける人）
                'actor_id' => $userId,        // いいねした人
                'type'     => 'like',
                'post_id'  => $post->id,
                'is_read'  => false,
            ]);
        }

        return response()->json(['message' => 'いいねしました']);
    }

    public function disLike(Request $request, $post_id)
    {
        $userId = auth()->id() ?? $request->input('user_id');

        if (!$userId) {
            return response()->json(['message' => 'ユーザーIDが必要です'], 400);
        }

        // 該当するいいねレコードを探して削除
        Like::where('user_id', $userId)
            ->where('post_id', $post_id)
            ->delete();

        return response()->json(['message' => 'いいねを解除しました']);
    }

}
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use App\Models\User;
use App\Models\Like;

class LikeController extends Controller
{
    public function isLike(Request $request, $post_id)
    {
        $userId = auth()->id() ?? $request->input('user_id');

        if (!$userId) {
            return response()->json(['message' => 'ユーザーIDが必要です'], 400);
        }

        // firstOrCreate で重複登録（二重いいね）を防止
        Like::firstOrCreate([
            'user_id' => $userId,
            'post_id' => $post_id,
        ]);

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
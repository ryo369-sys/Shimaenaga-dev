<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Follow;
use App\Models\Notification;

class FollowController extends Controller
{
    public function followersCount($userId)
{
    // 対象のユーザーと、そのフォロワー一覧を取得
    $user = User::findOrFail($userId);

    // フォロワー一覧（ユーザー名なども含まれる）
    $followers = $user->followers;

    return response()->json([
        'user_id'         => $user->userId,
        'user_name'       => $user->username,
        // SQLでリアルタイムに件数をカウント
        'following_count' => $user->followings()->count(), // フォローしている数
        'followers_count'  => $user->followers()->count(),  // フォロワー数
        // フォロワーのユーザー一覧（Reactで map 処理しやすい配列）
        //'followers'       => $user->followers, 
    ]);
}

    // 💡 1. フォロー状態の確認（自分がそのユーザーをフォローしているか）
    public function isFollowing(Request $request, $userId)
{
    $currentUserId = auth()->id() ?? $request->query('current_user_id', 1);

    $isFollowing = Follow::where('follower_id', $currentUserId)
                         ->where('followed_id', $userId)
                         ->exists();

    return response()->json(['is_following' => $isFollowing]);
}

    public function followers_add(Request $request, $userId)
{
    // リクエストからログインユーザーIDを取得（無ければ 400 エラー）
    $currentUserId = $request->input('current_user_id');

    if (!$currentUserId) {
        return response()->json(['message' => 'ログインユーザーIDが必要です'], 400);
    }

    if ((int)$currentUserId === (int)$userId) {
        return response()->json(['message' => '自分自身をフォローすることはできません'], 400);
    }

    Follow::firstOrCreate([
        'follower_id' => $currentUserId,
        'followed_id' => $userId,
    ]);
    
    Notification::create([
        'user_id'  => $userId,   // フォローされた人
        'actor_id' => $currentUserId,  // フォローした人
        'type'     => 'follow',
        'is_read'  => false,
    ]);
    
    return response()->json(['message' => 'フォローしました']);
}

    // 💡 3. フォロー解除
    public function followers_dawn(Request $request, $userId)
{
    $currentUserId = auth()->id() ?? $request->input('current_user_id', 1);

    Follow::where('follower_id', $currentUserId)
          ->where('followed_id', $userId)
          ->delete();
    

    return response()->json(['message' => 'フォロー解除しました']);
}

}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class FollowController extends Controller
{
    public function followersCount($userId)
{
    // 対象のユーザーと、そのフォロワー一覧を取得
    $user = User::findOrFail($userId);

    // フォロワー一覧（ユーザー名なども含まれる）
    $followers = $user->followers;

    return response()->json([
        'user_id'         => $user->id,
        'user_name'       => $user->name,
        // SQLでリアルタイムに件数をカウント
        'following_count' => $user->followings()->count(), // フォローしている数
        'follower_count'  => $user->followers()->count(),  // フォロワー数
        // フォロワーのユーザー一覧（Reactで map 処理しやすい配列）
        'followers'       => $user->followers, 
    ]);
}
}

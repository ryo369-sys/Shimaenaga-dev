<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

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
        'user_name'       => $user->username,
        // SQLでリアルタイムに件数をカウント
        'following_id' => $user->followings()->count(), // フォローしている数
        'follower_id'  => $user->followers()->count(),  // フォロワー数
        // フォロワーのユーザー一覧（Reactで map 処理しやすい配列）
        //'followers'       => $user->followers, 
    ]);
}
}

<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    /**
     * 1. ログインユーザーの通知一覧を取得
     */
    public function getUserAction(Request $request)
    {
        $userId = $request->query('user_id');

        if (!$userId) {
            return response()->json(['message' => 'User ID is required'], 400);
        }

        $notifications = Notification::with([
            'actor:id,name,username', // アクションを起こしたユーザー情報
            'post:id,content',        // 関連投稿（あれば）
            'reply:id,content'        // 関連返信（あれば）
        ])
        ->where('user_id', $userId)
        ->latest()
        ->take(30) // 最新30件を取得
        ->get();

        return response()->json($notifications);
    }

    /**
     * 2. 未読通知の件数を取得（バッジ表示用）
     */
    public function unreadCount(Request $request)
    {
        $userId = $request->query('user_id');

        $count = Notification::where('user_id', $userId)
            ->where('is_read', false)
            ->count();

        return response()->json(['unread_count' => $count]);
    }

    /**
     * 3. 通知を既読にする
     */
    public function markAsRead(Request $request, $id)
    {
        $notification = Notification::find($id);

        if (!$notification) {
            return response()->json(['message' => 'Notification not found'], 404);
        }

        $notification->update(['is_read' => true]);

        return response()->json(['message' => 'Notification marked as read']);
    }

    /**
     * 4. すべての通知を一括で既読にする
     */
    public function markAllAsRead(Request $request)
    {
        $userId = $request->input('user_id');

        Notification::where('user_id', $userId)
            ->where('is_read', false)
            ->update(['is_read' => true]);

        return response()->json(['message' => 'All notifications marked as read']);
    }
}
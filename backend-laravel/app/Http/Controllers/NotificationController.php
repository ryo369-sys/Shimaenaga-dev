<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    // 1. 通知一覧取得
    public function getUserAction(Request $request)
{
    $userId = $request->query('user_id'); // ?user_id= から取得

    $notifications = Notification::with(['actor', 'post', 'reply'])
        ->where('user_id', $userId)
        ->latest()
        ->take(30)
        ->get();

    return response()->json($notifications);
}

    // 2. 未読件数取得
    public function unreadCount(Request $request)
    {
        $userId = $request->query('user_id');

        if (!$userId) {
            return response()->json(['unread_count' => 0]);
        }

        $count = Notification::where('user_id', $userId)
            ->where('is_read', false)
            ->count();

        return response()->json(['unread_count' => $count]);
    }

    // 3. 単一通知を既読にする
    public function markAsRead(Request $request, $id)
    {
        $notification = Notification::find($id);

        if (!$notification) {
            return response()->json(['message' => 'Notification not found'], 404);
        }

        $notification->update(['is_read' => true]);

        return response()->json(['message' => 'Notification marked as read']);
    }

    // 4. すべて既読にする
    public function markAllAsRead(Request $request)
    {
        $userId = $request->input('user_id');

        Notification::where('user_id', $userId)
            ->where('is_read', false)
            ->update(['is_read' => true]);

        return response()->json(['message' => 'All notifications marked as read']);
    }
}
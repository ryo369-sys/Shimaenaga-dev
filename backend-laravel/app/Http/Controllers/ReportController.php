<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Report;

class ReportController extends Controller
{
    public function reportPost(Request $request)
    {
        // バリデーション
        $request->validate([
            'post_id'          => 'required|integer|exists:posts,id',
            'reported_user_id' => 'required|integer|exists:users,id',
            'reason'           => 'required|string|max:50',
            'comment'          => 'nullable|string',
        ]);

        // 通報の保存
        $report = Report::create([
            'reporter_id'      => auth()->id() ?? $request->input('user_id', 1), // ログインユーザーID
            'reported_user_id' => $request->input('reported_user_id'),
            'post_id'          => $request->input('post_id'),
            'reason'           => $request->input('reason'),
            'comment'          => $request->input('comment'),
        ]);

        return response()->json([
            'message' => '通報を受け付けました。',
            'report'  => $report
        ], 201);
    }
}
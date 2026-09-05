<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class Like extends Model
{
    use Notifiable;

    // テーブル名を明示（念のため）
    protected $table = 'likes';

    // 一括保存を許可するカラム
    protected $fillable = [
        'user_id',
        'post_id',
    ];

    // ユーザーとの紐付け（誰のいいねか）
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // 投稿との紐付け（どの投稿へのいいねか）
    public function post()
    {
        return $this->belongsTo(Post::class);
    }
}
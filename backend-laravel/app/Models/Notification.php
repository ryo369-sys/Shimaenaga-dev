<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'actor_id',
        'type',
        'post_id',
        'reply_id',
        'is_read',
    ];

    // アクションを起こしたユーザー
    public function actor()
    {
        return $this->belongsTo(User::class, 'actor_id');
    }

    // 関連する投稿
    public function post()
    {
        return $this->belongsTo(Post::class, 'post_id');
    }

    // 関連する返信
    public function reply()
    {
        return $this->belongsTo(Reply::class, 'reply_id');
    }
}
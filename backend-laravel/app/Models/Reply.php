<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reply extends Model
{
    use HasFactory;

    protected $fillable = [
        'post_id',
        'user_id',
        'content',
        'image_path',
    ];

    // この返信を書いたユーザーを取得
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // この返信がぶら下がっている元投稿を取得
    public function post()
    {
        return $this->belongsTo(Post::class);
    }
}
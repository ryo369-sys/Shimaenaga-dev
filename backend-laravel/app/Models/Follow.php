<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Follow extends Model
{
    use Notifiable;

    public $timestamps = false;
    // updated_at のみ無効化したい場合
    const UPDATED_AT = null;

    // 一括保存・更新を許可するカラム（安全対策）
    protected $fillable = [
        'follower_id',
        'followed_id',
        'created_at',
        'updated_at',
    ];

    // ★ users テーブルとの紐付け（1つの投稿は1人のユーザーのもの）
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

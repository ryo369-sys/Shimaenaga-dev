<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use Notifiable;

    public function followers()
    {
        // follows テーブルの followed_id をキーにして users テーブルを取得
        return $this->belongsToMany(User::class, 'follows', 'followed_id', 'follower_id');
    }

    public $timestamps = false;
    // updated_at のみ無効化したい場合
    const UPDATED_AT = null;

    // 一括保存・更新を許可するカラム（安全対策）
    protected $fillable = [
        'username',
        'password',
        'email',
        'gender',
        'age',
    ];

    // JSON変換時に非表示にするカラム（パスワードなどを隠す）
    protected $hidden = [
        'password',
        'remember_token',
    ];
}

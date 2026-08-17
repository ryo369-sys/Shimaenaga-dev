<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use Notifiable;

    public $timestamps = false;
    // updated_at のみ無効化したい場合
    const UPDATED_AT = null;
    // テーブル名が 'users' 以外（例: 'user_tbl'）の場合は指定
    // protected $table = 'users';

    // 一括保存・更新を許可するカラム（安全対策）
    protected $fillable = [
        'user_id',
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

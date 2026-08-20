<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\Post as Authenticatable;
use Illuminate\Notifications\Notifiable;


class Post extends Model
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
        'user_name',
        'content',
        'image_path',
        'created_at',
        'updated_at',
    ];
}
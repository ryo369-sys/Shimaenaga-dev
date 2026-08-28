<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class Profile extends Model
{
    use Notifiable;
    
    public $timestamps = false;
    // updated_at のみ無効化したい場合
    const UPDATED_AT = null;

    // 一括保存・更新を許可するカラム（安全対策）
    protected $fillable = [
        'id',
        'follower_id',
        'followed_id',
        'create_at',
        'updated_at',
    ];
}

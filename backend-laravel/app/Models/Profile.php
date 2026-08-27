<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    public function update(Request $request, $id)
{
    $postId = $id; // URLの {id}
    $title = $request->input('title'); // POST送信されたデータ
}
}

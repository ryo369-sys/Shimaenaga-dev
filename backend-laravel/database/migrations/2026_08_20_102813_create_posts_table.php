<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->id(); // 自動連番ID
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // usersテーブルのidと紐付け
            $table->string('user_name');
            $table->text('content');
            $table->string('image_path')->nullable(); // 画像パス（空でも許可）
            $table->timestamps(); // created_at, updated_at
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('posts');
    }
};
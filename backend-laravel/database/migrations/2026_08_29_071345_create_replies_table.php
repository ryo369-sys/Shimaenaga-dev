<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('replies', function (Blueprint $table) {
            $table->id();

            $table->string('column_name')->nullable()->after('content');
            
            // どの投稿への返信か（postsテーブルのidを参照）
            $table->foreignId('post_id')->constrained()->onDelete('cascade');
            
            // 誰が返信したか（usersテーブルのidを参照）
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            
            // 返信内容
            $table->text('content');
            
            // 画像パス（画像なしの返信も許可するため nullable）
            $table->string('image_path')->nullable();
            
            // created_at, updated_at
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('replies');
    }
};
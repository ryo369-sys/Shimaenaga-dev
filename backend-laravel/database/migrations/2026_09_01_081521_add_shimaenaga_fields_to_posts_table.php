<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('posts', function (Blueprint $table) {
            // シマエナガ判別の判定結果テキスト（例: "シマエナガ", "その他"）
            $table->string('label')->nullable()->after('image_path');
            // 認識率・確信度（例: 95.8 や 0.958 などを保存できるように float 型で定義）
            $table->float('accuracy')->nullable()->after('label');
        });
    }

    public function down(): void
    {
        Schema::table('posts', function (Blueprint $table) {
            $table->dropColumn(['label', 'accuracy']);
        });
    }
};
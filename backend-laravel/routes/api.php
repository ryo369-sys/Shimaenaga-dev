<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\TodoController;
use App\Http\Controllers\PostController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::post('/login',[UserController::class, 'login']) ;

Route::post('/register', [UserController::class, 'register']);

Route::get('/getTimeline', [PostController::class, 'getTimeline']);

Route::get('/getAllTimeline', [PostController::class, 'getAllTimeline']);

// ★ 最低限知っておく点: auth:sanctum ミドルウェアで保護する
// これにより、ログインしていないリクエストは 401 Unauthorized エラーとなり、
// Auth::id() が null になる（＝誰の投稿かわからなくなる）のを阻止できます
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/posts', [PostController::class, 'store']);
    // コメント機能を増やす場合も同じコンポーネントからここに飛ばせます
    // Route::post('/posts/{id}/comments', [CommentController::class, 'store']);
});
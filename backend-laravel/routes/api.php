<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\TodoController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\FollowController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReplyController;
use App\Http\Controllers\LikeController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::post('/login',[UserController::class, 'login']) ;

Route::post('/register', [UserController::class, 'register']);

Route::get('/getTimeline/{user_id}', [PostController::class, 'getTimeline']);

Route::get('/getAllTimeline', [PostController::class, 'getAllTimeline']);

Route::post('/posts', [PostController::class, 'store']);

Route::get('/posts/user/{user_id}', [PostController::class, 'getMyPosts']);

Route::delete('/posts/{post_id}', [PostController::class, 'destroyPosts']);

Route::get('/follower/{id}', [FollowController::class, 'followersCount']);

// 投稿に対する返信一覧を取得するAPI
Route::get('/posts/{postId}/replies', [ReplyController::class, 'repliesIndex']);

// 投稿に対して返信を送るAPI
Route::post('/posts/{postId}/replies', [ReplyController::class, 'repliesStore']);

Route::post('/posts/{post_id}/like', [LikeController::class, 'isLike']);

Route::delete('/posts/{post_id}/like', [LikeController::class, 'disLike']);





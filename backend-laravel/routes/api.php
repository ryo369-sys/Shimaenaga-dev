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

Route::post('/posts', [PostController::class, 'store']);

<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\KosController;
use App\Http\Controllers\Api\KamarController;

// Public routes
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
    
    // Kos Management
    Route::apiResource('kos', KosController::class);
    Route::apiResource('kamar', KamarController::class);
    Route::apiResource('customer', CustomerController::class);
    Route::apiResource('jadwal', JadwalKamarController::class);
});
<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\MasterKosController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\KamarController;
use App\Http\Controllers\JadwalController;
use App\Http\Controllers\TagihanController;

// Authentication Routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Public Routes
Route::get('/kos', [MasterKosController::class, 'index']);
Route::get('/kos/{id}', [MasterKosController::class, 'show']);

// Protected Routes
Route::middleware(['auth:sanctum'])->group(function () {
    // User routes
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/logout', [AuthController::class, 'logout']);
    
    // Kos Management
    Route::prefix('admin')->group(function () {
        // Kos routes
        Route::post('/kos', [MasterKosController::class, 'store']);
        Route::put('/kos/{id}', [MasterKosController::class, 'update']);
        Route::delete('/kos/{id}', [MasterKosController::class, 'destroy']);
        
        // Kamar tersedia
        Route::get('/kos/{id}/kamar-tersedia', [KamarController::class, 'kamarTersedia']);
        
        // Customer Management
        Route::apiResource('customers', CustomerController::class);
        
        // Kamar Management
        Route::apiResource('kamar', KamarController::class);
        Route::get('/kamar/kos/{id_kos}', [KamarController::class, 'byKos']);
        Route::put('/kamar/{id}/status', [KamarController::class, 'updateStatus']);
        
        // Jadwal Management
        Route::apiResource('jadwal', JadwalController::class);
        Route::post('/jadwal/{id}/checkout', [JadwalController::class, 'checkout']);
        Route::post('/jadwal/{id}/cancel', [JadwalController::class, 'cancel']);
        
        // Tagihan Management
        Route::apiResource('tagihan', TagihanController::class);
        Route::post('/tagihan/{id}/bayar', [TagihanController::class, 'bayar']);
        Route::get('/tagihan/jadwal/{id_jadwal}', [TagihanController::class, 'byJadwal']);
        
        // Reports
        Route::get('/reports/pendapatan', [TagihanController::class, 'laporanPendapatan']);
        Route::get('/reports/occupancy', [KamarController::class, 'occupancyRate']);
    });
});
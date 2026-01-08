// routes/api.php
<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\MasterKosController;
use App\Http\Controllers\API\CustomerController;
use App\Http\Controllers\API\KamarController;
use App\Http\Controllers\API\JadwalController;
use App\Http\Controllers\API\TagihanController;

// Authentication Routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

// Public Routes (kos listing for public view)
Route::get('/kos', [MasterKosController::class, 'index']);
Route::get('/kos/{id}', [MasterKosController::class, 'show']);
Route::get('/kos/{id}/kamar-tersedia', [KamarController::class, 'kamarTersedia']);

// Protected Routes
Route::middleware(['auth:sanctum'])->group(function () {
    // User routes
    Route::get('/user', [AuthController::class, 'user']);
    
    // Kos Management
    Route::apiResource('/admin/kos', MasterKosController::class)->except(['index', 'show']);
    
    // Customer Management
    Route::apiResource('/admin/customers', CustomerController::class);
    
    // Kamar Management
    Route::apiResource('/admin/kamar', KamarController::class);
    Route::get('/admin/kamar/kos/{id_kos}', [KamarController::class, 'byKos']);
    Route::put('/admin/kamar/{id}/status', [KamarController::class, 'updateStatus']);
    
    // Jadwal Management
    Route::apiResource('/admin/jadwal', JadwalController::class);
    Route::post('/admin/jadwal/{id}/checkout', [JadwalController::class, 'checkout']);
    Route::post('/admin/jadwal/{id}/cancel', [JadwalController::class, 'cancel']);
    
    // Tagihan Management
    Route::apiResource('/admin/tagihan', TagihanController::class);
    Route::post('/admin/tagihan/{id}/bayar', [TagihanController::class, 'bayar']);
    Route::get('/admin/tagihan/jadwal/{id_jadwal}', [TagihanController::class, 'byJadwal']);
    
    // Reports
    Route::get('/admin/reports/pendapatan', [TagihanController::class, 'laporanPendapatan']);
    Route::get('/admin/reports/occupancy', [KamarController::class, 'occupancyRate']);
});
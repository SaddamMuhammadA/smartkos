use App\Http\Controllers\Api\CustomerController;

Route::apiResource('customer', CustomerController::class);

use App\Http\Controllers\AdminInviteController;

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/admin/invite', [AdminInviteController::class, 'invite']);
});

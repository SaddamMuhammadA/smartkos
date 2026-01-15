<?php
// database/migrations/2024_01_01_000002_modify_users_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    
    public function up(): void
    {
        if(Schema::hasTable('users') && !Schema::hasColumn('users','role')){
            Schema::table('users', function (Blueprint $table) {
            $table->enum('role', ['MasterAdmin', 'SuperAdmin', 'Admin'])
                  ->default('Admin')
                  ->after('password');
            $table->boolean('is_active')->default(true)->after('role');
        });
        }
    }

    public function down(): void
    {
        if(Schema::hasTable('users') && Schema::hasColumn('users','role')){
            Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['role', 'is_active']);
        });
            
        }

    }
};
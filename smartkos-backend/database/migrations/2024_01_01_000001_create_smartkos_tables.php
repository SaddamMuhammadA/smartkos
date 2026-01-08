// database/migrations/2024_01_01_000001_create_smartkos_tables.php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        // Table: master_kos
        Schema::create('master_kos', function (Blueprint $table) {
            $table->id('id_kos');
            $table->string('nama_kos', 100);
            $table->text('alamat_kos');
            $table->enum('jenis_kos', ['Putra', 'Putri', 'Campur'])->default('Campur');
            $table->timestamps();
        });

        // Table: users (untuk admin)
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name', 100);
            $table->string('email', 150)->unique();
            $table->string('password');
            $table->enum('role', ['MasterAdmin', 'SuperAdmin', 'Admin'])->default('Admin');
            $table->timestamp('email_verified_at')->nullable();
            $table->boolean('is_active')->default(true);
            $table->rememberToken();
            $table->timestamps();
        });

        // Table: customer
        Schema::create('customer', function (Blueprint $table) {
            $table->id('id_customer');
            $table->string('nama_customer', 100);
            $table->string('no_telp', 20)->nullable();
            $table->string('foto_ktp', 255)->nullable();
            $table->timestamps();
        });

        // Table: pengguna (staff/manajer)
        Schema::create('pengguna', function (Blueprint $table) {
            $table->id('id_pengguna');
            $table->string('nama_pengguna', 100);
            $table->string('username', 50)->unique();
            $table->string('password');
            $table->enum('role', ['Manager', 'Staff', 'Penjaga'])->default('Staff');
            $table->enum('hak_akses', ['super_admin', 'admin', 'penjaga'])->default('admin');
            $table->foreignId('id_kos')->nullable()->constrained('master_kos', 'id_kos')->onDelete('set null');
            $table->enum('status', ['Aktif', 'Nonaktif'])->default('Aktif');
            $table->timestamps();
        });

        // Table: jenis_kamar
        Schema::create('jenis_kamar', function (Blueprint $table) {
            $table->id('id_jenis_kamar');
            $table->foreignId('id_kos')->nullable()->constrained('master_kos', 'id_kos');
            $table->string('nama_jenis_kamar', 50);
            $table->timestamps();
        });

        // Table: kamar
        Schema::create('kamar', function (Blueprint $table) {
            $table->id('id_kamar');
            $table->foreignId('id_kos')->nullable()->constrained('master_kos', 'id_kos')->onDelete('set null');
            $table->foreignId('id_jenis_kamar')->nullable()->constrained('jenis_kamar', 'id_jenis_kamar')->onDelete('set null');
            $table->string('kode_kamar', 10);
            $table->enum('status_kamar', ['Tersedia', 'Terisi', 'Perawatan'])->default('Tersedia');
            $table->text('catatan')->nullable();
            $table->timestamps();
        });

        // Table: pricing
        Schema::create('pricing', function (Blueprint $table) {
            $table->id('id_pricing');
            $table->foreignId('id_kos')->constrained('master_kos', 'id_kos')->onDelete('cascade');
            $table->foreignId('id_jenis_kamar')->constrained('jenis_kamar', 'id_jenis_kamar')->onDelete('cascade');
            $table->enum('lama_tinggal', ['Harian', 'Mingguan', 'Bulanan', 'Tahunan']);
            $table->decimal('harga', 12, 2);
            $table->text('deskripsi')->nullable();
            $table->timestamps();
        });

        // Table: parkiran
        Schema::create('parkiran', function (Blueprint $table) {
            $table->id('id_kendaraan');
            $table->foreignId('id_kos')->constrained('master_kos', 'id_kos');
            $table->enum('jenis_kendaraan', ['Mobil', 'Motor']);
            $table->decimal('biaya_tambahan', 12, 2);
            $table->integer('kapasitas')->nullable();
            $table->timestamps();
        });

        // Table: jadwal_kamar
        Schema::create('jadwal_kamar', function (Blueprint $table) {
            $table->id('id_jadwal');
            $table->foreignId('id_kamar')->constrained('kamar', 'id_kamar');
            $table->foreignId('id_customer')->constrained('customer', 'id_customer')->onDelete('cascade');
            $table->foreignId('id_pricing')->nullable()->constrained('pricing', 'id_pricing')->onDelete('set null');
            $table->date('tanggal_mulai');
            $table->date('tanggal_selesai');
            $table->decimal('total_harga', 12, 2)->default(0);
            $table->decimal('deposit', 12, 2)->default(0);
            $table->enum('status_sewa', ['Aktif', 'Selesai', 'Dibatalkan'])->default('Aktif');
            $table->timestamps();
        });

        // Table: jadwal_kamar_kendaraan
        Schema::create('jadwal_kamar_kendaraan', function (Blueprint $table) {
            $table->id('id_relasi');
            $table->foreignId('id_jadwal')->constrained('jadwal_kamar', 'id_jadwal')->onDelete('cascade');
            $table->foreignId('id_kendaraan')->constrained('parkiran', 'id_kendaraan');
            $table->integer('jumlah')->default(1);
            $table->decimal('biaya_tambahan', 12, 2)->default(0);
            $table->timestamps();
        });

        // Table: tagihan
        Schema::create('tagihan', function (Blueprint $table) {
            $table->id('id_tagihan');
            $table->foreignId('id_jadwal')->constrained('jadwal_kamar', 'id_jadwal')->onDelete('cascade');
            $table->decimal('total_harga', 12, 2);
            $table->decimal('total_parkir', 12, 2)->default(0);
            $table->decimal('deposit_diterapkan', 12, 2)->default(0);
            $table->decimal('jumlah_bayar', 12, 2)->default(0);
            $table->string('bukti_bayar', 255)->nullable();
            $table->enum('status_pembayaran', ['Belum Lunas', 'Lunas', 'Lebih Bayar'])->default('Belum Lunas');
            $table->timestamps();
            
            // Virtual columns (generated)
            $table->decimal('total_tagihan', 12, 2)->virtualAs('(total_harga + total_parkir - deposit_diterapkan)');
            $table->decimal('selisih', 12, 2)->virtualAs('(jumlah_bayar - (total_harga + total_parkir - deposit_diterapkan))');
        });

        // Table: transaksi_log
        Schema::create('transaksi_log', function (Blueprint $table) {
            $table->id('id_log');
            $table->foreignId('id_tagihan')->nullable()->constrained('tagihan', 'id_tagihan')->onDelete('set null');
            $table->string('aksi', 100);
            $table->text('keterangan')->nullable();
            $table->foreignId('dibuat_oleh')->nullable()->constrained('users', 'id');
            $table->timestamp('dibuat_pada')->useCurrent();
        });

        // Table: promo_kamar
        Schema::create('promo_kamar', function (Blueprint $table) {
            $table->id('id_promo');
            $table->foreignId('id_kos')->constrained('master_kos', 'id_kos')->onDelete('cascade');
            $table->foreignId('id_jenis_kamar')->constrained('jenis_kamar', 'id_jenis_kamar')->onDelete('cascade');
            $table->foreignId('id_pricing')->constrained('pricing', 'id_pricing')->onDelete('cascade');
            $table->string('nama_promo', 100);
            $table->enum('tipe_promo', ['Diskon_Persen', 'Diskon_Nominal', 'Harga_Spesial']);
            $table->decimal('nilai_promo', 12, 2)->comment('persen / nominal / harga final');
            $table->text('keterangan')->nullable();
            $table->date('tanggal_mulai');
            $table->date('tanggal_selesai');
            $table->enum('status', ['Aktif', 'Nonaktif'])->default('Aktif');
            $table->timestamps();
        });

        // Table: admin_invites
        Schema::create('admin_invites', function (Blueprint $table) {
            $table->id();
            $table->string('email');
            $table->string('name', 100);
            $table->enum('role', ['SuperAdmin', 'Admin']);
            $table->string('token', 64)->unique();
            $table->dateTime('expires_at');
            $table->dateTime('accepted_at')->nullable();
            $table->foreignId('invited_by')->constrained('users', 'id')->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('admin_invites');
        Schema::dropIfExists('promo_kamar');
        Schema::dropIfExists('transaksi_log');
        Schema::dropIfExists('tagihan');
        Schema::dropIfExists('jadwal_kamar_kendaraan');
        Schema::dropIfExists('jadwal_kamar');
        Schema::dropIfExists('parkiran');
        Schema::dropIfExists('pricing');
        Schema::dropIfExists('kamar');
        Schema::dropIfExists('jenis_kamar');
        Schema::dropIfExists('pengguna');
        Schema::dropIfExists('customer');
        Schema::dropIfExists('users');
        Schema::dropIfExists('master_kos');
    }
};
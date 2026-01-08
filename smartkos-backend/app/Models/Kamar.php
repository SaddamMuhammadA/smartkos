<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kamar extends Model
{
    use HasFactory;

    protected $table = 'kamar';
    protected $primaryKey = 'id_kamar';
    public $timestamps = true;

    protected $fillable = [
        'id_kos',
        'id_jenis_kamar',
        'kode_kamar',
        'status_kamar',
        'catatan'
    ];

    protected $casts = [
        'status_kamar' => 'string'
    ];

    // Relationships
    public function kos()
    {
        return $this->belongsTo(MasterKos::class, 'id_kos');
    }

    public function jenisKamar()
    {
        return $this->belongsTo(JenisKamar::class, 'id_jenis_kamar');
    }

    public function jadwals()
    {
        return $this->hasMany(JadwalKamar::class, 'id_kamar');
    }

    public function currentJadwal()
    {
        return $this->hasOne(JadwalKamar::class, 'id_kamar')
            ->where('status_sewa', 'Aktif')
            ->latest();
    }
}
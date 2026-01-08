<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MasterKos extends Model
{
    use HasFactory;

    protected $table = 'master_kos';
    protected $primaryKey = 'id_kos';
    public $timestamps = true;

    protected $fillable = [
        'nama_kos',
        'alamat_kos',
        'jenis_kos'
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime'
    ];

    // Relationships
    public function jenisKamars()
    {
        return $this->hasMany(JenisKamar::class, 'id_kos');
    }

    public function kamars()
    {
        return $this->hasMany(Kamar::class, 'id_kos');
    }

    public function pricings()
    {
        return $this->hasMany(Pricing::class, 'id_kos');
    }

    public function parkirans()
    {
        return $this->hasMany(Parkiran::class, 'id_kos');
    }

    public function promos()
    {
        return $this->hasMany(PromoKamar::class, 'id_kos');
    }

    public function pengguna()
    {
        return $this->hasMany(Pengguna::class, 'id_kos');
    }
}
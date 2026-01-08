<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    use HasFactory;

    protected $table = 'customer';
    protected $primaryKey = 'id_customer';
    public $timestamps = true;

    protected $fillable = [
        'nama_customer',
        'no_telp',
        'foto_ktp'
    ];

    // Relationships
    public function jadwals()
    {
        return $this->hasMany(JadwalKamar::class, 'id_customer');
    }
}
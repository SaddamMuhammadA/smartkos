<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MasterKos extends Model
{
    protected $table = 'master_kos';
    protected $primaryKey = 'id_kos';

    protected $fillable = [
        'nama_kos',
        'alamat_kos',
        'jenis_kos',
    ];
}
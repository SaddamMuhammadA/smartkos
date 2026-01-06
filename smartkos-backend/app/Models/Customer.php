<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    protected $table = 'customer';
    protected $primaryKey = 'id_customer';

    protected $fillable = [
        'nama_customer',
        'no_telp',
        'foto_ktp',
    ];

    public $timestamps = true;
}

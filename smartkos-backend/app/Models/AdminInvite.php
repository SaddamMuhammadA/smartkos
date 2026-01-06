<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

class AdminInvite extends Model
{
    protected $fillable = [
        'email',
        'name',
        'role',
        'token',
        'expires_at',
        'accepted_at',
        'invited_by',
    ];

    protected $dates = [
        'expires_at',
        'accepted_at',
    ];

    public function isExpired(): bool
    {
        return Carbon::now()->greaterThan($this->expires_at);
    }

    public function isAccepted(): bool
    {
        return !is_null($this->accepted_at);
    }
}

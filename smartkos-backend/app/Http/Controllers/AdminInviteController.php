<?php

namespace App\Http\Controllers;

use App\Mail\AdminInviteMail;
use App\Models\AdminInvite;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;

class AdminInviteController extends Controller
{
    /**
     * Invite / Re-invite Admin
     */
    public function invite(Request $request)
    {
        $request->validate([
            'name'  => 'required|string|max:100',
            'email' => 'required|email',
            'role'  => 'required|in:Admin,SuperAdmin',
        ]);

        /** 
         * AUTHORIZATION (UI sudah filter,
         * backend tetap WAJIB validasi)
         */
        if (!in_array(Auth::user()->role, ['MasterAdmin', 'SuperAdmin'])) {
            abort(403, 'Unauthorized');
        }

        /**
         * Jika user sudah aktif → tolak
         */
        if (User::where('email', $request->email)->exists()) {
            return response()->json([
                'message' => 'Email sudah terdaftar sebagai user aktif'
            ], 422);
        }

        /**
         * Delete invite lama (re-invite)
         */
        AdminInvite::where('email', $request->email)
            ->whereNull('accepted_at')
            ->delete();

        /**
         * Create invite baru
         */
        $invite = AdminInvite::create([
            'name'       => $request->name,
            'email'      => $request->email,
            'role'       => $request->role,
            'token'      => Str::random(40),
            'expires_at' => Carbon::now()->addDays(3),
            'invited_by' => Auth::id(),
        ]);

        /**
         * Kirim email
         */
        Mail::to($invite->email)->send(
            new AdminInviteMail($invite)
        );

        return response()->json([
            'message' => 'Undangan berhasil dikirim'
        ]);
    }
}

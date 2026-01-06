<?php

namespace App\Mail;

use App\Models\AdminInvite;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class AdminInviteMail extends Mailable
{
    use Queueable, SerializesModels;

    public AdminInvite $invite;

    public function __construct(AdminInvite $invite)
    {
        $this->invite = $invite;
    }

    public function build()
    {
        return $this
            ->subject('Undangan Admin SmartKos')
            ->view('emails.admin-invite')
            ->with([
                'name'       => $this->invite->name,
                'role'       => $this->invite->role,
                'inviteUrl'  => config('app.frontend_url')
                    . '/auth/accept-invite?token='
                    . $this->invite->token,
                'expiredAt'  => $this->invite->expires_at->format('d M Y H:i'),
            ]);
    }
}

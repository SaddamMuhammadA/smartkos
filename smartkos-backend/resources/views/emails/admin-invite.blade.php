<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Undangan Admin SmartKos</title>
</head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <table width="100%" max-width="520" cellpadding="0" cellspacing="0"
          style="background:#ffffff;border-radius:12px;padding:24px;max-width:520px;">

          <!-- LOGO / HEADER -->
          <tr>
            <td style="text-align:center;padding-bottom:16px;">
              <h2 style="margin:0;color:#111827;">SmartKos</h2>
            </td>
          </tr>

          <!-- CONTENT -->
          <tr>
            <td style="color:#374151;font-size:14px;line-height:1.6;">
              <p>Halo <strong>{{ $name }}</strong>,</p>

              <p>
                Anda telah diundang untuk bergabung sebagai
                <strong>{{ $role }}</strong>
                di aplikasi <strong>SmartKos</strong>.
              </p>

              <p>
                Silakan klik tombol di bawah ini untuk mengaktifkan akun
                dan mengatur password Anda.
              </p>

              <!-- BUTTON -->
              <p style="text-align:center;margin:32px 0;">
                <a href="{{ $inviteUrl }}"
                  style="
                    background:#2563eb;
                    color:#ffffff;
                    text-decoration:none;
                    padding:12px 24px;
                    border-radius:8px;
                    font-weight:bold;
                    display:inline-block;
                  ">
                  Aktifkan Akun
                </a>
              </p>

              <p style="font-size:12px;color:#6b7280;">
                Link ini berlaku hingga:
                <strong>{{ $expiredAt }}</strong>
              </p>

              <p style="font-size:12px;color:#6b7280;">
                Jika Anda tidak merasa menerima undangan ini,
                silakan abaikan email ini.
              </p>

              <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0;">

              <p style="font-size:12px;color:#9ca3af;text-align:center;">
                © {{ date('Y') }} SmartKos. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>

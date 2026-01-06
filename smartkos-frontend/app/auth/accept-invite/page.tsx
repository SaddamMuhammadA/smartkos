'use client';

import { useState } from 'react';
import { Eye, EyeOff, Lock } from 'lucide-react';

export default function AcceptInvitePage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  /* SIMULASI DATA DARI INVITE TOKEN */
  const email = 'admin@smartkos.id';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // NANTI:
    // POST /auth/accept-invite
    // { token, password, password_confirmation }

    alert('Password berhasil diset (simulasi)');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] p-4">
      <div className="bg-white w-full max-w-md rounded-xl shadow-sm border p-6">
        {/* HEADER */}
        <div className="text-center mb-6">
          <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 mb-3">
            <Lock />
          </div>
          <h1 className="text-xl font-bold">Aktivasi Akun</h1>
          <p className="text-sm text-gray-500">
            Silakan atur password untuk akun SmartKos Anda
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* EMAIL */}
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              value={email}
              disabled
              className="w-full mt-1 border rounded-lg px-3 py-2 text-sm bg-gray-100"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-sm font-medium">Password Baru</label>
            <div className="relative mt-1">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                minLength={8}
                placeholder="Minimal 8 karakter"
                className="w-full border rounded-lg px-3 py-2 text-sm pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* CONFIRM PASSWORD */}
          <div>
            <label className="text-sm font-medium">
              Konfirmasi Password
            </label>
            <div className="relative mt-1">
              <input
                type={showConfirm ? 'text' : 'password'}
                required
                minLength={8}
                className="w-full border rounded-lg px-3 py-2 text-sm pr-10"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            className="
              w-full mt-2 py-2 rounded-lg
              bg-blue-600 text-white
              font-medium
              hover:bg-blue-700 transition
            "
          >
            Aktifkan Akun
          </button>
        </form>

        {/* FOOTER */}
        <p className="text-xs text-center text-gray-500 mt-6">
          Link invite bersifat pribadi. Jangan bagikan ke siapa pun.
        </p>
      </div>
    </div>
  );
}

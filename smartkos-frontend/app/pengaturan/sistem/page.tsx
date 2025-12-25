'use client';

import { ShieldAlert, Server, Info, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

/* =========================
   SIMULASI USER LOGIN
   nanti ganti dari auth
========================= */
const currentUser = {
  name: 'Super Admin',
  role: 'SuperAdmin', // ganti ke 'Admin' untuk test block
};

export default function SistemPage() {
  /* =========================
     ROLE GUARD (UI ONLY)
  ========================= */
  if (currentUser.role !== 'SuperAdmin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
        <div className="max-w-md w-full bg-white border rounded-xl p-6 text-center shadow-sm">
          <Lock className="mx-auto text-red-500 mb-3" size={40} />
          <h1 className="text-lg font-bold text-gray-800 mb-1">
            Akses Ditolak
          </h1>
          <p className="text-sm text-gray-500">
            Halaman <b>Sistem</b> hanya dapat diakses oleh
            <b> SuperAdmin</b>.
          </p>
        </div>
      </div>
    );
  }

  /* =========================
     RENDER PAGE
  ========================= */
  return (
    <div className="p-4 sm:p-6 bg-[#f8fafc] min-h-screen text-slate-800">
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-bold mb-1">
          Sistem
        </h1>
        <p className="text-sm text-gray-500">
          Pengaturan global & informasi sistem aplikasi
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* ======================
            INFORMASI APLIKASI
        ====================== */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border rounded-xl p-5 shadow-sm"
        >
          <div className="flex items-center gap-2 mb-4">
            <Info className="text-blue-600" size={20} />
            <h2 className="font-semibold text-base">
              Informasi Aplikasi
            </h2>
          </div>

          <div className="space-y-3 text-sm">
            <Row label="Nama Aplikasi" value="SmartKos" />
            <Row label="Versi Aplikasi" value="V.0.1.0" />
            <Row label="Environment" value="Development" />
            <Row label="Timezone" value="Asia/Purwakarta" />
          </div>
        </motion.div>

        {/* ======================
            STATUS SISTEM
        ====================== */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="bg-white border rounded-xl p-5 shadow-sm"
        >
          <div className="flex items-center gap-2 mb-4">
            <Server className="text-green-600" size={20} />
            <h2 className="font-semibold text-base">
              Status Sistem
            </h2>
          </div>

          <div className="space-y-3 text-sm">
            <StatusRow label="Database" status="Disconnected" />
            <StatusRow label="Email Service" status="Active" />
            <StatusRow label="Server Time" status="Online" />
          </div>
        </motion.div>

        {/* ======================
            CATATAN AKSES
        ====================== */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white border rounded-xl p-5 shadow-sm lg:col-span-2"
        >
          <div className="flex items-center gap-2 mb-3">
            <ShieldAlert className="text-amber-600" size={20} />
            <h2 className="font-semibold text-base">
              Catatan Hak Akses
            </h2>
          </div>

          <p className="text-sm text-gray-600 leading-relaxed">
            Halaman <b>Sistem</b> hanya dapat diakses oleh pengguna
            dengan role <b>SuperAdmin</b>.
            <br />
            Semua informasi dan konfigurasi di halaman ini bersifat
            global dan berdampak pada seluruh aplikasi.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

/* =========================
   SMALL COMPONENTS
========================= */
function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b pb-1">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

function StatusRow({
  label,
  status,
}: {
  label: string;
  status: 'Disconnected' | 'Active' | 'Online' ;
}) {
  return (
    <div className="flex justify-between items-center border-b pb-1">
      <span className="text-gray-500">{label}</span>
      <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700 font-medium">
        {status}
      </span>
    </div>
  );
}

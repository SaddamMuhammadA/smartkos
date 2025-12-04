// app/keuangan/riwayat-transaksi/components/FilterTransaksi.tsx
'use client';

import React from 'react';
import { Search } from 'lucide-react';

export default function FilterTransaksi({
  search,
  setSearch,
  from,
  setFrom,
  to,
  setTo,
  status,
  setStatus,
}: {
  search: string;
  setSearch: (v: string) => void;
  from: string;
  setFrom: (v: string) => void;
  to: string;
  setTo: (v: string) => void;
  status: string;
  setStatus: (v: string) => void;
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:gap-3 mb-5">
      <div className="flex items-center gap-2 w-full md:w-auto">
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Cari nama / trx / kamar..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border rounded-lg text-sm border-gray-300 focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 mt-3 md:mt-0">
        <input
          type="date"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className="px-3 py-2 text-sm border rounded-lg border-gray-300"
        />
        <input
          type="date"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="px-3 py-2 text-sm border rounded-lg border-gray-300"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="px-3 py-2 text-sm border rounded-lg border-gray-300"
        >
          <option value="">Semua Status</option>
          <option value="Berhasil">Berhasil</option>
          <option value="Menunggu">Menunggu</option>
          <option value="Ditolak">Ditolak</option>
        </select>
      </div>
    </div>
  );
}

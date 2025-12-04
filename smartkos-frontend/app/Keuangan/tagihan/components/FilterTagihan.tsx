"use client";

import { Search } from "lucide-react";

export default function FilterTagihan({
  search,
  setSearch,
  status,
  setStatus,
  from,
  to,
  setFrom,
  setTo,
}: any) {
  return (
    <div className="flex flex-col md:flex-row gap-3 mb-5">
      {/* Search */}
      <div className="relative w-full md:w-64">
        <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari nama / invoice / kamar..."
          className="w-full pl-9 pr-3 py-2 border rounded-lg text-sm"
        />
      </div>

      {/* Status */}
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="px-3 py-2 border rounded-lg text-sm"
      >
        <option value="">Semua Status</option>
        <option value="Belum Lunas">Belum Lunas</option>
        <option value="Lunas">Lunas</option>
        <option value="Lebih Bayar">Lebih Bayar</option>
      </select>

      {/* Periode */}
      <input
        type="date"
        value={from}
        onChange={(e) => setFrom(e.target.value)}
        className="px-3 py-2 border rounded-lg text-sm"
      />
      <input
        type="date"
        value={to}
        onChange={(e) => setTo(e.target.value)}
        className="px-3 py-2 border rounded-lg text-sm"
      />
    </div>
  );
}

"use client";

import { Search } from "lucide-react";

export default function FilterRiwayat({
  search,
  setSearch,
  status,
  setStatus,
}: any) {
  return (
    <div className="flex flex-col md:flex-row items-center gap-3 mb-5">
      {/* Search Bar */}
      <div className="relative w-full md:w-72">
        <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
        <input
          type="text"
          placeholder="Cari nama penyewa..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-3 py-2 border rounded-lg text-sm border-gray-300 focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Filter Status */}
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="px-3 py-2 border text-sm border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Semua Status</option>
        <option value="Selesai">Selesai</option>
        <option value="Dibatalkan">Dibatalkan</option>
        <option value="Berhenti">Berhenti</option>
      </select>
    </div>
  );
}

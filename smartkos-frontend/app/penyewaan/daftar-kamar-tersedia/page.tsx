'use client';

import { useState, useMemo } from 'react';
import { BedDouble, Info, PlusCircle, Search } from 'lucide-react';

interface Kamar {
  id: number;
  kode: string;
  jenis: string;
  status: 'Tersedia' | 'Terisi' | 'Perawatan';
  catatan?: string;
}

export default function KamarTersediaPage() {
  const [search, setSearch] = useState('');
  const [filterJenis, setFilterJenis] = useState('Semua');

  const [data] = useState<Kamar[]>([
    { id: 1, kode: 'A1', jenis: 'Standar', status: 'Tersedia' },
    { id: 2, kode: 'A2', jenis: 'Standar', status: 'Tersedia', catatan: 'Dekat jendela' },
    { id: 3, kode: 'B1', jenis: 'VIP', status: 'Tersedia' },
    { id: 4, kode: 'C1', jenis: 'Premium', status: 'Tersedia', catatan: 'Termasuk AC & TV' },
    { id: 5, kode: 'D2', jenis: 'Standar', status: 'Tersedia' },
    { id: 6, kode: 'E1', jenis: 'VIP', status: 'Tersedia', catatan: 'Lantai 2, view taman' },
  ]);

  // --- Filter dan pencarian data ---
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchesSearch =
        item.kode.toLowerCase().includes(search.toLowerCase()) ||
        item.jenis.toLowerCase().includes(search.toLowerCase()) ||
        (item.catatan?.toLowerCase() || '').includes(search.toLowerCase());

      const matchesJenis =
        filterJenis === 'Semua' || item.jenis === filterJenis;

      return matchesSearch && matchesJenis;
    });
  }, [data, search, filterJenis]);

  const jenisList = ['Semua', 'Standar', 'VIP', 'Premium'];

  return (
    <div className="p-6 bg-[#f8fafc] min-h-screen text-slate-800">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">Kamar Tersedia</h1>
        <p className="text-sm text-gray-500">
          Daftar seluruh kamar yang siap disewakan dan belum memiliki penghuni.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-3">
        {/* Pencarian */}
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Cari kamar atau catatan..."
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Filter Jenis */}
        <div>
          <select
            value={filterJenis}
            onChange={(e) => setFilterJenis(e.target.value)}
            className="w-full md:w-48 text-sm border border-gray-300 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          >
            {jenisList.map((j) => (
              <option key={j} value={j}>
                {j === 'Semua' ? 'Semua Jenis Kamar' : j}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid Kamar */}
      {filteredData.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredData.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all p-5 flex flex-col justify-between"
            >
              {/* Header Kamar */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <BedDouble className="w-5 h-5 text-blue-600" />
                  <h3 className="font-semibold text-gray-800 text-lg">
                    {item.kode}
                  </h3>
                </div>
                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">
                  {item.status}
                </span>
              </div>

              {/* Detail Kamar */}
              <div className="flex-1 text-sm text-gray-600 space-y-1 mb-4">
                <p>
                  <span className="font-medium text-gray-700">Jenis:</span>{' '}
                  {item.jenis}
                </p>
                {item.catatan && (
                  <p>
                    <span className="font-medium text-gray-700">Catatan:</span>{' '}
                    {item.catatan}
                  </p>
                )}
              </div>

              {/* Tombol Aksi */}
              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition">
                  <Info size={14} /> Lihat Detail
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition">
                  <PlusCircle size={14} /> Tambah Penyewa
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 text-gray-500 text-sm border border-dashed border-gray-300 rounded-lg bg-white">
          Tidak ada kamar yang sesuai dengan pencarian atau filter.
        </div>
      )}

      {/* Footer Info */}
      <div className="mt-6 text-xs text-gray-500">
        Total {filteredData.length} kamar tersedia ditampilkan.
      </div>
    </div>
  );
}

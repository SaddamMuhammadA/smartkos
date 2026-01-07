'use client';

import { useState, useMemo } from 'react';
import { Eye, CreditCard, LayoutGrid, Table, Search } from 'lucide-react';

interface Sewa {
  id: number;
  kamar: string;
  penghuni: string;
  tanggalMulai: string;
  tanggalSelesai: string;
  totalHarga: number;
  deposit: number;
  status: 'Aktif' | 'Aktif (Belum Lunas)';
}

export default function SewaAktifPage() {
  const [viewMode, setViewMode] = useState<'table' | 'card'>('table');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'Semua' | 'Aktif' | 'Aktif (Belum Lunas)'>('Semua');

  const [data] = useState<Sewa[]>([
    {
      id: 1,
      kamar: 'A1',
      penghuni: 'Saddam Muhammad',
      tanggalMulai: '2025-10-04',
      tanggalSelesai: '2025-11-04',
      totalHarga: 1500000,
      deposit: 500000,
      status: 'Aktif',
    },
    {
      id: 2,
      kamar: 'B2',
      penghuni: 'Dimas Adi',
      tanggalMulai: '2025-09-20',
      tanggalSelesai: '2025-10-20',
      totalHarga: 1700000,
      deposit: 400000,
      status: 'Aktif (Belum Lunas)',
    },
    {
      id: 3,
      kamar: 'C1',
      penghuni: 'Rizky Alamsyah',
      tanggalMulai: '2025-10-10',
      tanggalSelesai: '2025-11-10',
      totalHarga: 2000000,
      deposit: 600000,
      status: 'Aktif',
    },
  ]);

  // === Filter dan pencarian ===
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchesSearch =
        item.kamar.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.penghuni.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        filterStatus === 'Semua' || item.status === filterStatus;
      return matchesSearch && matchesStatus;
    });
  }, [data, searchTerm, filterStatus]);

  return (
    <div className="p-6 bg-[#f8fafc] min-h-screen text-slate-800">
      {/* Header Page */}
      <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold mb-1">Daftar Sewa Aktif</h1>
          <p className="text-sm text-gray-500">
            Menampilkan seluruh penyewaan kamar yang sedang aktif dan masih berjalan.
          </p>
        </div>

        {/* Toggle View */}
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg shadow-sm px-2 py-1">
          <button
            onClick={() => setViewMode('table')}
            className={`flex items-center gap-1 px-3 py-1.5 text-sm rounded-md transition ${
              viewMode === 'table'
                ? 'bg-blue-100 text-blue-700 font-medium'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Table size={16} /> Tabel
          </button>
          <button
            onClick={() => setViewMode('card')}
            className={`flex items-center gap-1 px-3 py-1.5 text-sm rounded-md transition ${
              viewMode === 'card'
                ? 'bg-blue-100 text-blue-700 font-medium'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <LayoutGrid size={16} /> Kartu
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
        {/* Search Bar */}
        <div className="relative w-full sm:w-1/2">
          <Search
            size={16}
            className="absolute left-3 top-2.5 text-gray-400"
          />
          <input
            type="text"
            placeholder="Cari kamar atau nama penghuni..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-gray-200 rounded-lg pl-9 pr-3 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100 shadow-sm"
          />
        </div>

        {/* Filter Status */}
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as any)}
          className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-100 shadow-sm"
        >
          <option value="Semua">Semua Status</option>
          <option value="Aktif">Aktif</option>
          <option value="Aktif (Belum Lunas)">Aktif (Belum Lunas)</option>
        </select>
      </div>

      {/* === TABEL VIEW === */}
      {viewMode === 'table' && (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-gray-700">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left font-medium">Kamar</th>
                  <th className="px-4 py-3 text-left font-medium">Penghuni</th>
                  <th className="px-4 py-3 text-left font-medium">Tanggal Mulai</th>
                  <th className="px-4 py-3 text-left font-medium">Tanggal Selesai</th>
                  <th className="px-4 py-3 text-left font-medium">Total Harga</th>
                  <th className="px-4 py-3 text-left font-medium">Deposit</th>
                  <th className="px-4 py-3 text-left font-medium">Status</th>
                  <th className="px-4 py-3 text-center font-medium">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-4 py-3 font-medium text-gray-800">
                        {item.kamar}
                      </td>
                      <td className="px-4 py-3">{item.penghuni}</td>
                      <td className="px-4 py-3">{item.tanggalMulai}</td>
                      <td className="px-4 py-3">{item.tanggalSelesai}</td>
                      <td className="px-4 py-3 font-semibold text-gray-800">
                        Rp {item.totalHarga.toLocaleString('id-ID')}
                      </td>
                      <td className="px-4 py-3">
                        Rp {item.deposit.toLocaleString('id-ID')}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            item.status === 'Aktif'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-amber-100 text-amber-700'
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 flex items-center justify-center gap-2">
                        <button className="flex items-center gap-1 px-3 py-1.5 text-xs bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition">
                          <Eye size={14} /> Detail
                        </button>
                        <button className="flex items-center gap-1 px-3 py-1.5 text-xs bg-amber-100 text-amber-700 rounded-md hover:bg-amber-200 transition">
                          <CreditCard size={14} /> Tagih
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={8}
                      className="text-center py-6 text-gray-500 text-sm"
                    >
                      Tidak ada data yang sesuai dengan pencarian.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Footer Info */}
          <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 text-xs text-gray-500">
            Total {filteredData.length} penyewaan aktif ditampilkan.
          </div>
        </div>
      )}

      {/* === CARD VIEW === */}
      {viewMode === 'card' && (
        <div>
          {filteredData.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredData.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-lg font-semibold text-gray-800">
                      Kamar {item.kamar}
                    </h2>
                    <span
                      className={`px-2 py-0.5 text-xs rounded-full font-semibold ${
                        item.status === 'Aktif'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-amber-100 text-amber-700'
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>

                  <div className="space-y-1 mb-3 text-sm">
                    <p>
                      <span className="text-gray-500">Penghuni:</span>{' '}
                      <span className="font-medium text-gray-800">
                        {item.penghuni}
                      </span>
                    </p>
                    <p>
                      <span className="text-gray-500">Periode:</span>{' '}
                      <span className="font-medium text-gray-800">
                        {item.tanggalMulai} → {item.tanggalSelesai}
                      </span>
                    </p>
                    <p>
                      <span className="text-gray-500">Total Harga:</span>{' '}
                      <span className="font-semibold text-gray-800">
                        Rp {item.totalHarga.toLocaleString('id-ID')}
                      </span>
                    </p>
                    <p>
                      <span className="text-gray-500">Deposit:</span>{' '}
                      <span className="font-semibold text-gray-800">
                        Rp {item.deposit.toLocaleString('id-ID')}
                      </span>
                    </p>
                  </div>

                  <div className="flex items-center justify-end gap-2 mt-4">
                    <button className="flex items-center gap-1 px-3 py-1.5 text-xs bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition">
                      <Eye size={14} /> Detail
                    </button>
                    <button className="flex items-center gap-1 px-3 py-1.5 text-xs bg-amber-100 text-amber-700 rounded-md hover:bg-amber-200 transition">
                      <CreditCard size={14} /> Tagih
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 text-sm mt-8">
              Tidak ada data yang sesuai dengan filter atau pencarian.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

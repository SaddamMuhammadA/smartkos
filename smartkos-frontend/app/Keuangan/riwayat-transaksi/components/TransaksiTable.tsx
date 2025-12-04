// app/keuangan/riwayat-transaksi/components/TransaksiTable.tsx
'use client';

import React from 'react';
import { Eye } from 'lucide-react';
import { Transaksi } from '../data/dummyTransaksi';

export default function TransaksiTable({
  data,
  onDetail,
}: {
  data: Transaksi[];
  onDetail: (t: Transaksi) => void;
}) {
  const badge = (s: Transaksi['status']) => {
    switch (s) {
      case 'Berhasil':
        return 'bg-green-100 text-green-700';
      case 'Menunggu':
        return 'bg-amber-100 text-amber-700';
      case 'Gagal':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div>
      {/* Desktop table */}
      <div className="hidden md:block bg-white border rounded-xl shadow-sm overflow-hidden">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left font-medium">No. TRX</th>
              <th className="px-4 py-3 text-left font-medium">Nama</th>
              <th className="px-4 py-3 text-left font-medium">Kamar</th>
              <th className="px-4 py-3 text-left font-medium">Periode</th>
              <th className="px-4 py-3 text-left font-medium">Tanggal</th>
              <th className="px-4 py-3 text-right font-medium">Jumlah</th>
              <th className="px-4 py-3 text-left font-medium">Status</th>
              <th className="px-4 py-3 text-center font-medium">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {data.map((t) => (
              <tr key={t.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">{t.trxNo}</td>
                <td className="px-4 py-3">{t.customer}</td>
                <td className="px-4 py-3">{t.kamar}</td>
                <td className="px-4 py-3">{t.periode}</td>
                <td className="px-4 py-3">{t.tanggal}</td>
                <td className="px-4 py-3 text-right font-semibold">
                  Rp {t.jumlah.toLocaleString('id-ID')}
                </td>
                <td className="px-4 py-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${badge(t.status)}`}>
                    {t.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => onDetail(t)}
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition"
                    aria-label={`Detail ${t.trxNo}`}
                  >
                    <Eye size={14} />
                  </button>
                </td>
              </tr>
            ))}

            {data.length === 0 && (
              <tr>
                <td colSpan={8} className="text-center py-6 text-gray-400 italic">
                  Tidak ada transaksi
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-3">
        {data.map((t) => (
          <div key={t.id} className="bg-white border rounded-xl shadow-sm p-4 active:scale-[0.995] transition">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-sm text-gray-500">{t.trxNo}</div>
                <div className="font-semibold text-gray-800">{t.customer}</div>
                <div className="text-xs text-gray-500">{t.kamar} • {t.periode}</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold">Rp {t.jumlah.toLocaleString('id-ID')}</div>
                <div className={`mt-2 px-2 py-0.5 rounded-full text-xs font-semibold ${badge(t.status)}`}>
                  {t.status}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mt-4">
              <div className="text-xs text-gray-500">{t.tanggal}</div>
              <button
                onClick={() => onDetail(t)}
                className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition text-xs flex items-center gap-2"
              >
                <Eye size={14} /> Detail
              </button>
            </div>
          </div>
        ))}

        {data.length === 0 && (
          <div className="text-center py-8 text-gray-400 italic">Tidak ada transaksi</div>
        )}
      </div>
    </div>
  );
}

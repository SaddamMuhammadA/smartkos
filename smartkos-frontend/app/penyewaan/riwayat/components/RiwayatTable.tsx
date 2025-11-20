"use client";

import { Eye } from "lucide-react";
import { RiwayatSewa } from "../data/dummyRiwayat";

export default function RiwayatTable({ data, onDetail }: {
  data: RiwayatSewa[];
  onDetail: (r: RiwayatSewa) => void;
}) {
  const badgeClass = {
    Selesai: "bg-green-100 text-green-700",
    Dibatalkan: "bg-red-100 text-red-700",
    Berhenti: "bg-amber-100 text-amber-700",
  };

  return (
    <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="px-4 py-3 text-left font-medium">Nama</th>
            <th className="px-4 py-3 text-left font-medium">Kamar</th>
            <th className="px-4 py-3 text-left font-medium">Periode</th>
            <th className="px-4 py-3 text-left font-medium">Total</th>
            <th className="px-4 py-3 text-left font-medium">Status</th>
            <th className="px-4 py-3 text-center font-medium">Aksi</th>
          </tr>
        </thead>

        <tbody>
          {data.map((r) => (
            <tr key={r.id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-3">{r.customer}</td>
              <td className="px-4 py-3">{r.kamar}</td>
              <td className="px-4 py-3">
                {r.tanggalMulai} s/d {r.tanggalSelesai}
              </td>
              <td className="px-4 py-3">
                Rp {r.total.toLocaleString("id-ID")}
              </td>
              <td className="px-4 py-3">
                <span className={`px-3 py-1 rounded-full text-xs ${badgeClass[r.status]}`}>
                  {r.status}
                </span>
              </td>
              <td className="px-4 py-3 text-center">
                <button
                  onClick={() => onDetail(r)}
                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition"
                >
                  <Eye size={14} />
                </button>
              </td>
            </tr>
          ))}

          {data.length === 0 && (
            <tr>
              <td
                colSpan={6}
                className="text-center py-6 text-gray-400 italic"
              >
                Tidak ada data riwayat penyewa
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

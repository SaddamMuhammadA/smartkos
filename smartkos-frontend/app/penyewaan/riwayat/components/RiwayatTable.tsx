"use client";

import { Eye } from "lucide-react";
import { RiwayatSewa } from "../data/dummyRiwayat";

export default function RiwayatTable({
  data,
  onDetail,
}: {
  data: RiwayatSewa[];
  onDetail: (r: RiwayatSewa) => void;
}) {
  const badgeClass: Record<RiwayatSewa["status"], string> = {
    Selesai: "bg-green-100 text-green-700",
    Dibatalkan: "bg-red-100 text-red-700",
    Berhenti: "bg-amber-100 text-amber-700",
  };

  /* ================= MOBILE CARD ================= */
  return (
    <>
      {/* ================= MOBILE VIEW ================= */}
      <div className="md:hidden space-y-4">
        {data.map((r) => (
          <div
            key={r.id}
            className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold text-gray-800">{r.customer}</p>
                <p className="text-sm text-gray-500">{r.kamar}</p>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-xs ${badgeClass[r.status]}`}
              >
                {r.status}
              </span>
            </div>

            <div className="mt-3 text-sm text-gray-600 space-y-1">
              <p>
                <b>Periode:</b> {r.tanggalMulai} – {r.tanggalSelesai}
              </p>
              <p>
                <b>Total:</b> Rp {r.total.toLocaleString("id-ID")}
              </p>
            </div>

            <div className="flex justify-end mt-4">
              <button
                onClick={() => onDetail(r)}
                className="flex items-center gap-2 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition text-sm"
              >
                <Eye size={16} />
                Detail
              </button>
            </div>
          </div>
        ))}

        {data.length === 0 && (
          <p className="text-center py-6 text-gray-400 italic">
            Tidak ada data riwayat penyewa
          </p>
        )}
      </div>

      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden md:block bg-white border rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
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
                <tr
                  key={r.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3">{r.customer}</td>
                  <td className="px-4 py-3">{r.kamar}</td>
                  <td className="px-4 py-3">
                    {r.tanggalMulai} s/d {r.tanggalSelesai}
                  </td>
                  <td className="px-4 py-3">
                    Rp {r.total.toLocaleString("id-ID")}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${badgeClass[r.status]}`}
                    >
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
      </div>
    </>
  );
}

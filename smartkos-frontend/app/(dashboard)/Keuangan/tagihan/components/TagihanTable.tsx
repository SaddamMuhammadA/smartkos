"use client";

import { Eye, Printer } from "lucide-react";
import { Tagihan } from "../data/dummyTagihan";

export default function TagihanTable({
  data,
  onDetail,
  onPrint,
  onTagih,
}: {
  data: Tagihan[];
  onDetail: (t: Tagihan) => void;
  onPrint: (t: Tagihan) => void;
  onTagih?: (t: Tagihan) => void;
}) {
  const badge = {
    "Belum Lunas": "bg-red-100 text-red-700",
    Lunas: "bg-green-100 text-green-700",
    "Lebih Bayar": "bg-blue-100 text-blue-700",
  };

  return (
    <div className="w-full bg-white border rounded-xl shadow-sm overflow-hidden">

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left">Invoice</th>
              <th className="px-4 py-3 text-left">Customer</th>
              <th className="px-4 py-3 text-left">Kamar</th>
              <th className="px-4 py-3 text-left">Total</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-center">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {data.map((t) => (
              <tr key={t.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">{t.invoiceNo}</td>
                <td className="px-4 py-3">{t.customer}</td>
                <td className="px-4 py-3">{t.kamar}</td>
                <td className="px-4 py-3">
                  Rp {t.totalTagihan.toLocaleString("id-ID")}
                </td>

                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 text-xs rounded-full ${badge[t.status]}`}
                  >
                    {t.status}
                  </span>
                </td>

                <td className="px-4 py-3 text-center flex gap-2 justify-center">
                  <button
                    onClick={() => onDetail(t)}
                    className="px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                    aria-label={`Detail ${t.invoiceNo}`}
                  >
                    <Eye size={14} />
                  </button>

                  <button
                    onClick={() => onPrint(t)}
                    className="px-2 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                    aria-label={`Cetak ${t.invoiceNo}`}
                  >
                    <Printer size={14} />
                  </button>

                  {t.status === "Belum Lunas" && onTagih && (
                    <button
                      onClick={() => onTagih(t)}
                      className="px-2 py-1 bg-amber-100 text-amber-800 rounded hover:bg-amber-200"
                      aria-label={`Tagih ${t.invoiceNo}`}
                    >
                      Tagih
                    </button>
                  )}
                </td>
              </tr>
            ))}

            {data.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-6 text-gray-400 italic">
                  Tidak ada data
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden p-4 space-y-4">
        {data.map((t) => (
          <div key={t.id} className="border rounded-lg p-4 shadow-sm bg-white">
            <div className="font-medium text-gray-800">{t.invoiceNo}</div>
            <div className="text-sm text-gray-600">{t.customer}</div>
            <div className="text-sm">{t.kamar}</div>

            <div className="mt-1">
              <b>Total:</b> Rp {t.totalTagihan.toLocaleString("id-ID")}
            </div>

            <span className={`inline-block mt-2 px-3 py-1 text-xs rounded-full ${badge[t.status]}`}>
              {t.status}
            </span>

            <div className="flex gap-2 mt-3">
              <button
                onClick={() => onDetail(t)}
                className="flex-1 py-2 text-sm bg-blue-100 text-blue-700 rounded-lg"
              >
                Detail
              </button>

              <button
                onClick={() => onPrint(t)}
                className="flex-1 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg"
              >
                Cetak
              </button>

              {t.status === "Belum Lunas" && onTagih && (
                <button
                  onClick={() => onTagih(t)}
                  className="flex-1 py-2 text-sm bg-amber-100 text-amber-800 rounded-lg"
                >
                  Tagih
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

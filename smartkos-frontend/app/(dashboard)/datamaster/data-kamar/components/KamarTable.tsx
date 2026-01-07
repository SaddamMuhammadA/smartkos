// app/datamaster/data-kamar/components/KamarTable.tsx
"use client";

import type { Kamar } from "../data/dummyKamar";
import { Button } from "@/components/ui/button";

type Props = {
  data: Kamar[];
  onEdit: (k: Kamar) => void;
  onDelete: (id_kamar: number) => void;
};

export default function KamarTable({ data, onEdit, onDelete }: Props) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Tersedia":
        return "bg-green-100 text-green-800";
      case "Terisi":
        return "bg-red-100 text-red-800";
      case "Perawatan":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <>
      {/* Mobile Card View */}
      <div className="block lg:hidden space-y-3">
        {data.map((item: Kamar) => (
          <div
            key={item.id_kamar}
            className="bg-white border rounded-lg p-4 shadow-sm"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-bold text-lg">{item.kode_kamar}</h3>
                <p className="text-sm text-gray-500">ID: {item.id_kamar}</p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                  item.status_kamar
                )}`}
              >
                {item.status_kamar}
              </span>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Properti:</span>
                <span className="font-medium">{item.id_kos}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Jenis Kamar:</span>
                <span className="font-medium">{item.id_jenis_kamar}</span>
              </div>
              {item.catatan && (
                <div className="text-sm">
                  <span className="text-gray-600">Catatan:</span>
                  <p className="text-gray-800 mt-1">{item.catatan}</p>
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <Button
                onClick={() => onEdit(item)}
                variant="secondary"
                className="flex-1"
              >
                Edit
              </Button>
              <Button
                onClick={() => onDelete(item.id_kamar)}
                variant="destructive"
                className="flex-1"
              >
                Hapus
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Kode Kamar</th>
              <th className="border p-2">Properti (ID Kos)</th>
              <th className="border p-2">Jenis Kamar</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Catatan</th>
              <th className="border p-2 w-40">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item: Kamar) => (
              <tr key={item.id_kamar}>
                <td className="border p-2">{item.kode_kamar}</td>
                <td className="border p-2">{item.id_kos}</td>
                <td className="border p-2">{item.id_jenis_kamar}</td>
                <td className="border p-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                      item.status_kamar
                    )}`}
                  >
                    {item.status_kamar}
                  </span>
                </td>
                <td className="border p-2">{item.catatan || "-"}</td>

                <td className="border p-2 space-x-2">
                  <Button onClick={() => onEdit(item)} variant="secondary">
                    Edit
                  </Button>
                  <Button
                    onClick={() => onDelete(item.id_kamar)}
                    variant="destructive"
                  >
                    Hapus
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
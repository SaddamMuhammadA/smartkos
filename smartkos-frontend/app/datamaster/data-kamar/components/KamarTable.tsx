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
  return (
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
            <td className="border p-2">{item.status_kamar}</td>
            <td className="border p-2">{item.catatan || "-"}</td>

            <td className="border p-2 space-x-2">
              <Button onClick={() => onEdit(item)} variant="secondary">
                Edit
              </Button>
              <Button onClick={() => onDelete(item.id_kamar)} variant="destructive">
                Hapus
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

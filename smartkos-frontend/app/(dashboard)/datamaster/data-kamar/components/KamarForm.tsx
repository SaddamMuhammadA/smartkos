"use client";

import { useState, useEffect } from "react";
import type { Kamar } from "../data/dummyKamar";

export default function KamarForm({
  initialData,
  onClose,
  onSave
}: {
  initialData: Kamar | null;
  onClose: () => void;
  onSave: (data: Kamar) => void;
}) {
  const [form, setForm] = useState<Kamar>({
    id_kamar: 0,
    id_kos: 0,
    id_jenis_kamar: 0,
    kode_kamar: "",
    status_kamar: "Tersedia",
    catatan: "",
  });

  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded p-6 w-[400px]">
        <h2 className="text-lg font-bold mb-4">
          {initialData ? "Edit Kamar" : "Tambah Kamar"}
        </h2>

        <div className="space-y-3">
          <input
            name="kode_kamar"
            value={form.kode_kamar}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            placeholder="Kode Kamar"
          />

          <input
            name="id_kos"
            value={form.id_kos ?? ""}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            placeholder="ID Kos"
          />

          <input
            name="id_jenis_kamar"
            value={form.id_jenis_kamar ?? ""}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            placeholder="ID Jenis Kamar"
          />

          <select
            name="status_kamar"
            value={form.status_kamar}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          >
            <option value="Tersedia">Tersedia</option>
            <option value="Terisi">Terisi</option>
            <option value="Perawatan">Perawatan</option>
          </select>

          <input
            name="catatan"
            value={form.catatan ?? ""}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            placeholder="Catatan"
          />
        </div>

        <div className="flex justify-end mt-4 space-x-2">
          <button onClick={onClose}>Batal</button>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={() => onSave(form)}
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
}

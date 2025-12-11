"use client";

import { useState } from "react";
import KamarTable from "./components/KamarTable";
import KamarForm from "./components/KamarForm";
import { dummyKamar } from "./data/dummyKamar";
import type { Kamar } from "./data/dummyKamar";

export default function Page() {
  const [listKamar, setListKamar] = useState<Kamar[]>(dummyKamar);
  const [isOpen, setIsOpen] = useState(false);
  const [editingData, setEditingData] = useState<Kamar | null>(null);

  const handleAdd = () => {
    setEditingData(null);
    setIsOpen(true);
  };

  const handleEdit = (kamar: Kamar) => {
    setEditingData(kamar);
    setIsOpen(true);
  };

  const handleDelete = (id_kamar: number) => {
    setListKamar(listKamar.filter((item) => item.id_kamar !== id_kamar));
  };

  const handleSave = (data: Kamar) => {
    if (editingData) {
      setListKamar(
        listKamar.map((item) =>
          item.id_kamar === data.id_kamar ? data : item
        )
      );
    } else {
      setListKamar([
        ...listKamar,
        { ...data, id_kamar: Date.now() }
      ]);
    }

    setIsOpen(false);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-bold">Data Kamar</h1>

        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Tambah Kamar
        </button>
      </div>

      <KamarTable data={listKamar} onEdit={handleEdit} onDelete={handleDelete} />

      {isOpen && (
        <KamarForm
          initialData={editingData}
          onClose={() => setIsOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

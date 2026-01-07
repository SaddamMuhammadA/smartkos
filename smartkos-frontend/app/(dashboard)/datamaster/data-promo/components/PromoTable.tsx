'use client';

import { useState } from 'react';
import { PlusCircle, Edit, Trash2, Search, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import PromoForm, { PromoFormData } from './PromoForm';


/* =======================
   TYPES
======================= */
export type Promo = {
  id_promo: number;
  nama_promo: string;
  id_kos: number;
  id_jenis_kamar: number;
  pricing_id?: number;
  tipe_promo: 'Persentase' | 'Nominal';
  nilai: number;
  status: 'Aktif' | 'Nonaktif';
  tanggal_mulai: string;
  tanggal_selesai: string;
};

/* =======================
   DUMMY MASTER DATA
======================= */
const masterKosData = [
  { id_kos: 1, nama_kos: 'SmartKos A' },
  { id_kos: 2, nama_kos: 'SmartKos B' },
];

const jenisKamarData = [
  { id_jenis_kamar: 1, id_kos: 1, nama_jenis_kamar: 'Standard' },
  { id_jenis_kamar: 2, id_kos: 1, nama_jenis_kamar: 'Deluxe' },
  { id_jenis_kamar: 3, id_kos: 2, nama_jenis_kamar: 'VIP' },
];

/* =======================
   COMPONENT
======================= */
export default function PromoTable() {
  const [data, setData] = useState<Promo[]>([
    {
      id_promo: 1,
      nama_promo: 'Promo Akhir Tahun',
      id_kos: 1,
      id_jenis_kamar: 2,
      tipe_promo: 'Persentase',
      nilai: 10,
      status: 'Aktif',
      tanggal_mulai: '2024-12-01',
      tanggal_selesai: '2024-12-31',
    },
  ]);

  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingData, setEditingData] = useState<Promo | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Promo | null>(null);

  /* =======================
     HELPERS
  ======================= */
  const getNamaKos = (id: number) =>
    masterKosData.find((k) => k.id_kos === id)?.nama_kos || '-';

  const getNamaJenis = (id: number) =>
    jenisKamarData.find((j) => j.id_jenis_kamar === id)?.nama_jenis_kamar || '-';

  const formatNilai = (p: Promo) =>
    p.tipe_promo === 'Persentase'
      ? `${p.nilai}%`
      : new Intl.NumberFormat('id-ID', {
          style: 'currency',
          currency: 'IDR',
          minimumFractionDigits: 0,
        }).format(p.nilai);

  const filteredData = data.filter((p) => {
    const s = search.toLowerCase();
    return (
      p.nama_promo.toLowerCase().includes(s) ||
      getNamaKos(p.id_kos).toLowerCase().includes(s) ||
      getNamaJenis(p.id_jenis_kamar).toLowerCase().includes(s)
    );
  });

  /* =======================
     ACTIONS
  ======================= */
  const handleSubmit = (payload: PromoFormData) => {
    if (editingData) {
      setData((prev) =>
        prev.map((p) =>
          p.id_promo === editingData.id_promo
            ? { ...p, ...payload }
            : p
        )
      );
    } else {
      setData((prev) => [
        ...prev,
        {
          id_promo: Date.now(), // ID dibuat di table, bukan di form
          ...payload,
        },
      ]);
    }

    setShowForm(false);
    setEditingData(null);
  };

  /* =======================
     RENDER
  ======================= */
  return (
    <div className="p-4 sm:p-6 bg-[#f8fafc] min-h-screen">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold">Data Promo</h1>
          <p className="text-sm text-gray-500">
            Promo khusus untuk jenis kamar
          </p>
        </div>

        <button
          onClick={() => {
            setEditingData(null);
            setShowForm(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <PlusCircle size={18} />
          Tambah Promo
        </button>
      </div>

      {/* SEARCH */}
      <div className="relative mb-4 max-w-md">
        <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari promo, kos, atau kamar..."
          className="w-full pl-9 pr-3 py-2 border rounded-lg text-sm"
        />
      </div>

      {/* MOBILE CARD */}
      <div className="block lg:hidden space-y-3">
        {filteredData.map((p) => (
          <div
            key={p.id_promo}
            className="relative bg-white border rounded-xl shadow-sm p-4"
          >
            <span
              className={`absolute top-3 right-3 px-2.5 py-1 text-[11px] font-semibold rounded-full ${
                p.status === 'Aktif'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {p.status}
            </span>

            <div className="flex gap-2 mb-2">
              <Tag size={18} className="text-blue-600 mt-1" />
              <div>
                <h3 className="font-semibold">{p.nama_promo}</h3>
                <p className="text-xs text-gray-500">
                  {getNamaKos(p.id_kos)} • {getNamaJenis(p.id_jenis_kamar)}
                </p>
              </div>
            </div>

            <p className="text-sm mb-3">
              Diskon: <b>{formatNilai(p)}</b>
            </p>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  setEditingData(p);
                  setShowForm(true);
                }}
                className="flex-1 bg-amber-100 text-amber-700 rounded-lg py-2 text-xs flex justify-center items-center gap-1"
              >
                <Edit size={14} /> Edit
              </button>
              <button
                onClick={() => setDeleteTarget(p)}
                className="flex-1 bg-red-100 text-red-700 rounded-lg py-2 text-xs flex justify-center items-center gap-1"
              >
                <Trash2 size={14} /> Hapus
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* DESKTOP TABLE */}
      <div className="hidden lg:block bg-white border rounded-xl shadow-sm overflow-hidden">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left">Promo</th>
              <th className="px-4 py-3 text-left">Kos</th>
              <th className="px-4 py-3 text-left">Jenis Kamar</th>
              <th className="px-4 py-3 text-left">Diskon</th>
              <th className="px-4 py-3 text-center">Status</th>
              <th className="px-4 py-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((p) => (
              <tr key={p.id_promo} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{p.nama_promo}</td>
                <td className="px-4 py-3">{getNamaKos(p.id_kos)}</td>
                <td className="px-4 py-3">{getNamaJenis(p.id_jenis_kamar)}</td>
                <td className="px-4 py-3">{formatNilai(p)}</td>
                <td className="px-4 py-3 text-center">
                  <span
                    className={`px-2 py-1 rounded-md text-xs ${
                      p.status === 'Aktif'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {p.status}
                  </span>
                </td>
                <td className="px-4 py-3 flex justify-center gap-2">
                  <button
                    onClick={() => {
                      setEditingData(p);
                      setShowForm(true);
                    }}
                    className="px-3 py-1 bg-amber-100 text-amber-700 rounded-md"
                  >
                    <Edit size={14} />
                  </button>
                  <button
                    onClick={() => setDeleteTarget(p)}
                    className="px-3 py-1 bg-red-100 text-red-700 rounded-md"
                  >
                    <Trash2 size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* FORM */}
      <PromoForm
        show={showForm}
        onClose={() => {
          setShowForm(false);
          setEditingData(null);
        }}
        onSubmit={handleSubmit}
        editingData={editingData}
        masterKosData={masterKosData}
        jenisKamarData={jenisKamarData}
      />

      {/* DELETE CONFIRM */}
      <AnimatePresence>
        {deleteTarget && (
          <motion.div
            className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-xl p-6 max-w-sm w-full text-center"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
            >
              <p className="mb-4 text-sm">
                Hapus promo <b>{deleteTarget.nama_promo}</b>?
              </p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => setDeleteTarget(null)}
                  className="px-4 py-2 border rounded-lg"
                >
                  Batal
                </button>
                <button
                  onClick={() => {
                    setData((prev) =>
                      prev.filter((p) => p.id_promo !== deleteTarget.id_promo)
                    );
                    setDeleteTarget(null);
                  }}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg"
                >
                  Hapus
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

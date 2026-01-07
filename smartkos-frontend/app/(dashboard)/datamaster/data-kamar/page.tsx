'use client';

import { useState } from 'react';
import { PlusCircle, Edit, Trash2, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Kamar {
  id_kamar: number;
  id_kos: number | null;
  id_jenis_kamar: number | null;
  kode_kamar: string;
  status_kamar: 'Tersedia' | 'Terisi' | 'Perawatan';
  catatan?: string;
}

export default function DataKamarPage() {
  const [data, setData] = useState<Kamar[]>([
    {
      id_kamar: 1,
      id_kos: 1,
      id_jenis_kamar: 2,
      kode_kamar: 'A01',
      status_kamar: 'Tersedia',
      catatan: 'Dekat jendela',
    },
    {
      id_kamar: 2,
      id_kos: 1,
      id_jenis_kamar: 1,
      kode_kamar: 'B12',
      status_kamar: 'Terisi',
      catatan: '',
    },
  ]);

  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingKamar, setEditingKamar] = useState<Kamar | null>(null);
  const [form, setForm] = useState({
    kode_kamar: '',
    id_kos: '',
    id_jenis_kamar: '',
    status_kamar: 'Tersedia' as 'Tersedia' | 'Terisi' | 'Perawatan',
    catatan: '',
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedKamar, setSelectedKamar] = useState<{
    id: number;
    kode: string;
  } | null>(null);

  const filteredData = data.filter((item) =>
    item.kode_kamar.toLowerCase().includes(search.toLowerCase())
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingKamar) {
      // Update
      setData((prev) =>
        prev.map((k) =>
          k.id_kamar === editingKamar.id_kamar
            ? {
                ...k,
                kode_kamar: form.kode_kamar,
                id_kos: form.id_kos ? Number(form.id_kos) : null,
                id_jenis_kamar: form.id_jenis_kamar ? Number(form.id_jenis_kamar) : null,
                status_kamar: form.status_kamar,
                catatan: form.catatan,
              }
            : k
        )
      );
    } else {
      // Tambah baru
      const newKamar: Kamar = {
        id_kamar: Date.now(),
        kode_kamar: form.kode_kamar,
        id_kos: form.id_kos ? Number(form.id_kos) : null,
        id_jenis_kamar: form.id_jenis_kamar ? Number(form.id_jenis_kamar) : null,
        status_kamar: form.status_kamar,
        catatan: form.catatan,
      };
      setData([...data, newKamar]);
    }

    setShowModal(false);
    setEditingKamar(null);
    setForm({
      kode_kamar: '',
      id_kos: '',
      id_jenis_kamar: '',
      status_kamar: 'Tersedia',
      catatan: '',
    });
  };

  const handleEdit = (item: Kamar) => {
    setEditingKamar(item);
    setForm({
      kode_kamar: item.kode_kamar,
      id_kos: item.id_kos?.toString() || '',
      id_jenis_kamar: item.id_jenis_kamar?.toString() || '',
      status_kamar: item.status_kamar,
      catatan: item.catatan || '',
    });
    setShowModal(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Tersedia':
        return 'bg-green-100 text-green-700';
      case 'Terisi':
        return 'bg-red-100 text-red-700';
      case 'Perawatan':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="p-4 sm:p-6 bg-[#f8fafc] min-h-screen text-slate-800">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold mb-1">Data Kamar</h1>
          <p className="text-sm text-gray-500">
            Kelola data kamar kos yang tersedia di sistem SmartKos.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition w-full md:w-auto"
        >
          <PlusCircle size={18} /> Tambah Kamar
        </button>
      </div>

      {/* SEARCH BAR */}
      <div className="relative mb-4 w-full md:max-w-md">
        <Search
          size={16}
          className="absolute left-3 top-2.5 text-gray-400 pointer-events-none"
        />
        <input
          type="text"
          placeholder="Cari kode kamar..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-gray-300 rounded-lg pl-9 pr-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      {/* MOBILE CARD VIEW */}
      <div className="block lg:hidden space-y-3">
        {filteredData.map((item) => (
          <div
            key={item.id_kamar}
            className="bg-white border border-gray-200 rounded-xl shadow-sm p-4"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-bold text-lg">{item.kode_kamar}</h3>
                <p className="text-xs text-gray-500">ID: {item.id_kamar}</p>
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
                <span className="font-medium">{item.id_kos || '-'}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Jenis Kamar:</span>
                <span className="font-medium">{item.id_jenis_kamar || '-'}</span>
              </div>
              {item.catatan && (
                <div className="text-sm pt-2 border-t">
                  <span className="text-gray-600">Catatan:</span>
                  <p className="text-gray-800 mt-1">{item.catatan}</p>
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(item)}
                className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-xs bg-amber-100 text-amber-700 rounded-lg hover:bg-amber-200 transition font-medium"
              >
                <Edit size={14} />
                Edit
              </button>
              <button
                onClick={() => {
                  setSelectedKamar({
                    id: item.id_kamar,
                    kode: item.kode_kamar,
                  });
                  setShowDeleteModal(true);
                }}
                className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-xs bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition font-medium"
              >
                <Trash2 size={14} />
                Hapus
              </button>
            </div>
          </div>
        ))}
        {filteredData.length === 0 && (
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 text-center text-gray-400 italic">
            Tidak ada data kamar
          </div>
        )}
      </div>

      {/* DESKTOP TABLE VIEW */}
      <div className="hidden lg:block bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-gray-700">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left font-medium">Kode Kamar</th>
                <th className="px-4 py-3 text-left font-medium">Properti (ID Kos)</th>
                <th className="px-4 py-3 text-left font-medium">Jenis Kamar</th>
                <th className="px-4 py-3 text-left font-medium">Status</th>
                <th className="px-4 py-3 text-left font-medium">Catatan</th>
                <th className="px-4 py-3 text-center font-medium">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item) => (
                <tr key={item.id_kamar} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{item.kode_kamar}</td>
                  <td className="px-4 py-3">{item.id_kos || '-'}</td>
                  <td className="px-4 py-3">{item.id_jenis_kamar || '-'}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-md text-xs font-medium ${getStatusColor(
                        item.status_kamar
                      )}`}
                    >
                      {item.status_kamar}
                    </span>
                  </td>
                  <td className="px-4 py-3">{item.catatan || '-'}</td>
                  <td className="px-4 py-3 text-center flex justify-center gap-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="px-3 py-1.5 text-xs bg-amber-100 text-amber-700 rounded-md hover:bg-amber-200 transition"
                    >
                      <Edit size={14} />
                    </button>

                    <button
                      onClick={() => {
                        setSelectedKamar({
                          id: item.id_kamar,
                          kode: item.kode_kamar,
                        });
                        setShowDeleteModal(true);
                      }}
                      className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
              {filteredData.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-6 text-center text-gray-400 italic"
                  >
                    Tidak ada data kamar
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* === MODAL TAMBAH / EDIT KAMAR === */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-xl shadow-lg w-full max-w-md p-5 max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                {editingKamar ? 'Edit Kamar' : 'Tambah Kamar Baru'}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Kode Kamar
                  </label>
                  <input
                    type="text"
                    name="kode_kamar"
                    value={form.kode_kamar}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none mt-1"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    ID Kos (Properti)
                  </label>
                  <input
                    type="number"
                    name="id_kos"
                    value={form.id_kos}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none mt-1"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    ID Jenis Kamar
                  </label>
                  <input
                    type="number"
                    name="id_jenis_kamar"
                    value={form.id_jenis_kamar}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none mt-1"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Status Kamar
                  </label>
                  <select
                    name="status_kamar"
                    value={form.status_kamar}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none mt-1"
                  >
                    <option value="Tersedia">Tersedia</option>
                    <option value="Terisi">Terisi</option>
                    <option value="Perawatan">Perawatan</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Catatan (opsional)
                  </label>
                  <textarea
                    name="catatan"
                    value={form.catatan}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none mt-1"
                    rows={3}
                  />
                </div>

                <div className="flex gap-2 mt-5">
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      setEditingKamar(null);
                      setForm({
                        kode_kamar: '',
                        id_kos: '',
                        id_jenis_kamar: '',
                        status_kamar: 'Tersedia',
                        catatan: '',
                      });
                    }}
                    className="flex-1 border border-gray-300 rounded-lg py-2 text-gray-700 hover:bg-gray-50 transition"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-700 transition"
                  >
                    Simpan
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* === MODAL DELETE CONFIRMATION === */}
      <AnimatePresence>
        {showDeleteModal && selectedKamar && (
          <motion.div
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-xl shadow-xl w-full max-w-sm p-6 text-center"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
            >
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                Konfirmasi Hapus
              </h2>
              <p className="text-sm text-gray-600 mb-5">
                Apakah Anda yakin ingin menghapus kamar{' '}
                <b>{selectedKamar.kode}</b>?
              </p>

              <div className="flex justify-center gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                >
                  Batal
                </button>
                <button
                  onClick={() => {
                    setData((prev) =>
                      prev.filter((kamar) => kamar.id_kamar !== selectedKamar.id)
                    );
                    setShowDeleteModal(false);
                    alert(`✅ Kamar "${selectedKamar.kode}" telah dihapus.`);
                  }}
                  className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
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
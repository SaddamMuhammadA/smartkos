'use client';

import { useState } from 'react';
import { PlusCircle, Edit, Trash2, Search, Building2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MasterKos {
  id_kos: number;
  nama_kos: string;
  alamat_kos: string;
  jenis_kos: 'Putra' | 'Putri' | 'Campur';
  created_at?: string;
  updated_at?: string;
}

export default function DataMasterKosPage() {
  const [data, setData] = useState<MasterKos[]>([
    {
      id_kos: 1,
      nama_kos: 'SmartKos 1',
      alamat_kos: 'Jl. Merdeka No. 123, Bandung',
      jenis_kos: 'Putra',
      created_at: '2024-01-10 08:00:00',
      updated_at: '2024-01-10 08:00:00',
    },
    {
      id_kos: 2,
      nama_kos: 'SmartKos 2',
      alamat_kos: 'Jl. Sudirman No. 456, Bandung',
      jenis_kos: 'Putri',
      created_at: '2024-01-11 09:00:00',
      updated_at: '2024-01-11 09:00:00',
    },
    {
      id_kos: 3,
      nama_kos: 'SmartKos 3',
      alamat_kos: 'Jl. Gatot Subroto No. 789, Bandung',
      jenis_kos: 'Campur',
      created_at: '2024-01-12 10:00:00',
      updated_at: '2024-01-12 10:00:00',
    },
  ]);

  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingKos, setEditingKos] = useState<MasterKos | null>(null);
  const [form, setForm] = useState({
    nama_kos: '',
    alamat_kos: '',
    jenis_kos: 'Campur' as 'Putra' | 'Putri' | 'Campur',
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedKos, setSelectedKos] = useState<{
    id: number;
    nama: string;
  } | null>(null);

  const filteredData = data.filter((item) =>
    item.nama_kos.toLowerCase().includes(search.toLowerCase()) ||
    item.alamat_kos.toLowerCase().includes(search.toLowerCase())
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const now = new Date().toISOString().slice(0, 19).replace('T', ' ');

    if (editingKos) {
      // Update
      setData((prev) =>
        prev.map((item) =>
          item.id_kos === editingKos.id_kos
            ? {
                ...item,
                nama_kos: form.nama_kos,
                alamat_kos: form.alamat_kos,
                jenis_kos: form.jenis_kos,
                updated_at: now,
              }
            : item
        )
      );
    } else {
      // Tambah baru
      const newKos: MasterKos = {
        id_kos: Date.now(),
        nama_kos: form.nama_kos,
        alamat_kos: form.alamat_kos,
        jenis_kos: form.jenis_kos,
        created_at: now,
        updated_at: now,
      };
      setData([...data, newKos]);
    }

    setShowModal(false);
    setEditingKos(null);
    setForm({
      nama_kos: '',
      alamat_kos: '',
      jenis_kos: 'Campur',
    });
  };

  const handleEdit = (item: MasterKos) => {
    setEditingKos(item);
    setForm({
      nama_kos: item.nama_kos,
      alamat_kos: item.alamat_kos,
      jenis_kos: item.jenis_kos,
    });
    setShowModal(true);
  };

  const formatDateTime = (dateString?: string) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleString('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getJenisKosColor = (jenis: string) => {
    switch (jenis) {
      case 'Putra':
        return 'bg-blue-100 text-blue-700';
      case 'Putri':
        return 'bg-pink-100 text-pink-700';
      case 'Campur':
        return 'bg-purple-100 text-purple-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="p-4 sm:p-6 bg-[#f8fafc] min-h-screen text-slate-800">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold mb-1">Data Master Kos</h1>
          <p className="text-sm text-gray-500">
            Kelola data properti kos yang terdaftar di sistem SmartKos.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition w-full md:w-auto"
        >
          <PlusCircle size={18} /> Tambah Properti Kos
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
          placeholder="Cari nama atau alamat kos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-gray-300 rounded-lg pl-9 pr-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      {/* MOBILE CARD VIEW */}
      <div className="block lg:hidden space-y-3">
        {filteredData.map((item) => (
          <div
            key={item.id_kos}
            className="bg-white border border-gray-200 rounded-xl shadow-sm p-4"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-start gap-2">
                <Building2 size={20} className="text-blue-600 mt-0.5" />
                <div>
                  <h3 className="font-bold text-lg">{item.nama_kos}</h3>
                  <p className="text-xs text-gray-500">ID: {item.id_kos}</p>
                </div>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${getJenisKosColor(
                  item.jenis_kos
                )}`}
              >
                {item.jenis_kos}
              </span>
            </div>

            <div className="space-y-2 mb-4">
              <div className="text-sm">
                <span className="text-gray-600">Alamat:</span>
                <p className="text-gray-800 mt-1">{item.alamat_kos}</p>
              </div>
              <div className="text-sm pt-2 border-t">
                <span className="text-gray-600">Dibuat:</span>
                <p className="text-gray-800 text-xs mt-1">
                  {formatDateTime(item.created_at)}
                </p>
              </div>
              <div className="text-sm">
                <span className="text-gray-600">Terakhir Update:</span>
                <p className="text-gray-800 text-xs mt-1">
                  {formatDateTime(item.updated_at)}
                </p>
              </div>
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
                  setSelectedKos({
                    id: item.id_kos,
                    nama: item.nama_kos,
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
            Tidak ada data properti kos
          </div>
        )}
      </div>

      {/* DESKTOP TABLE VIEW */}
      <div className="hidden lg:block bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-gray-700">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left font-medium">ID</th>
                <th className="px-4 py-3 text-left font-medium">Nama Kos</th>
                <th className="px-4 py-3 text-left font-medium">Alamat</th>
                <th className="px-4 py-3 text-left font-medium">Jenis Kos</th>
                <th className="px-4 py-3 text-left font-medium">Dibuat</th>
                <th className="px-4 py-3 text-left font-medium">Terakhir Update</th>
                <th className="px-4 py-3 text-center font-medium">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item) => (
                <tr key={item.id_kos} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">{item.id_kos}</td>
                  <td className="px-4 py-3 font-medium">{item.nama_kos}</td>
                  <td className="px-4 py-3 max-w-xs truncate">{item.alamat_kos}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-md text-xs font-medium ${getJenisKosColor(
                        item.jenis_kos
                      )}`}
                    >
                      {item.jenis_kos}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-600">
                    {formatDateTime(item.created_at)}
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-600">
                    {formatDateTime(item.updated_at)}
                  </td>
                  <td className="px-4 py-3 text-center flex justify-center gap-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="px-3 py-1.5 text-xs bg-amber-100 text-amber-700 rounded-md hover:bg-amber-200 transition"
                    >
                      <Edit size={14} />
                    </button>

                    <button
                      onClick={() => {
                        setSelectedKos({
                          id: item.id_kos,
                          nama: item.nama_kos,
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
                    colSpan={7}
                    className="px-4 py-6 text-center text-gray-400 italic"
                  >
                    Tidak ada data properti kos
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* === MODAL TAMBAH / EDIT KOS === */}
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
                {editingKos ? 'Edit Properti Kos' : 'Tambah Properti Kos Baru'}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Nama Kos
                  </label>
                  <input
                    type="text"
                    name="nama_kos"
                    value={form.nama_kos}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none mt-1"
                    placeholder="Contoh: SmartKos 1"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Alamat Kos
                  </label>
                  <textarea
                    name="alamat_kos"
                    value={form.alamat_kos}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none mt-1"
                    placeholder="Masukkan alamat lengkap kos"
                    rows={3}
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Jenis Kos
                  </label>
                  <select
                    name="jenis_kos"
                    value={form.jenis_kos}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none mt-1"
                    required
                  >
                    <option value="Putra">Putra</option>
                    <option value="Putri">Putri</option>
                    <option value="Campur">Campur</option>
                  </select>
                  <p className="text-xs text-gray-500 mt-1">
                    Pilih jenis kos: Putra, Putri, atau Campur
                  </p>
                </div>

                <div className="flex gap-2 mt-5">
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      setEditingKos(null);
                      setForm({
                        nama_kos: '',
                        alamat_kos: '',
                        jenis_kos: 'Campur',
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
        {showDeleteModal && selectedKos && (
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
                Apakah Anda yakin ingin menghapus properti kos{' '}
                <b>{selectedKos.nama}</b>?
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
                      prev.filter((item) => item.id_kos !== selectedKos.id)
                    );
                    setShowDeleteModal(false);
                    alert(`✅ Properti kos "${selectedKos.nama}" telah dihapus.`);
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
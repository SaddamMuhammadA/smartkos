'use client';

import { useState } from 'react';
import { PlusCircle, Edit, Trash2, Search, Car, Bike } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MasterKos {
  id_kos: number;
  nama_kos: string;
}

interface Parkiran {
  id_kendaraan: number;
  id_kos: number;
  jenis_kendaraan: 'Mobil' | 'Motor';
  biaya_tambahan: number;
  kapasitas: number | null;
  created_at?: string;
  updated_at?: string;
}

// Data Master Kos (nanti bisa dari API)
const masterKosData: MasterKos[] = [
  { id_kos: 1, nama_kos: 'SmartKos 1' },
  { id_kos: 2, nama_kos: 'SmartKos 2' },
  { id_kos: 3, nama_kos: 'SmartKos 3' },
];

export default function DataParkirPage() {
  const [data, setData] = useState<Parkiran[]>([
    {
      id_kendaraan: 1,
      id_kos: 1,
      jenis_kendaraan: 'Motor',
      biaya_tambahan: 50000,
      kapasitas: 20,
      created_at: '2024-01-10 08:00:00',
      updated_at: '2024-01-10 08:00:00',
    },
    {
      id_kendaraan: 2,
      id_kos: 1,
      jenis_kendaraan: 'Mobil',
      biaya_tambahan: 150000,
      kapasitas: 10,
      created_at: '2024-01-11 09:00:00',
      updated_at: '2024-01-11 09:00:00',
    },
    {
      id_kendaraan: 3,
      id_kos: 2,
      jenis_kendaraan: 'Motor',
      biaya_tambahan: 75000,
      kapasitas: 15,
      created_at: '2024-01-12 10:00:00',
      updated_at: '2024-01-12 10:00:00',
    },
  ]);

  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingParkir, setEditingParkir] = useState<Parkiran | null>(null);
  const [form, setForm] = useState({
    id_kos: '',
    jenis_kendaraan: 'Motor' as 'Mobil' | 'Motor',
    biaya_tambahan: '',
    kapasitas: '',
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedParkir, setSelectedParkir] = useState<{
    id: number;
    jenis: string;
  } | null>(null);

  const filteredData = data.filter((item) =>
    item.jenis_kendaraan.toLowerCase().includes(search.toLowerCase()) ||
    getNamaKos(item.id_kos).toLowerCase().includes(search.toLowerCase())
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const now = new Date().toISOString().slice(0, 19).replace('T', ' ');

    if (editingParkir) {
      // Update
      setData((prev) =>
        prev.map((item) =>
          item.id_kendaraan === editingParkir.id_kendaraan
            ? {
                ...item,
                id_kos: Number(form.id_kos),
                jenis_kendaraan: form.jenis_kendaraan,
                biaya_tambahan: Number(form.biaya_tambahan),
                kapasitas: form.kapasitas ? Number(form.kapasitas) : null,
                updated_at: now,
              }
            : item
        )
      );
    } else {
      // Tambah baru
      const newParkir: Parkiran = {
        id_kendaraan: Date.now(),
        id_kos: Number(form.id_kos),
        jenis_kendaraan: form.jenis_kendaraan,
        biaya_tambahan: Number(form.biaya_tambahan),
        kapasitas: form.kapasitas ? Number(form.kapasitas) : null,
        created_at: now,
        updated_at: now,
      };
      setData([...data, newParkir]);
    }

    setShowModal(false);
    setEditingParkir(null);
    setForm({
      id_kos: '',
      jenis_kendaraan: 'Motor',
      biaya_tambahan: '',
      kapasitas: '',
    });
  };

  const handleEdit = (item: Parkiran) => {
    setEditingParkir(item);
    setForm({
      id_kos: item.id_kos.toString(),
      jenis_kendaraan: item.jenis_kendaraan,
      biaya_tambahan: item.biaya_tambahan.toString(),
      kapasitas: item.kapasitas?.toString() || '',
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

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getJenisKendaraanColor = (jenis: string) => {
    switch (jenis) {
      case 'Mobil':
        return 'bg-blue-100 text-blue-700';
      case 'Motor':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getJenisIcon = (jenis: string) => {
    return jenis === 'Mobil' ? <Car size={18} /> : <Bike size={18} />;
  };

  // Helper untuk mendapatkan nama kos berdasarkan id_kos
  const getNamaKos = (id_kos: number) => {
    const kos = masterKosData.find((item) => item.id_kos === id_kos);
    return kos ? kos.nama_kos : '-';
  };

  return (
    <div className="p-4 sm:p-6 bg-[#f8fafc] min-h-screen text-slate-800">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold mb-1">Data Parkir</h1>
          <p className="text-sm text-gray-500">
            Kelola data fasilitas parkir untuk properti kos di sistem SmartKos.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition w-full md:w-auto"
        >
          <PlusCircle size={18} /> Tambah Data Parkir
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
          placeholder="Cari nama kos atau jenis kendaraan..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-gray-300 rounded-lg pl-9 pr-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      {/* MOBILE CARD VIEW */}
      <div className="block lg:hidden space-y-3">
        {filteredData.map((item) => (
          <div
            key={item.id_kendaraan}
            className="bg-white border border-gray-200 rounded-xl shadow-sm p-4"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-start gap-2">
                <div className="mt-0.5">
                  {getJenisIcon(item.jenis_kendaraan)}
                </div>
                <div>
                  <h3 className="font-bold text-lg">{item.jenis_kendaraan}</h3>
                  <p className="text-xs text-gray-500">ID: {item.id_kendaraan}</p>
                </div>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${getJenisKendaraanColor(
                  item.jenis_kendaraan
                )}`}
              >
                {item.jenis_kendaraan}
              </span>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Nama Kos:</span>
                <span className="font-medium">{getNamaKos(item.id_kos)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Biaya Tambahan:</span>
                <span className="font-bold text-green-600">
                  {formatRupiah(item.biaya_tambahan)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Kapasitas:</span>
                <span className="font-medium">
                  {item.kapasitas ? `${item.kapasitas} unit` : '-'}
                </span>
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
                  setSelectedParkir({
                    id: item.id_kendaraan,
                    jenis: item.jenis_kendaraan,
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
            Tidak ada data parkir
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
                <th className="px-4 py-3 text-left font-medium">Jenis Kendaraan</th>
                <th className="px-4 py-3 text-left font-medium">Biaya Tambahan</th>
                <th className="px-4 py-3 text-left font-medium">Kapasitas</th>
                <th className="px-4 py-3 text-left font-medium">Dibuat</th>
                <th className="px-4 py-3 text-left font-medium">Terakhir Update</th>
                <th className="px-4 py-3 text-center font-medium">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item) => (
                <tr key={item.id_kendaraan} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">{item.id_kendaraan}</td>
                  <td className="px-4 py-3 font-medium">{getNamaKos(item.id_kos)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {getJenisIcon(item.jenis_kendaraan)}
                      <span
                        className={`px-2 py-1 rounded-md text-xs font-medium ${getJenisKendaraanColor(
                          item.jenis_kendaraan
                        )}`}
                      >
                        {item.jenis_kendaraan}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-bold text-green-600">
                    {formatRupiah(item.biaya_tambahan)}
                  </td>
                  <td className="px-4 py-3">
                    {item.kapasitas ? `${item.kapasitas} unit` : '-'}
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
                        setSelectedParkir({
                          id: item.id_kendaraan,
                          jenis: item.jenis_kendaraan,
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
                    colSpan={8}
                    className="px-4 py-6 text-center text-gray-400 italic"
                  >
                    Tidak ada data parkir
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* === MODAL TAMBAH / EDIT PARKIR === */}
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
                {editingParkir ? 'Edit Data Parkir' : 'Tambah Data Parkir Baru'}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Nama Kos
                  </label>
                  <select
                    name="id_kos"
                    value={form.id_kos}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none mt-1"
                    required
                  >
                    <option value="">-- Pilih Nama Kos --</option>
                    {masterKosData.map((kos) => (
                      <option key={kos.id_kos} value={kos.id_kos}>
                        {kos.nama_kos}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500 mt-1">
                    Pilih properti kos untuk fasilitas parkir ini
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Jenis Kendaraan
                  </label>
                  <select
                    name="jenis_kendaraan"
                    value={form.jenis_kendaraan}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none mt-1"
                    required
                  >
                    <option value="Motor">Motor</option>
                    <option value="Mobil">Mobil</option>
                  </select>
                  <p className="text-xs text-gray-500 mt-1">
                    Pilih jenis kendaraan: Motor atau Mobil
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Biaya Tambahan (Rp)
                  </label>
                  <input
                    type="number"
                    name="biaya_tambahan"
                    value={form.biaya_tambahan}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none mt-1"
                    placeholder="Contoh: 50000"
                    min="0"
                    step="1000"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Biaya parkir per bulan dalam Rupiah
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Kapasitas (opsional)
                  </label>
                  <input
                    type="number"
                    name="kapasitas"
                    value={form.kapasitas}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none mt-1"
                    placeholder="Contoh: 20"
                    min="0"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Jumlah slot parkir yang tersedia
                  </p>
                </div>

                <div className="flex gap-2 mt-5">
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      setEditingParkir(null);
                      setForm({
                        id_kos: '',
                        jenis_kendaraan: 'Motor',
                        biaya_tambahan: '',
                        kapasitas: '',
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
        {showDeleteModal && selectedParkir && (
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
                Apakah Anda yakin ingin menghapus data parkir{' '}
                <b>{selectedParkir.jenis}</b>?
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
                      prev.filter((item) => item.id_kendaraan !== selectedParkir.id)
                    );
                    setShowDeleteModal(false);
                    alert(`✅ Data parkir "${selectedParkir.jenis}" telah dihapus.`);
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
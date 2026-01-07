'use client';

import { useState, useMemo } from 'react';
import { PlusCircle, Edit, Trash2, Search, DollarSign } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MasterKos {
  id_kos: number;
  nama_kos: string;
}

interface JenisKamar {
  id_jenis_kamar: number;
  id_kos: number;
  nama_jenis_kamar: string;
}

interface Pricing {
  id_pricing: number;
  id_kos: number;
  id_jenis_kamar: number;
  lama_tinggal: 'Harian' | 'Mingguan' | 'Bulanan' | 'Tahunan';
  harga: number;
  deskripsi?: string;
  created_at?: string;
  updated_at?: string;
}

// Data Master Kos (nanti dari API)
const masterKosData: MasterKos[] = [
  { id_kos: 1, nama_kos: 'SmartKos 1' },
  { id_kos: 2, nama_kos: 'SmartKos 2' },
  { id_kos: 3, nama_kos: 'SmartKos 3' },
];

// Data Jenis Kamar (nanti dari API)
const jenisKamarData: JenisKamar[] = [
  { id_jenis_kamar: 1, id_kos: 1, nama_jenis_kamar: 'Deluxe' },
  { id_jenis_kamar: 2, id_kos: 1, nama_jenis_kamar: 'Standard' },
  { id_jenis_kamar: 3, id_kos: 1, nama_jenis_kamar: 'VIP' },
  { id_jenis_kamar: 4, id_kos: 2, nama_jenis_kamar: 'Deluxe' },
  { id_jenis_kamar: 5, id_kos: 2, nama_jenis_kamar: 'Standard' },
  { id_jenis_kamar: 6, id_kos: 2, nama_jenis_kamar: 'VIP' },
];

export default function DataHargaPage() {
  const [data, setData] = useState<Pricing[]>([
    {
      id_pricing: 1,
      id_kos: 1,
      id_jenis_kamar: 1,
      lama_tinggal: 'Bulanan',
      harga: 1500000,
      deskripsi: 'Harga standar untuk kamar Deluxe per bulan',
      created_at: '2024-01-10 08:00:00',
      updated_at: '2024-01-10 08:00:00',
    },
    {
      id_pricing: 2,
      id_kos: 1,
      id_jenis_kamar: 1,
      lama_tinggal: 'Tahunan',
      harga: 15000000,
      deskripsi: 'Harga diskon untuk kontrak tahunan',
      created_at: '2024-01-10 08:05:00',
      updated_at: '2024-01-10 08:05:00',
    },
    {
      id_pricing: 3,
      id_kos: 1,
      id_jenis_kamar: 2,
      lama_tinggal: 'Bulanan',
      harga: 1200000,
      deskripsi: '',
      created_at: '2024-01-10 08:10:00',
      updated_at: '2024-01-10 08:10:00',
    },
    {
      id_pricing: 4,
      id_kos: 2,
      id_jenis_kamar: 4,
      lama_tinggal: 'Harian',
      harga: 80000,
      deskripsi: 'Harga untuk penyewa harian',
      created_at: '2024-01-11 09:00:00',
      updated_at: '2024-01-11 09:00:00',
    },
  ]);

  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingHarga, setEditingHarga] = useState<Pricing | null>(null);
  const [form, setForm] = useState({
    id_kos: '',
    id_jenis_kamar: '',
    lama_tinggal: 'Bulanan' as 'Harian' | 'Mingguan' | 'Bulanan' | 'Tahunan',
    harga: '',
    deskripsi: '',
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedHarga, setSelectedHarga] = useState<{
    id: number;
    info: string;
  } | null>(null);

  // Helper untuk mendapatkan nama kos
  const getNamaKos = (id_kos: number) => {
    const kos = masterKosData.find((item) => item.id_kos === id_kos);
    return kos ? kos.nama_kos : '-';
  };

  // Helper untuk mendapatkan nama jenis kamar
  const getNamaJenisKamar = (id_jenis_kamar: number) => {
    const jenis = jenisKamarData.find(
      (item) => item.id_jenis_kamar === id_jenis_kamar
    );
    return jenis ? jenis.nama_jenis_kamar : '-';
  };

  // Filter jenis kamar berdasarkan kos yang dipilih
  const filteredJenisKamar = useMemo(() => {
    if (!form.id_kos) return [];
    return jenisKamarData.filter(
      (jk) => jk.id_kos === Number(form.id_kos)
    );
  }, [form.id_kos]);

  const filteredData = data.filter((item) => {
    const namaKos = getNamaKos(item.id_kos).toLowerCase();
    const namaJenis = getNamaJenisKamar(item.id_jenis_kamar).toLowerCase();
    const searchLower = search.toLowerCase();
    return namaKos.includes(searchLower) || namaJenis.includes(searchLower);
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    
    // Reset jenis kamar jika kos berubah
    if (name === 'id_kos') {
      setForm({ ...form, [name]: value, id_jenis_kamar: '' });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const now = new Date().toISOString().slice(0, 19).replace('T', ' ');

    if (editingHarga) {
      // Update
      setData((prev) =>
        prev.map((item) =>
          item.id_pricing === editingHarga.id_pricing
            ? {
                ...item,
                id_kos: Number(form.id_kos),
                id_jenis_kamar: Number(form.id_jenis_kamar),
                lama_tinggal: form.lama_tinggal,
                harga: Number(form.harga),
                deskripsi: form.deskripsi,
                updated_at: now,
              }
            : item
        )
      );
    } else {
      // Tambah baru
      const newHarga: Pricing = {
        id_pricing: Date.now(),
        id_kos: Number(form.id_kos),
        id_jenis_kamar: Number(form.id_jenis_kamar),
        lama_tinggal: form.lama_tinggal,
        harga: Number(form.harga),
        deskripsi: form.deskripsi,
        created_at: now,
        updated_at: now,
      };
      setData([...data, newHarga]);
    }

    setShowModal(false);
    setEditingHarga(null);
    setForm({
      id_kos: '',
      id_jenis_kamar: '',
      lama_tinggal: 'Bulanan',
      harga: '',
      deskripsi: '',
    });
  };

  const handleEdit = (item: Pricing) => {
    setEditingHarga(item);
    setForm({
      id_kos: item.id_kos.toString(),
      id_jenis_kamar: item.id_jenis_kamar.toString(),
      lama_tinggal: item.lama_tinggal,
      harga: item.harga.toString(),
      deskripsi: item.deskripsi || '',
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

  const getLamaTinggalColor = (lama: string) => {
    switch (lama) {
      case 'Harian':
        return 'bg-purple-100 text-purple-700';
      case 'Mingguan':
        return 'bg-blue-100 text-blue-700';
      case 'Bulanan':
        return 'bg-green-100 text-green-700';
      case 'Tahunan':
        return 'bg-orange-100 text-orange-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="p-4 sm:p-6 bg-[#f8fafc] min-h-screen text-slate-800">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold mb-1">Data Harga (Pricing)</h1>
          <p className="text-sm text-gray-500">
            Kelola harga sewa untuk setiap jenis kamar di sistem SmartKos.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition w-full md:w-auto"
        >
          <PlusCircle size={18} /> Tambah Harga
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
          placeholder="Cari nama kos atau jenis kamar..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-gray-300 rounded-lg pl-9 pr-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      {/* MOBILE CARD VIEW */}
      <div className="block lg:hidden space-y-3">
        {filteredData.map((item) => (
          <div
            key={item.id_pricing}
            className="bg-white border border-gray-200 rounded-xl shadow-sm p-4"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-start gap-2">
                <DollarSign size={20} className="text-green-600 mt-0.5" />
                <div>
                  <h3 className="font-bold text-lg">{getNamaKos(item.id_kos)}</h3>
                  <p className="text-xs text-gray-500">
                    {getNamaJenisKamar(item.id_jenis_kamar)}
                  </p>
                </div>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${getLamaTinggalColor(
                  item.lama_tinggal
                )}`}
              >
                {item.lama_tinggal}
              </span>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Harga:</span>
                <span className="font-bold text-green-600">
                  {formatRupiah(item.harga)}
                </span>
              </div>
              {item.deskripsi && (
                <div className="text-sm pt-2 border-t">
                  <span className="text-gray-600">Deskripsi:</span>
                  <p className="text-gray-800 mt-1">{item.deskripsi}</p>
                </div>
              )}
              <div className="text-sm pt-2 border-t">
                <span className="text-gray-600">Dibuat:</span>
                <p className="text-gray-800 text-xs mt-1">
                  {formatDateTime(item.created_at)}
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
                  setSelectedHarga({
                    id: item.id_pricing,
                    info: `${getNamaKos(item.id_kos)} - ${getNamaJenisKamar(
                      item.id_jenis_kamar
                    )} (${item.lama_tinggal})`,
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
            Tidak ada data harga
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
                <th className="px-4 py-3 text-left font-medium">Jenis Kamar</th>
                <th className="px-4 py-3 text-left font-medium">Lama Tinggal</th>
                <th className="px-4 py-3 text-left font-medium">Harga</th>
                <th className="px-4 py-3 text-left font-medium">Deskripsi</th>
                <th className="px-4 py-3 text-left font-medium">Dibuat</th>
                <th className="px-4 py-3 text-center font-medium">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item) => (
                <tr key={item.id_pricing} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">{item.id_pricing}</td>
                  <td className="px-4 py-3 font-medium">
                    {getNamaKos(item.id_kos)}
                  </td>
                  <td className="px-4 py-3">
                    {getNamaJenisKamar(item.id_jenis_kamar)}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-md text-xs font-medium ${getLamaTinggalColor(
                        item.lama_tinggal
                      )}`}
                    >
                      {item.lama_tinggal}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-bold text-green-600">
                    {formatRupiah(item.harga)}
                  </td>
                  <td className="px-4 py-3 max-w-xs truncate">
                    {item.deskripsi || '-'}
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-600">
                    {formatDateTime(item.created_at)}
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
                        setSelectedHarga({
                          id: item.id_pricing,
                          info: `${getNamaKos(item.id_kos)} - ${getNamaJenisKamar(
                            item.id_jenis_kamar
                          )} (${item.lama_tinggal})`,
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
                    Tidak ada data harga
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* === MODAL TAMBAH / EDIT HARGA === */}
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
                {editingHarga ? 'Edit Harga' : 'Tambah Harga Baru'}
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
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Jenis Kamar
                  </label>
                  <select
                    name="id_jenis_kamar"
                    value={form.id_jenis_kamar}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none mt-1"
                    required
                    disabled={!form.id_kos}
                  >
                    <option value="">
                      {!form.id_kos
                        ? '-- Pilih Kos Terlebih Dahulu --'
                        : '-- Pilih Jenis Kamar --'}
                    </option>
                    {filteredJenisKamar.map((jenis) => (
                      <option
                        key={jenis.id_jenis_kamar}
                        value={jenis.id_jenis_kamar}
                      >
                        {jenis.nama_jenis_kamar}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500 mt-1">
                    Jenis kamar akan muncul setelah memilih kos
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Lama Tinggal
                  </label>
                  <select
                    name="lama_tinggal"
                    value={form.lama_tinggal}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none mt-1"
                    required
                  >
                    <option value="Harian">Harian</option>
                    <option value="Mingguan">Mingguan</option>
                    <option value="Bulanan">Bulanan</option>
                    <option value="Tahunan">Tahunan</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Harga (Rp)
                  </label>
                  <input
                    type="number"
                    name="harga"
                    value={form.harga}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none mt-1"
                    placeholder="Contoh: 1500000"
                    min="0"
                    step="1000"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Harga sewa sesuai durasi yang dipilih
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Deskripsi (opsional)
                  </label>
                  <textarea
                    name="deskripsi"
                    value={form.deskripsi}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none mt-1"
                    placeholder="Catatan atau deskripsi harga"
                    rows={3}
                  />
                </div>

                <div className="flex gap-2 mt-5">
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      setEditingHarga(null);
                      setForm({
                        id_kos: '',
                        id_jenis_kamar: '',
                        lama_tinggal: 'Bulanan',
                        harga: '',
                        deskripsi: '',
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
        {showDeleteModal && selectedHarga && (
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
                Apakah Anda yakin ingin menghapus harga{' '}
                <b>{selectedHarga.info}</b>?
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
                      prev.filter((item) => item.id_pricing !== selectedHarga.id)
                    );
                    setShowDeleteModal(false);
                    alert(`✅ Harga "${selectedHarga.info}" telah dihapus.`);
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
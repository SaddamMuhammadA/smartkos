'use client';

import { useState } from 'react';
import { PlusCircle, Edit, Trash2, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Customer {
  id: number;
  nama: string;
  telp: string;
  fotoKtp?: string;
}

export default function DaftarCustomerPage() {
  const [data, setData] = useState<Customer[]>([
    { id: 1, nama: 'Saddam Muhammad', telp: '08123456789', fotoKtp: '/ktp/dummy1.png' },
    { id: 2, nama: 'Rizky Alamsyah', telp: '08567890123', fotoKtp: '/ktp/dummy2.png' },
    { id: 3, nama: 'Dimas Adi', telp: '08234567890', fotoKtp: '/ktp/dummy3.png' },
  ]);

  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [form, setForm] = useState({ nama: '', telp: '', fotoKtp: '' });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<{ id: number; nama: string } | null>(null);


  const filteredData = data.filter((item) =>
    item.nama.toLowerCase().includes(search.toLowerCase())
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setForm({ ...form, fotoKtp: url });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCustomer) {
      // Update
      setData((prev) =>
        prev.map((c) => (c.id === editingCustomer.id ? { ...c, ...form } : c))
      );
    } else {
      // Tambah baru
      const newCustomer: Customer = {
        id: data.length + 1,
        nama: form.nama,
        telp: form.telp,
        fotoKtp: form.fotoKtp,
      };
      setData([...data, newCustomer]);
    }

    setShowModal(false);
    setEditingCustomer(null);
    setForm({ nama: '', telp: '', fotoKtp: '' });
  };

  const handleEdit = (item: Customer) => {
    setEditingCustomer(item);
    setForm({
      nama: item.nama,
      telp: item.telp,
      fotoKtp: item.fotoKtp || '',
    });
    setShowModal(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Yakin ingin menghapus customer ini?')) {
      setData(data.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="p-6 bg-[#f8fafc] min-h-screen text-slate-800">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-3">
        <div>
          <h1 className="text-2xl font-bold mb-1">Daftar Customer</h1>
          <p className="text-sm text-gray-500">
            Kelola data pelanggan kos yang terdaftar di sistem SmartKos.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          <PlusCircle size={18} /> Tambah Customer
        </button>
      </div>

      {/* SEARCH BAR */}
      <div className="relative mb-4 max-w-md">
        <Search
          size={16}
          className="absolute left-3 top-2.5 text-gray-400 pointer-events-none"
        />
        <input
          type="text"
          placeholder="Cari nama customer..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-gray-300 rounded-lg pl-9 pr-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      {/* TABLE */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-gray-700">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left font-medium">Nama</th>
                <th className="px-4 py-3 text-left font-medium">No. Telepon</th>
                <th className="px-4 py-3 text-left font-medium">Foto KTP</th>
                <th className="px-4 py-3 text-center font-medium">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item) => (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">{item.nama}</td>
                  <td className="px-4 py-3">{item.telp}</td>
                  <td className="px-4 py-3">
                    {item.fotoKtp ? (
                      <img
                        src={item.fotoKtp}
                        alt="KTP"
                        className="w-14 h-10 object-cover rounded border"
                      />
                    ) : (
                      <span className="text-gray-400 italic">Tidak ada</span>
                    )}
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
                        setSelectedCustomer({ id: item.id, nama: item.nama });
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
                    colSpan={4}
                    className="px-4 py-6 text-center text-gray-400 italic"
                  >
                    Tidak ada data customer
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* === MODAL TAMBAH / EDIT CUSTOMER === */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-xl shadow-lg w-full max-w-md p-5"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                {editingCustomer ? 'Edit Customer' : 'Tambah Customer Baru'}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Nama</label>
                  <input
                    type="text"
                    name="nama"
                    value={form.nama}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    No. Telepon
                  </label>
                  <input
                    type="text"
                    name="telp"
                    value={form.telp}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    required
                  />
                </div>

                <div>
                <label className="text-sm font-medium text-gray-700">Foto KTP (opsional)</label>

                <div className="mt-1 flex flex-col items-start">
                    {/* Tombol Upload */}
                    <label
                    htmlFor="fotoKtp"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 border border-gray-300 text-gray-700 text-sm rounded-lg cursor-pointer hover:bg-gray-200 transition"
                    >
                    📷 Pilih Foto KTP
                    </label>

                    <input
                    id="fotoKtp"
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    />

                    {/* Preview Foto */}
                    {form.fotoKtp && (
                    <div className="mt-3">
                        <img
                        src={form.fotoKtp}
                        alt="Preview KTP"
                        className="w-28 h-20 object-cover rounded border shadow-sm"
                        />
                    </div>
                    )}
                </div>
                </div>

                <div className="flex gap-2 mt-5">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
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

      <AnimatePresence>
  {showDeleteModal && selectedCustomer && (
    <motion.div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
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
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Konfirmasi Hapus</h2>
        <p className="text-sm text-gray-600 mb-5">
          Apakah Anda yakin ingin menghapus customer <b>{selectedCustomer.nama}</b>?
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
                prev.filter((cust) => cust.id !== selectedCustomer.id)
              );
              setShowDeleteModal(false);
              alert(`✅ Customer "${selectedCustomer.nama}" telah dihapus.`);
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

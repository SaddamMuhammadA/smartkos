'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Search, Plus, Image as ImageIcon } from 'lucide-react';

interface ModalCustomerProps {
  show: boolean;
  onClose: () => void;
  filteredCustomer: { id: number; nama: string; telp: string; fotoKtp?: string }[];
  searchCustomer: string;
  setSearchCustomer: (val: string) => void;
  handleSelectCustomer: (nama: string) => void;
  handleAddCustomer: (nama: string, telp: string, fotoKtp?: string) => void;
}

export default function ModalPilihCustomer({
  show,
  onClose,
  filteredCustomer,
  searchCustomer,
  setSearchCustomer,
  handleSelectCustomer,
  handleAddCustomer,
}: ModalCustomerProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newNama, setNewNama] = useState('');
  const [newTelp, setNewTelp] = useState('');
  const [fotoKtp, setFotoKtp] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFotoKtp(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitNewCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNama.trim() || !newTelp.trim()) {
      alert('Isi nama dan nomor telepon dengan benar.');
      return;
    }
    handleAddCustomer(newNama, newTelp, fotoKtp || undefined);
    setNewNama('');
    setNewTelp('');
    setFotoKtp(null);
    setShowAddForm(false);
  };

  return (
    <AnimatePresence>
      {show && (
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
            {/* HEADER */}
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <User size={18} /> Pilih Customer
              </h3>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 text-sm"
              >
                ✕
              </button>
            </div>

            {/* SEARCH BAR */}
            <div className="relative mb-3">
              <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
              <input
                type="text"
                placeholder="Cari nama customer..."
                value={searchCustomer}
                onChange={(e) => setSearchCustomer(e.target.value)}
                className="w-full border rounded-lg pl-9 pr-3 py-2 text-sm border-gray-300 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* TOMBOL TAMBAH CUSTOMER */}
            <button
              type="button"
              onClick={() => setShowAddForm(!showAddForm)}
              className="w-full flex items-center justify-center gap-2 bg-blue-50 text-blue-700 border border-blue-100 px-3 py-2 rounded-lg text-sm mb-3 hover:bg-blue-100 transition"
            >
              <Plus size={16} /> Tambah Customer Baru
            </button>

            {/* FORM TAMBAH CUSTOMER */}
            <AnimatePresence>
              {showAddForm && (
                <motion.form
                  onSubmit={handleSubmitNewCustomer}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="border rounded-lg p-3 mb-3 bg-gray-50 space-y-3"
                >
                  <div>
                    <label className="text-xs text-gray-500">Nama Customer</label>
                    <input
                      type="text"
                      value={newNama}
                      onChange={(e) => setNewNama(e.target.value)}
                      className="w-full border rounded-lg px-3 py-2 text-sm border-gray-300 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">No. Telepon</label>
                    <input
                      type="text"
                      value={newTelp}
                      onChange={(e) => setNewTelp(e.target.value)}
                      className="w-full border rounded-lg px-3 py-2 text-sm border-gray-300 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">Foto KTP (opsional)</label>
                    <div className="flex items-center gap-3">
                      <label className="cursor-pointer flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700">
                        <ImageIcon size={16} />
                        <span>Pilih File</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                      </label>
                      {fotoKtp && (
                        <img
                          src={fotoKtp}
                          alt="Preview KTP"
                          className="w-12 h-8 object-cover rounded border"
                        />
                      )}
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setShowAddForm(false)}
                      className="text-xs px-3 py-1.5 border rounded-md text-gray-600 hover:bg-gray-100"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="text-xs px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      Simpan
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>

            {/* DAFTAR CUSTOMER */}
            <div className="max-h-60 overflow-y-auto border rounded-lg">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-gray-600">
                  <tr>
                    <th className="px-3 py-2 text-left">Nama</th>
                    <th className="px-3 py-2 text-left">No. Telp</th>
                    <th className="px-3 py-2 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCustomer.map((c) => (
                    <tr key={c.id} className="border-t hover:bg-gray-50">
                      <td className="px-3 py-2 flex items-center gap-2">
                        {c.fotoKtp && (
                          <img
                            src={c.fotoKtp}
                            alt="KTP"
                            className="w-8 h-6 object-cover rounded border"
                          />
                        )}
                        {c.nama}
                      </td>
                      <td className="px-3 py-2 text-gray-500">{c.telp}</td>
                      <td className="px-3 py-2 text-center">
                        <button
                          onClick={() => handleSelectCustomer(c.nama)}
                          className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition"
                        >
                          Pilih
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredCustomer.length === 0 && (
                    <tr>
                      <td colSpan={3} className="px-3 py-4 text-center text-gray-400">
                        Tidak ada data ditemukan
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

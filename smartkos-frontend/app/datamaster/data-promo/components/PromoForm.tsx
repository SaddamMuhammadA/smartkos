'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { pricingData } from '../data/dummyPricing';

/* =======================
   EXPORT INTERFACE FORM
   ======================= */
export interface PromoFormData {
  id_kos: number;
  id_jenis_kamar: number;
  pricing_id?: number;
  nama_promo: string;
  tipe_promo: 'Persentase' | 'Nominal';
  nilai: number;
  tanggal_mulai: string;
  tanggal_selesai: string;
  status: 'Aktif' | 'Nonaktif';
  deskripsi?: string;
}

/* =======================
   SUPPORT INTERFACES
   ======================= */
interface MasterKos {
  id_kos: number;
  nama_kos: string;
}

interface JenisKamar {
  id_jenis_kamar: number;
  id_kos: number;
  nama_jenis_kamar: string;
}

/* =======================
   PROPS
   ======================= */
interface PromoFormProps {
  show: boolean;
  onClose: () => void;
  onSubmit: (data: PromoFormData) => void;
  editingData?: PromoFormData | null;
  masterKosData: MasterKos[];
  jenisKamarData: JenisKamar[];
}

/* =======================
   COMPONENT
   ======================= */
export default function PromoForm({
  show,
  onClose,
  onSubmit,
  editingData,
  masterKosData,
  jenisKamarData,
}: PromoFormProps) {
  const [form, setForm] = useState<PromoFormData>({
    id_kos: 0,
    id_jenis_kamar: 0,
    pricing_id: undefined,
    nama_promo: '',
    tipe_promo: 'Persentase',
    nilai: 0,
    tanggal_mulai: '',
    tanggal_selesai: '',
    status: 'Aktif',
    deskripsi: '',
  });

  /* =======================
     LOAD EDIT DATA
     ======================= */
  useEffect(() => {
    if (editingData) {
      setForm(editingData);
    }
  }, [editingData]);

  /* =======================
     HELPERS
     ======================= */
  const filteredJenisKamar = jenisKamarData.filter(
    (jk) => jk.id_kos === form.id_kos
  );

  const filteredPricing = pricingData.filter(
    (p) =>
      p.id_kos === form.id_kos &&
      p.id_jenis_kamar === form.id_jenis_kamar
  );

  const hitungHargaAkhir = (harga: number) => {
    if (form.tipe_promo === 'Persentase') {
      return harga - harga * (form.nilai / 100);
    }
    return harga - form.nilai;
  };

  /* =======================
     HANDLERS
     ======================= */
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    if (name === 'id_kos') {
      setForm({
        ...form,
        id_kos: Number(value),
        id_jenis_kamar: 0,
        pricing_id: undefined,
      });
      return;
    }

    if (name === 'id_jenis_kamar') {
      setForm({
        ...form,
        id_jenis_kamar: Number(value),
        pricing_id: undefined,
      });
      return;
    }

    if (name === 'nilai') {
      setForm({ ...form, nilai: Number(value) });
      return;
    }

    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  /* =======================
     RENDER
     ======================= */
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
            className="bg-white rounded-xl shadow-lg w-full max-w-md p-5 max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
          >
            <h3 className="text-lg font-semibold mb-4">
              {editingData ? 'Edit Promo' : 'Tambah Promo'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* KOS */}
              <div>
                <label className="text-sm font-medium">Nama Kos</label>
                <select
                  name="id_kos"
                  value={form.id_kos}
                  onChange={handleChange}
                  required
                  className="w-full mt-1 border rounded-lg px-3 py-2 text-sm"
                >
                  <option value={0}>-- Pilih Kos --</option>
                  {masterKosData.map((k) => (
                    <option key={k.id_kos} value={k.id_kos}>
                      {k.nama_kos}
                    </option>
                  ))}
                </select>
              </div>

              {/* JENIS KAMAR */}
              <div>
                <label className="text-sm font-medium">Jenis Kamar</label>
                <select
                  name="id_jenis_kamar"
                  value={form.id_jenis_kamar}
                  onChange={handleChange}
                  disabled={!form.id_kos}
                  required
                  className="w-full mt-1 border rounded-lg px-3 py-2 text-sm"
                >
                  <option value={0}>
                    {form.id_kos
                      ? '-- Pilih Jenis Kamar --'
                      : '-- Pilih Kos Terlebih Dahulu --'}
                  </option>
                  {filteredJenisKamar.map((jk) => (
                    <option
                      key={jk.id_jenis_kamar}
                      value={jk.id_jenis_kamar}
                    >
                      {jk.nama_jenis_kamar}
                    </option>
                  ))}
                </select>
              </div>

              {/* PRICING */}
              <div>
                <label className="text-sm font-medium">Pricing</label>
                <select
                  value={form.pricing_id ?? ''}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      pricing_id: Number(e.target.value),
                    })
                  }
                  className="w-full mt-1 border rounded-lg px-3 py-2 text-sm"
                >
                  <option value="">-- Pilih Pricing --</option>
                  {filteredPricing.map((p) => (
                    <option key={p.id_pricing} value={p.id_pricing}>
                      {p.lama_tinggal} – Rp {p.harga.toLocaleString()}
                    </option>
                  ))}
                </select>
              </div>

              {/* PREVIEW HARGA */}
              {form.pricing_id && (
                (() => {
                  const pricing = pricingData.find(
                    (p) => p.id_pricing === form.pricing_id
                  );
                  if (!pricing) return null;

                  const akhir = hitungHargaAkhir(pricing.harga);

                  return (
                    <div className="border rounded-lg bg-slate-50 p-3 text-sm space-y-1">
                      <div className="flex justify-between">
                        <span>Harga Normal</span>
                        <span>
                          Rp {pricing.harga.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between text-red-600">
                        <span>Promo</span>
                        <span>
                          {form.tipe_promo === 'Persentase'
                            ? `-${form.nilai}%`
                            : `-Rp ${form.nilai.toLocaleString()}`}
                        </span>
                      </div>
                      <div className="flex justify-between font-bold text-green-600 border-t pt-2">
                        <span>Harga Setelah Promo</span>
                        <span>
                          Rp {Math.max(akhir, 0).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  );
                })()
              )}

              {/* NAMA PROMO */}
              <input
                name="nama_promo"
                value={form.nama_promo}
                onChange={handleChange}
                placeholder="Nama Promo"
                required
                className="w-full border rounded-lg px-3 py-2 text-sm"
              />

              {/* TIPE */}
              <select
                name="tipe_promo"
                value={form.tipe_promo}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 text-sm"
              >
                <option value="Persentase">Persentase (%)</option>
                <option value="Nominal">Nominal (Rp)</option>
              </select>

              {/* NILAI */}
              <input
                type="number"
                name="nilai"
                value={form.nilai}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-3 py-2 text-sm"
              />

              {/* TANGGAL */}
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="date"
                  name="tanggal_mulai"
                  value={form.tanggal_mulai}
                  onChange={handleChange}
                  required
                  className="border rounded-lg px-3 py-2 text-sm"
                />
                <input
                  type="date"
                  name="tanggal_selesai"
                  value={form.tanggal_selesai}
                  onChange={handleChange}
                  required
                  className="border rounded-lg px-3 py-2 text-sm"
                />
              </div>

              {/* STATUS */}
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 text-sm"
              >
                <option value="Aktif">Aktif</option>
                <option value="Nonaktif">Nonaktif</option>
              </select>

              {/* ACTION */}
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 border rounded-lg py-2"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white rounded-lg py-2"
                >
                  Simpan
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

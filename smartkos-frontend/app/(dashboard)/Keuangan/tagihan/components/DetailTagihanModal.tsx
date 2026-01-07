"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Tagihan } from "../data/dummyTagihan";

export default function DetailTagihanModal({
  show,
  onClose,
  data,
  onUpdateStatus,
}: {
  show: boolean;
  onClose: () => void;
  data: Tagihan | null;
  onUpdateStatus: (
    id: number,
    status: "Belum Lunas" | "Lunas" | "Lebih Bayar",
    bukti?: string
  ) => void;
}) {
  const [statusPembayaran, setStatusPembayaran] = useState<
    "Belum Lunas" | "Lunas" | "Lebih Bayar"
  >("Belum Lunas");

  const [bukti, setBukti] = useState<string | null>(null);
  const [originalStatus, setOriginalStatus] = useState<
    "Belum Lunas" | "Lunas" | "Lebih Bayar"
  >("Belum Lunas");

  useEffect(() => {
    if (data) {
      setStatusPembayaran(data.status);
      setOriginalStatus(data.status);
      setBukti(data.buktiBayar || null);
    }
  }, [data]);

  if (!data) return null;

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setBukti(url);
    }
  };

  const handleSave = () => {
    if (!data) return;
    onUpdateStatus(data.id, statusPembayaran, bukti || undefined);
    onClose();
  };

  const statusChanged =
    statusPembayaran !== originalStatus || bukti !== data.buktiBayar;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-0 md:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="
              bg-white w-full h-full md:h-auto md:max-w-xl md:rounded-xl 
              shadow-xl overflow-y-auto
            "
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
          >
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-semibold">Detail Tagihan</h2>
              <button onClick={onClose}>
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="p-4 space-y-3 text-sm">
              <p><b>Customer:</b> {data.customer}</p>
              <p><b>Kamar:</b> {data.kamar}</p>
              <p><b>Periode:</b> {data.tanggalMulai} s/d {data.tanggalSelesai}</p>
              <p><b>Total:</b> Rp {data.totalTagihan.toLocaleString("id-ID")}</p>
              <p><b>Status:</b> <span className="font-medium">{data.status}</span></p>

              {/* Upload Bukti */}
              <div className="mt-3">
                <p className="font-medium mb-1">Bukti Pembayaran</p>

                <label
                  htmlFor="buktiBayar"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-200 transition text-sm"
                >
                  📁 Upload Bukti
                </label>
                <input
                  id="buktiBayar"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleUpload}
                />

                {bukti && (
                  <img
                    src={bukti}
                    className="w-40 mt-3 rounded-lg shadow"
                    alt="Bukti Pembayaran"
                  />
                )}
              </div>

              {/* Dropdown Status — hanya muncul jika ada bukti */}
              {bukti && (
                <div className="mt-4">
                  <label className="font-medium">Status Pembayaran</label>
                  <select
                    value={statusPembayaran}
                    onChange={(e) =>
                      setStatusPembayaran(
                        e.target.value as "Belum Lunas" | "Lunas" | "Lebih Bayar"
                      )
                    }
                    className="w-full border rounded-lg px-3 py-2 mt-1 text-sm"
                  >
                    <option value="Belum Lunas">Belum Lunas</option>
                    <option value="Lunas">Tandai Lunas</option>
                    <option value="Lebih Bayar">Lebih Bayar</option>
                  </select>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t flex justify-end gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 border rounded-lg hover:bg-gray-100"
              >
                Tutup
              </button>

              {statusChanged && (
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Simpan Status
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

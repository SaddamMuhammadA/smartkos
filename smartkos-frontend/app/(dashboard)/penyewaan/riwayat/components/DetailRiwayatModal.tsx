"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { RiwayatSewa } from "../data/dummyRiwayat";

export default function DetailRiwayatModal({
  show,
  onClose,
  data,
}: {
  show: boolean;
  onClose: () => void;
  data: RiwayatSewa | null;
}) {
  if (!data) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ type: "spring", damping: 20 }}
            className="
              bg-white rounded-xl shadow-xl w-full 
              max-w-lg p-6 
              sm:max-w-lg 
              overflow-hidden

              /* MOBILE OPTIMIZED CARD */
              max-h-[85vh] 
              overflow-y-auto
            "
          >
            {/* HEADER */}
            <div className="flex justify-between items-center mb-4 sticky top-0 bg-white pb-2 border-b">
              <h2 className="text-lg font-semibold">Detail Riwayat Penyewa</h2>
              <button onClick={onClose}>
                <X size={22} className="text-gray-600 hover:text-black" />
              </button>
            </div>

            {/* CONTENT */}
            <div className="space-y-2 text-sm leading-relaxed">
              <p><b>Nama:</b> {data.customer}</p>
              <p><b>No. Telp:</b> {data.telp}</p>

              <p><b>Kamar:</b> {data.kamar}</p>
              <p><b>Durasi:</b> {data.durasi}</p>

              <p>
                <b>Periode:</b> {data.tanggalMulai} s/d {data.tanggalSelesai}
              </p>

              <p>
                <b>Total Tagihan:</b>{" "}
                Rp {data.total.toLocaleString("id-ID")}
              </p>

              <p><b>Status Akhir:</b> {data.status}</p>

              {data.fotoKtp && (
                <div className="mt-3">
                  <p className="font-medium mb-1">Foto KTP:</p>
                  <img
                    src={data.fotoKtp}
                    className="w-40 rounded shadow"
                  />
                </div>
              )}
            </div>

            {/* BUTTON */}
            <div className="flex justify-end mt-6">
              <button
                onClick={onClose}
                className="px-4 py-2 border rounded-lg hover:bg-gray-100"
              >
                Tutup
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

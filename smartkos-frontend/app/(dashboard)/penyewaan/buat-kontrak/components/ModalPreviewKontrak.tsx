'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { Printer, Save } from 'lucide-react';

export default function ModalPreviewKontrak({
  show,
  onClose,
  form,
  hitungDurasi,
  totalSewa,
  parkirHarga,
  totalKeseluruhan,
  handleConfirm,
  handleDownloadPDF,
}: any) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6 relative"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.95 }}
          >
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Preview Kontrak
            </h2>
            <div className="text-sm text-gray-700 space-y-2">
              <p><b>Kamar:</b> {form.kamar}</p>
              <p><b>Penghuni:</b> {form.customer}</p>
              <p><b>Periode:</b> {form.tanggalMulai} s/d {form.tanggalSelesai}</p>
              <p><b>Durasi:</b> {hitungDurasi} {form.durasi}</p>
              <p><b>Harga Total:</b> Rp {totalSewa.toLocaleString('id-ID')}</p>
              <p><b>Parkir:</b> {form.parkir || 'Tidak Ada'} ({parkirHarga.toLocaleString('id-ID')})</p>
              <p><b>Deposit:</b> Rp {Number(form.deposit || 0).toLocaleString('id-ID')}</p>
            </div>

            <div className="mt-4 border-t pt-3 flex justify-between font-bold text-gray-900">
              <span>Total Estimasi</span>
              <span>Rp {totalKeseluruhan.toLocaleString('id-ID')}</span>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleDownloadPDF}
                className="flex-1 px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                <Printer size={16} className="inline-block mr-1" /> Cetak / PDF
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                <Save size={16} className="inline-block mr-1" /> Simpan
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

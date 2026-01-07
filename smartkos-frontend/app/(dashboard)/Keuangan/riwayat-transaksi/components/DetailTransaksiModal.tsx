// app/keuangan/riwayat-transaksi/components/DetailTransaksiModal.tsx
'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download } from 'lucide-react';
import { Transaksi } from '../data/dummyTransaksi';

export default function DetailTransaksiModal({
  show,
  onClose,
  data,
}: {
  show: boolean;
  onClose: () => void;
  data: Transaksi | null;
}) {
  useEffect(() => {
    if (show) {
      // disable body scroll on open
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [show]);

  if (!data) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-0 md:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* On mobile, modal is fullscreen; on desktop centered box */}
          <motion.div
            className="bg-white w-full h-full md:h-auto md:max-w-2xl md:rounded-xl shadow-xl overflow-y-auto max-h-screen"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <div>
                <div className="text-sm text-gray-500">{data.trxNo}</div>
                <div className="text-lg font-semibold text-gray-800">{data.customer}</div>
                <div className="text-xs text-gray-500">{data.telp}</div>
              </div>
              <div className="flex items-center gap-2">
                {data.bukti && (
                  <a
                    href={data.bukti}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-2 bg-gray-100 rounded-md text-sm hover:bg-gray-200 transition flex items-center gap-2"
                  >
                    <Download size={14} /> Bukti
                  </a>
                )}
                <button onClick={onClose} className="p-2 rounded-md hover:bg-gray-100">
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="p-4 space-y-3 text-sm">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="text-xs text-gray-500">Kamar</div>
                  <div className="font-medium text-gray-800">{data.kamar}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Periode</div>
                  <div className="font-medium text-gray-800">{data.periode}</div>
                </div>

                <div>
                  <div className="text-xs text-gray-500">Tanggal Transaksi</div>
                  <div className="font-medium text-gray-800">{data.tanggal}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Jumlah</div>
                  <div className="font-medium text-gray-800">Rp {data.jumlah.toLocaleString('id-ID')}</div>
                </div>
              </div>

                <div>
                <div className="text-xs text-gray-500">Status</div>

                <div
                    className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-semibold ${
                    data.status === 'Berhasil'
                        ? 'bg-green-100 text-green-700'
                        : data.status === 'Menunggu'
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                >
                    {data.status}
                </div>
                </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t flex justify-end gap-3">
              <button onClick={onClose} className="px-4 py-2 border rounded-lg hover:bg-gray-100">Tutup</button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

'use client';

import { Eye } from 'lucide-react';

interface RingkasanProps {
  form: any;
  hitungDurasi: number;
  parkirHarga: number;
  totalSewa: number;
  totalKeseluruhan: number;
  handleSubmit: (e: React.FormEvent) => void;
}

export default function RingkasanKontrak({
  form,
  hitungDurasi,
  parkirHarga,
  totalSewa,
  totalKeseluruhan,
  handleSubmit,
}: RingkasanProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 h-fit sticky top-24">
      <h3 className="text-base font-semibold text-gray-800 border-b pb-2 mb-3">
        Ringkasan Kontrak
      </h3>

      <ul className="text-sm text-gray-600 space-y-1">
        <li><b>Kamar:</b> {form.kamar || '-'}</li>
        <li><b>Penghuni:</b> {form.customer || '-'}</li>
        <li><b>Durasi:</b> {hitungDurasi} {form.durasi}</li>
        <li>
          <b>Periode:</b>{' '}
          {form.tanggalMulai && form.tanggalSelesai
            ? `${form.tanggalMulai} s/d ${form.tanggalSelesai}`
            : '-'}
        </li>
        <li>
          <b>Harga:</b>{' '}
          {form.harga
            ? `Rp ${Number(form.harga).toLocaleString('id-ID')} × ${hitungDurasi}`
            : '-'}
        </li>
        <li><b>Parkir:</b> {form.parkir || '-'}</li>
        <li>
          <b>Deposit:</b>{' '}
          {form.deposit ? `Rp ${Number(form.deposit).toLocaleString('id-ID')}` : '-'}
        </li>
      </ul>

      <div className="mt-4 border-t pt-3 text-gray-900 space-y-1">
        <div className="flex justify-between text-sm">
          <span>Total Sewa</span>
          <span className="font-semibold">Rp {totalSewa.toLocaleString('id-ID')}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Parkir</span>
          <span className="font-semibold">Rp {parkirHarga.toLocaleString('id-ID')}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Deposit</span>
          <span className="font-semibold">
            Rp {Number(form.deposit || 0).toLocaleString('id-ID')}
          </span>
        </div>
        <div className="flex justify-between text-base font-bold border-t pt-2">
          <span>Total Estimasi</span>
          <span>Rp {totalKeseluruhan.toLocaleString('id-ID')}</span>
        </div>
      </div>

      <div className="flex gap-3 mt-6">
        <button
          onClick={handleSubmit}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
        >
          <Eye size={16} /> Preview
        </button>
      </div>
    </div>
  );
}

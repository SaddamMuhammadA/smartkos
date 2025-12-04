// app/keuangan/riwayat-transaksi/page.tsx
'use client';

import React, { useMemo, useState } from 'react';
import FilterTransaksi from './components/FilterTransaksi';
import TransaksiTable from './components/TransaksiTable';
import DetailTransaksiModal from './components/DetailTransaksiModal';
import { transaksiDummy, Transaksi } from './data/dummyTransaksi';
import { Printer } from 'lucide-react';
import jsPDF from 'jspdf';

export default function RiwayatTransaksiPage() {
  const [list] = useState<Transaksi[]>(transaksiDummy);
  const [search, setSearch] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [status, setStatus] = useState('');
  const [selected, setSelected] = useState<Transaksi | null>(null);
  const [showDetail, setShowDetail] = useState(false);

  const filtered = useMemo(() => {
    return list.filter((t) => {
      const q = search.trim().toLowerCase();
      const matchQ =
        !q ||
        t.customer.toLowerCase().includes(q) ||
        t.trxNo.toLowerCase().includes(q) ||
        t.kamar.toLowerCase().includes(q);
      const matchStatus = !status || t.status === status;
      const matchFrom = !from || t.tanggal >= from;
      const matchTo = !to || t.tanggal <= to;
      return matchQ && matchStatus && matchFrom && matchTo;
    });
  }, [list, search, status, from, to]);

  const openDetail = (t: Transaksi) => {
    setSelected(t);
    setShowDetail(true);
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text('Riwayat Transaksi - SmartKos', 15, 20);
    let y = 30;
    filtered.slice(0, 40).forEach((t) => {
      doc.setFontSize(10);
      doc.text(`${t.trxNo} — ${t.customer} — Rp ${t.jumlah.toLocaleString('id-ID')}`, 15, y);
      y += 8;
    });
    doc.save('riwayat_transaksi.pdf');
  };

  return (
    <div className="p-4 md:p-6 bg-[#f8fafc] min-h-screen text-slate-800">
      <div className="mb-6 flex flex-col md:flex-row md:items-start md:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold mb-1">Riwayat Transaksi</h1>
          <p className="text-sm text-gray-500">
            Rekap pembayaran penyewa (Pembayaran Sewa).
          </p>
        </div>

       <div className="flex items-center md:justify-end gap-2 w-full md:w-auto">
          <button className="w-full md:w-auto px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center justify-center gap-2 text-sm">
            <Printer size={14} /> Export PDF
          </button>
        </div>
      </div>

      <FilterTransaksi
        search={search}
        setSearch={setSearch}
        from={from}
        setFrom={setFrom}
        to={to}
        setTo={setTo}
        status={status}
        setStatus={setStatus}
      />

      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex gap-3">
          <div className="bg-white border rounded-lg px-4 py-2 text-sm shadow-sm text-gray-700">Total Transaksi: <b>{list.length}</b></div>
          <div className="bg-white border rounded-lg px-4 py-2 text-sm shadow-sm text-gray-700">Berhasil: <b>{list.filter(l => l.status === 'Berhasil').length}</b></div>
        </div>
      </div>

      <TransaksiTable data={filtered} onDetail={openDetail} />

      <DetailTransaksiModal show={showDetail} onClose={() => setShowDetail(false)} data={selected} />
    </div>
  );
}

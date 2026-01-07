"use client";

import React, { useMemo, useState } from "react";
import FilterTagihan from "./components/FilterTagihan";
import TagihanTable from "./components/TagihanTable";
import DetailTagihanModal from "./components/DetailTagihanModal";
import KirimTagihanModal from "./components/KirimTagihanModal";
import { tagihanDummy, Tagihan } from "./data/dummyTagihan";
import { Printer } from "lucide-react";
import jsPDF from "jspdf";

export default function TagihanPage() {
  const [list, setList] = useState<Tagihan[]>(tagihanDummy);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const [selected, setSelected] = useState<Tagihan | null>(null);
  const [showDetail, setShowDetail] = useState(false);

  // Untuk modal Tagih
  const [selectedToTagih, setSelectedToTagih] = useState<Tagihan | null>(null);
  const [showTagihModal, setShowTagihModal] = useState(false);

  // -----------------------------
  // Filtering
  // -----------------------------
  const filtered = useMemo(() => {
    return list.filter((t) => {
      const q = search.trim().toLowerCase();

      const matchQ =
        !q ||
        t.customer.toLowerCase().includes(q) ||
        t.invoiceNo.toLowerCase().includes(q) ||
        t.kamar.toLowerCase().includes(q);

      const start = t.periodeStart;
      const end = t.periodeEnd;

      const matchStatus = !status || t.status === status;
      const matchFrom = !from || start >= from;
      const matchTo = !to || end <= to;

      return matchQ && matchStatus && matchFrom && matchTo;
    });
  }, [list, search, status, from, to]);

  // -----------------------------
  // Detail Modal
  // -----------------------------
  const openDetail = (t: Tagihan) => {
    setSelected(t);
    setShowDetail(true);
  };

  const handleUpdateStatus = (
    id: number,
    status: "Belum Lunas" | "Lunas" | "Lebih Bayar",
    bukti?: string
  ) => {
    setList((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, status, buktiBayar: bukti ?? item.buktiBayar }
          : item
      )
    );
  };

  // -----------------------------
  // Print
  // -----------------------------
  const handlePrint = (t: Tagihan) => {
    const doc = new jsPDF();
    doc.text("INVOICE", 15, 20);
    doc.text(`No: ${t.invoiceNo}`, 15, 30);
    doc.text(`Penyewa: ${t.customer}`, 15, 40);
    doc.text(`Kamar: ${t.kamar}`, 15, 50);
    doc.text(`Total: Rp ${t.totalTagihan.toLocaleString("id-ID")}`, 15, 60);
    doc.save(`${t.invoiceNo}.pdf`);
  };

  // -----------------------------
  // Kirim Tagihan
  // -----------------------------
  const handleOpenTagih = (t: Tagihan) => {
    setSelectedToTagih(t);
    setShowTagihModal(true);
  };

  // nanti diganti dari database
  const adminAccountFromDB = "";

  // -----------------------------
  // Render
  // -----------------------------
  return (
    <div className="p-6 bg-[#f8fafc] min-h-screen text-slate-800">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">Tagihan (Invoice)</h1>
        <p className="text-sm text-gray-500">
          Kelola tagihan penyewa — upload bukti, tandai lunas, cetak invoice.
        </p>
      </div>

      <FilterTagihan
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
        from={from}
        to={to}
        setFrom={setFrom}
        setTo={setTo}
      />

      {/* Summary */}
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex gap-3">
          <div className="bg-white border rounded-lg px-4 py-2 text-sm shadow-sm text-gray-700">
            Total Tagihan: <b>{list.length}</b>
          </div>
          <div className="bg-white border rounded-lg px-4 py-2 text-sm shadow-sm text-gray-700">
            Belum Lunas:{" "}
            <b>{list.filter((l) => l.status === "Belum Lunas").length}</b>
          </div>
        </div>

        {/* Export PDF */}
        <button
          onClick={() => {
            const doc = new jsPDF();
            doc.text("Laporan Tagihan (ringkas)", 15, 20);
            doc.save("laporan_tagihan.pdf");
          }}
          className="px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition text-sm flex items-center gap-2"
        >
          <Printer size={14} /> Export PDF
        </button>
      </div>

      {/* Table */}
      <TagihanTable
        data={filtered}
        onDetail={openDetail}
        onPrint={handlePrint}
        onTagih={handleOpenTagih}
      />

      {/* Detail Modal */}
      <DetailTagihanModal
        show={showDetail}
        onClose={() => setShowDetail(false)}
        data={selected}
        onUpdateStatus={handleUpdateStatus}
      />

      {/* Kirim Tagihan Modal */}
      <KirimTagihanModal
        show={showTagihModal}
        onClose={() => {
          setShowTagihModal(false);
          setSelectedToTagih(null);
        }}
        data={selectedToTagih}
        adminAccount={adminAccountFromDB || undefined}
      />
    </div>
  );
}

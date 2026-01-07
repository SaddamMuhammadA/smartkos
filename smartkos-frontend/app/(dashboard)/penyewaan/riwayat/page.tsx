"use client";

import { useState } from "react";
import FilterRiwayat from "./components/FilterRiwayat";
import RiwayatTable from "./components/RiwayatTable";
import DetailRiwayatModal from "./components/DetailRiwayatModal";

import { riwayatDummy, RiwayatSewa } from "./data/dummyRiwayat";

export default function RiwayatPenyewaPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [selected, setSelected] = useState<RiwayatSewa | null>(null);
  const [showDetail, setShowDetail] = useState(false);

  const filteredData = riwayatDummy.filter((r) => {
    const matchName = r.customer
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchStatus = status ? r.status === status : true;
    return matchName && matchStatus;
  });

  return (
    <div className="p-6 bg-[#f8fafc] min-h-screen text-slate-800">

      <h1 className="text-2xl font-bold mb-1">Riwayat Penyewa</h1>
      <p className="text-sm text-gray-500 mb-6">
        Lihat daftar seluruh penyewa yang pernah tinggal di SmartKos.
      </p>

      {/* Filter */}
      <FilterRiwayat
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
      />

      {/* Table */}
      <RiwayatTable
        data={filteredData}
        onDetail={(r) => {
          setSelected(r);
          setShowDetail(true);
        }}
      />

      {/* Modal Detail */}
      <DetailRiwayatModal
        show={showDetail}
        onClose={() => setShowDetail(false)}
        data={selected}
      />
    </div>
  );
}

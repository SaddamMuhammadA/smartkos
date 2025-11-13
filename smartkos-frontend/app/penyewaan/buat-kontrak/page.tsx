'use client';

import { useState, useMemo } from 'react';
import { BedDouble, Car, Save, Eye, Printer, User, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import jsPDF from 'jspdf';
import RingkasanKontrak from './components/RingkasanKontrak';
import ModalPilihCustomer from './components/ModalPilihCustomer';


interface Option {
  id: number;
  label: string;
  harga?: number;
}

export default function BuatKontrakPage() {
  const kamarList: Option[] = [
    { id: 1, label: 'A1 - Standar' },
    { id: 2, label: 'B2 - VIP' },
    { id: 3, label: 'C1 - Premium' },
  ];

const [customerList, setCustomerList] = useState([
  { id: 1, nama: 'Saddam Muhammad', telp: '08123456789', fotoKtp: '' },
  { id: 2, nama: 'Rizky Alamsyah', telp: '08567890123', fotoKtp: '' },
  { id: 3, nama: 'Dimas Adi', telp: '08234567890', fotoKtp: '' },
]);

  const parkirList: Option[] = [
    { id: 1, label: 'Motor - Rp 50.000', harga: 50000 },
    { id: 2, label: 'Mobil - Rp 100.000', harga: 100000 },
  ];

  const [form, setForm] = useState({
    kamar: '',
    customer: '',
    tanggalMulai: '',
    tanggalSelesai: '',
    durasi: 'Bulanan',
    harga: '',
    parkir: '',
    deposit: '',
  });

  const [showPreview, setShowPreview] = useState(false);
  const [showCustomerModal, setShowCustomerModal] = useState(false);
const [searchCustomer, setSearchCustomer] = useState('');

// Filter hasil pencarian
const filteredCustomer = customerList.filter((c) =>
  c.nama.toLowerCase().includes(searchCustomer.toLowerCase())
);

// Pilih customer
const handleSelectCustomer = (nama: string) => {
  setForm({ ...form, customer: nama });
  setShowCustomerModal(false);
};

// Tambah customer baru (dummy)
const handleAddCustomer = (nama: string, telp: string, fotoKtp?: string) => {
  const newCustomer = {
    id: customerList.length + 1,
    nama,
    telp,
    fotoKtp: fotoKtp || '',
  };
  setCustomerList([...customerList, newCustomer]);
  alert(`✅ Customer "${nama}" berhasil ditambahkan!`);
};

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const hitungDurasi = useMemo(() => {
    if (!form.tanggalMulai || !form.tanggalSelesai) return 0;
    const start = new Date(form.tanggalMulai);
    const end = new Date(form.tanggalSelesai);
    const diff = end.getTime() - start.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    if (form.durasi === 'Bulanan') return Math.max(1, Math.ceil(days / 30));
    if (form.durasi === 'Mingguan') return Math.max(1, Math.ceil(days / 7));
    if (form.durasi === 'Tahunan') return Math.max(1, Math.ceil(days / 365));
    return days;
  }, [form.tanggalMulai, form.tanggalSelesai, form.durasi]);

  const parkirHarga = useMemo(() => {
    const selected = parkirList.find((p) => p.label === form.parkir);
    return selected?.harga || 0;
  }, [form.parkir]);

  const totalSewa = useMemo(() => {
    const harga = Number(form.harga || 0);
    return harga * hitungDurasi;
  }, [form.harga, hitungDurasi]);

  const totalKeseluruhan = useMemo(() => {
    const deposit = Number(form.deposit || 0);
    return totalSewa + parkirHarga + deposit;
  }, [totalSewa, parkirHarga, form.deposit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowPreview(true);
  };

  const handleConfirm = () => {
    setShowPreview(false);
    alert('✅ Kontrak berhasil disimpan (dummy)');
  };

  // === CETAK / DOWNLOAD PDF ===
  const handleDownloadPDF = async () => {
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const logoUrl = '/logo/smartkos-logo.png';

    try {
      const img = new Image();
      img.src = logoUrl;
      await new Promise((res) => (img.onload = res));
      doc.addImage(img, 'PNG', 15, 10, 18, 18);
    } catch {}

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text('SMARTKOS', 38, 18);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('Sistem Manajemen Kos Modern', 38, 24);
    doc.line(15, 30, 195, 30);

    const today = new Date();
    const nomorKontrak = `SK-${today.getFullYear()}${(today.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${Math.floor(Math.random() * 9000 + 1000)}`;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text('KONTRAK PENYEWAAN KAMAR', 105, 42, { align: 'center' });

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Nomor Kontrak: ${nomorKontrak}`, 15, 52);
    doc.text(`Tanggal Cetak: ${today.toLocaleDateString('id-ID')}`, 150, 52);

    let y = 65;
    const details = [
      ['Nama Penghuni', form.customer || '-'],
      ['Kamar', form.kamar || '-'],
      ['Periode', `${form.tanggalMulai || '-'} s/d ${form.tanggalSelesai || '-'}`],
      ['Durasi', `${hitungDurasi} ${form.durasi}`],
      ['Harga per durasi', `Rp ${Number(form.harga || 0).toLocaleString('id-ID')}`],
      ['Total Sewa', `Rp ${totalSewa.toLocaleString('id-ID')}`],
      ['Parkir', `${form.parkir || 'Tidak Ada'} (Rp ${parkirHarga.toLocaleString('id-ID')})`],
      ['Deposit', `Rp ${Number(form.deposit || 0).toLocaleString('id-ID')}`],
      ['Total Estimasi', `Rp ${totalKeseluruhan.toLocaleString('id-ID')}`],
    ];

    doc.setFontSize(11);
    details.forEach(([label, value]) => {
      doc.text(label, 20, y);
      doc.text(':', 75, y);
      doc.text(value, 80, y);
      y += 8;
    });

    y += 6;
    doc.setFont('helvetica', 'bold');
    doc.text('KETENTUAN PENYEWAAN:', 15, y);
    doc.setFont('helvetica', 'normal');
    y += 6;
    const ketentuan = [
      '1. Penyewa wajib membayar biaya sewa tepat waktu sesuai durasi kontrak.',
      '2. Deposit digunakan sebagai jaminan dan dapat dikembalikan setelah masa sewa berakhir.',
      '3. Jika terdapat kerusakan fasilitas, biaya perbaikan dapat dipotong dari deposit.',
      '4. Dilarang memindahtangankan kamar tanpa izin dari pihak pengelola SmartKos.',
      '5. Kontrak ini berlaku sah setelah kedua belah pihak menandatangani dokumen ini.',
    ];
    ketentuan.forEach((t) => {
      doc.text(t, 20, y);
      y += 6;
    });

    y += 10;
    doc.text('Penyewa,', 30, y);
    doc.text('Pemilik / Pengelola,', 130, y);
    doc.line(25, y + 25, 70, y + 25);
    doc.line(125, y + 25, 170, y + 25);
    doc.text('(....................)', 32, y + 30);
    doc.text('(....................)', 133, y + 30);

    doc.setFontSize(9);
    doc.setTextColor(120);
    doc.text(
      'Dokumen ini dihasilkan otomatis oleh sistem SmartKos — tanpa tanda tangan basah sudah dianggap sah.',
      105,
      285,
      { align: 'center' }
    );

    doc.save(`Kontrak_${form.kamar}_${form.customer}.pdf`);
  };

  return (
    <div className="p-6 bg-[#f8fafc] min-h-screen text-slate-800">
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">Buat Kontrak Baru</h1>
        <p className="text-sm text-gray-500">
          Isi detail penyewaan di bawah untuk membuat kontrak baru.
        </p>
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* FORM UTAMA */}
        <div className="xl:col-span-2 space-y-6">
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 space-y-5">
            <h3 className="text-base font-semibold text-gray-800 border-b pb-2 flex items-center gap-2">
              <BedDouble size={18} /> Informasi Utama
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Pilih Kamar */}
              <select
                name="kamar"
                value={form.kamar}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="">Pilih Kamar</option>
                {kamarList.map((k) => (
                  <option key={k.id} value={k.label}>
                    {k.label}
                  </option>
                ))}
              </select>

              {/* Pilih Customer */}
              <button
                type="button"
                onClick={() => setShowCustomerModal(true)}
                className="w-full flex items-center justify-between border rounded-lg px-3 py-2 text-sm border-gray-300 hover:bg-gray-50 transition"
              >
                <span>{form.customer || 'Pilih Customer'}</span>
                <User size={16} className="text-gray-500" />
              </button>

              {/* Tanggal */}
              <input type="date" name="tanggalMulai" value={form.tanggalMulai} onChange={handleChange} className={inputClass} />
              <input type="date" name="tanggalSelesai" value={form.tanggalSelesai} onChange={handleChange} className={inputClass} />

              <select name="durasi" value={form.durasi} onChange={handleChange} className={inputClass}>
                <option value="Harian">Harian</option>
                <option value="Mingguan">Mingguan</option>
                <option value="Bulanan">Bulanan</option>
                <option value="Tahunan">Tahunan</option>
              </select>

              <input type="number" name="harga" value={form.harga} onChange={handleChange} placeholder="Harga per durasi" className={inputClass} />
            </div>
          </div>

          {/* PARKIR & DEPOSIT */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 space-y-5">
            <h3 className="text-base font-semibold text-gray-800 border-b pb-2 flex items-center gap-2">
              <Car size={18} /> Parkiran & Deposit
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <select name="parkir" value={form.parkir} onChange={handleChange} className={inputClass}>
                <option value="">Tanpa Parkir</option>
                {parkirList.map((p) => (
                  <option key={p.id} value={p.label}>
                    {p.label}
                  </option>
                ))}
              </select>

              <input type="number" name="deposit" value={form.deposit} onChange={handleChange} placeholder="Deposit" className={inputClass} />
            </div>
          </div>
        </div>

        {/* RINGKASAN */}
        <RingkasanKontrak
          form={form}
          hitungDurasi={hitungDurasi}
          parkirHarga={parkirHarga}
          totalSewa={totalSewa}
          totalKeseluruhan={totalKeseluruhan}
          handleSubmit={handleSubmit}
        />
      </form>

      {/* MODAL CUSTOMER */}
      <ModalPilihCustomer
        show={showCustomerModal}
        onClose={() => setShowCustomerModal(false)}
        filteredCustomer={filteredCustomer}
        searchCustomer={searchCustomer}
        setSearchCustomer={setSearchCustomer}
        handleSelectCustomer={handleSelectCustomer}
        handleAddCustomer={handleAddCustomer}
      />
    </div>
  );
}

const inputClass =
  'border rounded-lg px-3 py-2 text-sm border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none';

// 💡 Kamu bisa pisahkan komponen Ringkasan & ModalCustomer ke file terpisah nanti untuk kebersihan struktur

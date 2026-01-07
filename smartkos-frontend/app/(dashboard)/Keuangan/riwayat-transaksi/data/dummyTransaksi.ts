// app/Keuangan/riwayat-transaksi/data/dummyTransaksi.ts

export type TransaksiStatus = "Berhasil" | "Menunggu" | "Gagal";

export interface Transaksi {
  id: number;
  trxNo: string;
  customer: string;
  telp: string;
  kamar: string;
  periode: string;
  tanggal: string;
  jumlah: number;
  status: TransaksiStatus;
  bukti?: string;
}

export const transaksiDummy: Transaksi[] = [
  {
    id: 1,
    trxNo: "TRX-2025-001",
    customer: "Andi Rahman",
    telp: "08123456789",
    kamar: "A-12",
    periode: "Jan 2025",
    tanggal: "2025-01-05",
    jumlah: 850000,
    status: "Berhasil",
    bukti: "/bukti/bukti1.jpg",
  },
  {
    id: 2,
    trxNo: "TRX-2025-002",
    customer: "Siti Nur",
    telp: "081999888777",
    kamar: "B-07",
    periode: "Jan 2025",
    tanggal: "2025-01-07",
    jumlah: 900000,
    status: "Menunggu",
  },
  {
    id: 3,
    trxNo: "TRX-2025-003",
    customer: "Joko Prasetyo",
    telp: "08541234123",
    kamar: "C-01",
    periode: "Jan 2025",
    tanggal: "2025-01-09",
    jumlah: 750000,
    status: "Gagal",
  },
];

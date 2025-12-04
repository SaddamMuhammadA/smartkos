export interface Tagihan {
  id: number;
  invoiceNo: string;
  customer: string;
  telp: string;
  kamar: string;
  tanggalMulai: string;
  tanggalSelesai: string;
  totalTagihan: number;
  jumlahBayar: number;
  status: "Belum Lunas" | "Lunas" | "Lebih Bayar";
  buktiBayar?: string; // <— WAJIB ADA
  periodeStart: string;
  periodeEnd: string;
}

export const tagihanDummy: Tagihan[] = [
  {
    id: 1,
    invoiceNo: "INV-001",
    customer: "Saddam Muhammad",
    telp: "08123456789",
    kamar: "A1 - Standar",
    tanggalMulai: "2023-01-01",
    tanggalSelesai: "2023-02-01",
    totalTagihan: 1200000,
    jumlahBayar: 0,
    status: "Belum Lunas",
    buktiBayar: "",
    periodeStart: "2023-01-01",
    periodeEnd: "2023-02-01",
  },
  {
    id: 2,
    invoiceNo: "INV-002",
    customer: "Rizky Alamsyah",
    telp: "08567890123",
    kamar: "B2 - VIP",
    tanggalMulai: "2023-01-05",
    tanggalSelesai: "2023-02-05",
    totalTagihan: 2000000,
    jumlahBayar: 0,
    status: "Belum Lunas",
    buktiBayar: "",
    periodeStart: "2023-01-05",
    periodeEnd: "2023-02-05",
  },
  {
    id: 3,
    invoiceNo: "INV-003",
    customer: "Dimas Adi",
    telp: "08234567890",
    kamar: "C1 - Premium",
    tanggalMulai: "2023-02-01",
    tanggalSelesai: "2023-03-01",
    totalTagihan: 3500000,
    jumlahBayar: 3600000,
    status: "Lebih Bayar",
    buktiBayar: "/bukti/dummy.png",
    periodeStart: "2023-02-01",
    periodeEnd: "2023-03-01",
  },
];

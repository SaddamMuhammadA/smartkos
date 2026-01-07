export interface TagihanItem {
  name: string;
  qty: number;
  price: number;
}

export interface Tagihan {
  id: number;
  invoiceNo: string;
  customer: string;
  telp: string;
  kamar: string;
  periodeStart: string;
  periodeEnd: string;
  totalTagihan: number;
  jumlahBayar: number;
  status: "Belum Lunas" | "Lunas" | "Lebih Bayar";
  buktiBayar?: string;
  items: TagihanItem[];
}

export const tagihanDummy: Tagihan[] = [
  {
    id: 1,
    invoiceNo: "INV-001",
    customer: "Saddam Muhammad",
    telp: "628123456789",
    kamar: "A1 - Standar",
    periodeStart: "2023-01-01",
    periodeEnd: "2023-02-01",
    totalTagihan: 1200000,
    jumlahBayar: 0,
    status: "Belum Lunas",
    buktiBayar: "",
    items: [
      { name: "Sewa Kamar", qty: 1, price: 1200000 },
      { name: "Deposit", qty: 1, price: 500000 },
    ],
  },
  {
    id: 2,
    invoiceNo: "INV-002",
    customer: "Rizky Alamsyah",
    telp: "628567890123",
    kamar: "B2 - VIP",
    periodeStart: "2023-01-05",
    periodeEnd: "2023-02-05",
    totalTagihan: 2000000,
    jumlahBayar: 0,
    status: "Belum Lunas",
    buktiBayar: "",
    items: [{ name: "Sewa Kamar VIP", qty: 1, price: 2000000 }],
  },
];

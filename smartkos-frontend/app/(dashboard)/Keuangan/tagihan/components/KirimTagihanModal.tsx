"use client";

import React, { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send } from "lucide-react";
import { Tagihan } from "../data/dummyTagihan";

// -----------------------------
// Helper Functions
// -----------------------------

// Ambil field apa pun dengan fallback aman
const getField = (obj: any, keys: string[], fallback: any = "") => {
  for (const k of keys) {
    if (obj && typeof obj[k] !== "undefined" && obj[k] !== null) {
      return obj[k];
    }
  }
  return fallback;
};

// Build pesan WhatsApp
const buildWhatsAppMessage = (data: any, adminAccount: string) => {
  if (!data) return "";

  const name = getField(data, ["customer", "nama", "name"]);
  const periodeStart = getField(data, ["periodeStart", "tanggalMulai", "start"]);
  const periodeEnd = getField(data, ["periodeEnd", "tanggalSelesai", "end"]);

  const lines: string[] = [];

  // Header
  lines.push(`Hello ka ${name}`);
  if (periodeStart || periodeEnd) {
    lines.push(`Periode ${periodeStart}${periodeStart && periodeEnd ? " - " : ""}${periodeEnd}`);
    lines.push("");
  }

  // Items
  const items = getField(data, ["items"], []);

  if (Array.isArray(items) && items.length > 0) {
    items.forEach((it: any) => {
      const name = getField(it, ["name", "title", "label"], "Item");
      const qty = getField(it, ["qty"], 1);
      const price = Number(getField(it, ["price", "amount"], 0));
      const subtotal = qty * price;

      lines.push(`${name}`);
      lines.push(`${qty}x ${price.toLocaleString("id-ID")} = ${subtotal.toLocaleString("id-ID")}`);
      lines.push("");
    });
  } else {
    // fallback: kamar
    const kamar = getField(data, ["kamar"]);
    const hargaKamar = Number(getField(data, ["hargaKamar", "harga"], 0));

    if (kamar) {
      lines.push(`${kamar}`);
      lines.push(`1x ${hargaKamar.toLocaleString("id-ID")} = ${hargaKamar.toLocaleString("id-ID")}`);
      lines.push("");
    }

    // fallback: deposit
    const deposit = Number(
      getField(data, ["depositAmount", "hargaDeposit", "deposit"], 0)
    );
    if (deposit > 0) {
      lines.push(`Deposit`);
      lines.push(`1x ${deposit.toLocaleString("id-ID")} = ${deposit.toLocaleString("id-ID")}`);
      lines.push("");
    }
  }

  // subtotal & total
  const subtotal = Number(
    getField(data, ["subTotal", "subtotal", "subTotalTagihan"], null)
  );
  if (subtotal) {
    lines.push(`SubTotal = ${subtotal.toLocaleString("id-ID")}`);
  }

  const total = Number(getField(data, ["totalTagihan", "total"], 0));
  lines.push(`Total = ${total.toLocaleString("id-ID")}`);
  lines.push("");

  lines.push(`Harap melakukan pembayaran ke ${adminAccount}`);
  lines.push("");
  lines.push(`Jika sudah melakukan pembayaran dimohon untuk melampirkan bukti transfer ke Whatsapp Admin🙏🏻`);
  lines.push("");
  lines.push(`Terima kasih banyak.`);

  return lines.join("\n");
};

// -----------------------------
// Main Component
// -----------------------------

export default function KirimTagihanModal({
  show,
  onClose,
  data,
  adminAccount = "BCA 233xxxxxx a.n. Arnold Noven Maliki",
}: {
  show: boolean;
  onClose: () => void;
  data: Tagihan | null;
  adminAccount?: string;
}) {
  const [text, setText] = useState("");
  const [phone, setPhone] = useState("");

  // Generate message otomatis
  useEffect(() => {
    if (!show || !data) {
      setText("");
      setPhone("");
      return;
    }

    const phoneRaw = getField(data, ["telepon", "noTelp", "phone"], "");
    setPhone(phoneRaw);

    const message = buildWhatsAppMessage(data, adminAccount);
    setText(message);
  }, [show, data, adminAccount]);

  if (!data) return null;

  const invoice = getField(data, ["invoiceNo", "invoice"], "");

  const handleSend = () => {
    const sanitized = phone.replace(/\s|\-|\(|\)|\+/g, "");
    if (!sanitized) return alert("Masukkan nomor WhatsApp penerima.");

    const url = `https://wa.me/${sanitized}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
    onClose();
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 bg-black/40 z-50 flex items-end md:items-center justify-center p-0 md:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white w-full md:w-[720px] h-[85vh] md:h-auto md:max-h-[80vh] rounded-t-xl md:rounded-xl shadow-xl overflow-y-auto"
            initial={{ y: 200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 200, opacity: 0 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <div>
                <div className="text-sm text-gray-500">{invoice}</div>
                <div className="text-lg font-semibold text-gray-800">{data.customer}</div>
              </div>

              <button onClick={onClose} className="p-2 rounded-md hover:bg-gray-100">
                <X size={20} />
              </button>
            </div>

            {/* Body */}
            <div className="p-4 space-y-3">
              <label className="text-sm font-medium">Pesan (Bisa diedit)</label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={10}
                className="w-full border rounded-lg p-3 text-sm resize-y"
              />

              <div className="mt-4">
                <label className="text-sm font-medium">Nomor WhatsApp Penerima</label>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="62811xxxxxxx (tanpa +)"
                  className="w-full border rounded-lg p-2 mt-1 text-sm"
                />
                <div className="text-xs text-gray-500 mt-1">Format: 62811xxxxxxx</div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t flex items-center justify-end gap-3">
              <button onClick={onClose} className="px-4 py-2 border rounded-lg hover:bg-gray-100">
                Tutup
              </button>
              <button
                onClick={handleSend}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
              >
                <Send size={14} /> Kirim
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

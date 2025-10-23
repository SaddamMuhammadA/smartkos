'use client';
import { ThemeToggle } from '@/components/theme-toggle';
import { useState } from 'react';
import {
  Home,
  Calendar,
  CreditCard,
  Layers,
  Settings,
  ClipboardList,
  ChevronDown,
  ChevronRight,
  Menu,
} from 'lucide-react';
import Link from 'next/link';

export default function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // State submenu
  const [openPenyewaan, setOpenPenyewaan] = useState(false);
  const [openPembayaran, setOpenPembayaran] = useState(false);
  const [openMaster, setOpenMaster] = useState(false);
  const [openPengaturan, setOpenPengaturan] = useState(false);

  const linkClass =
    'flex items-center px-4 py-2 text-sm rounded-lg hover:bg-[#2c3034] text-gray-300 transition';
  const activeLink =
    'flex items-center px-4 py-2 text-sm rounded-lg bg-[#0d6efd]/10 text-[#0d6efd] font-semibold';

  return (
    <>
      {/* Overlay mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar utama */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#1c1f23] transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:inset-0`}
      >
        {/* Header Sidebar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700">
          <h1 className="text-xl font-semibold text-[#ffffff]">SmartKos</h1>
          <button
            className="md:hidden text-gray-300"
            onClick={() => setSidebarOpen(false)}
          >
            ✕
          </button>
        </div>

        {/* Menu Navigasi */}
        <nav className="px-3 py-6 space-y-1 text-sm">
          {/* Dashboard */}
          <Link href="/" className={activeLink}>
            <Home className="w-4 h-4 mr-2  text-indigo-400" /> Dashboard
          </Link>

          {/* Kalender */}
          <Link href="/jadwal" className={linkClass}>
            <Calendar className="w-4 h-4 mr-2 text-indigo-400" /> Kalender
          </Link>

          {/* Penyewaan */}
          <div>
            <button
              onClick={() => setOpenPenyewaan(!openPenyewaan)}
              className={`${linkClass} w-full justify-between`}
            >
              <span className="flex items-center">
                <ClipboardList className="w-4 h-4 mr-2 text-indigo-400" />
                Penyewaan
              </span>
              {openPenyewaan ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>
            {openPenyewaan && (
              <div className="ml-6 mt-1 space-y-1">
                <Link href="/penyewaan/booking" className={linkClass}>
                  Booking Baru
                </Link>
                <Link href="/penyewaan/aktif" className={linkClass}>
                  Daftar Sewa Aktif
                </Link>
                <Link href="/penyewaan/riwayat" className={linkClass}>
                  Riwayat Sewa
                </Link>
              </div>
            )}
          </div>

          {/* Pembayaran */}
          <div>
            <button
              onClick={() => setOpenPembayaran(!openPembayaran)}
              className={`${linkClass} w-full justify-between`}
            >
              <span className="flex items-center">
                <CreditCard className="w-4 h-4 mr-2 text-indigo-400" />
                Pembayaran
              </span>
              {openPembayaran ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>
            {openPembayaran && (
              <div className="ml-6 mt-1 space-y-1">
                <Link href="/pembayaran/tagihan" className={linkClass}>
                  Tagihan (Invoice)
                </Link>
                <Link href="/pembayaran/laporan" className={linkClass}>
                  Laporan
                </Link>
              </div>
            )}
          </div>

          {/* Master Data */}
          <div>
            <button
              onClick={() => setOpenMaster(!openMaster)}
              className={`${linkClass} w-full justify-between`}
            >
              <span className="flex items-center">
                <Layers className="w-4 h-4 mr-2 text-indigo-400" />
                Master Data
              </span>
              {openMaster ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>
            {openMaster && (
              <div className="ml-6 mt-1 space-y-1">
                <Link href="/master/lokasi" className={linkClass}>
                  Lokasi Kos
                </Link>
                <Link href="/master/kamar" className={linkClass}>
                  Kamar
                </Link>
                <Link href="/master/jenis-kamar" className={linkClass}>
                  Jenis Kamar
                </Link>
                <Link href="/master/parkiran" className={linkClass}>
                  Parkiran
                </Link>
                <Link href="/master/pricing" className={linkClass}>
                  Pricing
                </Link>
                <Link href="/master/promo" className={linkClass}>
                  Promo
                </Link>
              </div>
            )}
          </div>

          {/* Pengaturan */}
          <div>
            <button
              onClick={() => setOpenPengaturan(!openPengaturan)}
              className={`${linkClass} w-full justify-between`}
            >
              <span className="flex items-center">
                <Settings className="w-4 h-4 mr-2 text-indigo-400" />
                Pengaturan
              </span>
              {openPengaturan ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>
            {openPengaturan && (
              <div className="ml-6 mt-1 space-y-1">
                <Link href="/pengaturan/pengguna" className={linkClass}>
                  Manajemen Pengguna
                </Link>
                <Link href="/pengaturan/sistem" className={linkClass}>
                  Pengaturan Sistem
                </Link>
              </div>
            )}
          </div>
        </nav>
            {/* Tombol Theme Toggle di bawah menu */}
            <div className="mt-6 px-4 flex justify-center">
                 <ThemeToggle />
            </div>
      </aside>

      {/* Tombol menu mobile */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-[#0d6efd] text-white p-2 rounded-md shadow-lg"
        onClick={() => setSidebarOpen(true)}
      >
        <Menu size={18} />
      </button>
    </>
    
  );
}

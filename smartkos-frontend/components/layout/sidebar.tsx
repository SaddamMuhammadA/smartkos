'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Calendar,
  ClipboardList,
  FileText,
  Layers,
  CreditCard,
  Users,
  Settings,
  ChevronDown,
  ChevronRight,
  Menu,
} from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();

  // --- Dropdown SmartKos ---
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedKos, setSelectedKos] = useState('SmartKos 1');
  const kosList = ['SmartKos 1', 'SmartKos 2', 'SmartKos 3'];

  // --- State submenu ---
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const toggleMenu = (menu: string) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  // --- Menu Struktur ---
  const menuItems = [
    {
      label: 'Dashboard',
      icon: <Home size={18} />,
      href: '/',
    },
    {
      label: 'Kalender',
      icon: <Calendar size={18} />,
      href: '/kalender',
    },
    {
      label: 'Penyewaan',
      icon: <ClipboardList size={18} />,
      children: [
        { label: 'Daftar Customer', href: '/penyewaan/daftar-customer' }, 
        { label: 'Daftar Sewa Aktif', href: '/penyewaan/daftar-sewa-aktif' }, 
        { label: 'Daftar Kamar Tersedia', href: '/penyewaan/daftar-kamar-tersedia' },    
        { label: 'Buat Kontrak', href: '/penyewaan/buat-kontrak' }, 
        { label: 'Riwayat Penyewa', href: '/penyewaan/riwayat' }, 
      ],
    },
    {
      label: 'Keuangan',
      icon: <CreditCard size={18} />,
      children: [
        { label: 'Tagihan (Invoice)', href: '/Keuangan/tagihan' },
        { label: 'Riwayat Transaksi', href: '/Keuangan/riwayat-transaksi' },
        { label: 'Laporan Keuangan', href: '/Keuangan/laporan' },
      ],
    },
    {
      label: 'Administrasi',
      icon: <Layers size={18} />,
      children: [
        { label: 'Data Properti', href: '/admin/data-properti' },
        { label: 'Tarif & Promo', href: '/admin/tarif-promo' },
      ],
    },
    {
      label: 'Pengaturan Akun',
      icon: <Settings size={18} />,
      children: [
        { label: 'Manajemen Pengguna', href: '/pengaturan/pengguna' },
        { label: 'Sistem', href: '/pengaturan/sistem' },
      ],
    },
  ];

  // --- Mobile Sidebar toggle ---
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {/* Overlay untuk mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static z-50 inset-y-0 left-0 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Header Sidebar */}
        <div className="relative px-6 py-4 border-b border-gray-100">
          <div
            className="flex items-center justify-between cursor-pointer select-none"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <div>
              <h1 className="text-lg font-semibold text-gray-800">
                {selectedKos}
              </h1>
              <p className="text-xs text-gray-500">Manajemen Kos</p>
            </div>
            {dropdownOpen ? (
              <ChevronDown className="w-4 h-4 text-gray-500" />
            ) : (
              <ChevronRight className="w-4 h-4 text-gray-500" />
            )}
          </div>

          {/* Dropdown daftar kos */}
          {dropdownOpen && (
            <div className="absolute left-6 right-6 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 animate-fadeIn">
              {kosList.map((kos) => (
                <button
                  key={kos}
                  onClick={() => {
                    setSelectedKos(kos);
                    setDropdownOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm rounded-md transition-colors ${
                    selectedKos === kos
                      ? 'bg-blue-50 text-blue-700 font-semibold'
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  {kos}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Menu Navigasi */}
        <nav className="p-4 space-y-1 text-sm">
          {menuItems.map((item) => {
            const isActive =
              item.href === pathname ||
              item.children?.some((child) => child.href === pathname);

            return (
              <div key={item.label}>
                {/* Item utama */}
                <button
                  onClick={() =>
                    item.children ? toggleMenu(item.label) : null
                  }
                  className={`flex items-center justify-between w-full px-4 py-2 rounded-lg transition-all ${
                    isActive
                      ? 'bg-blue-50 text-blue-600 font-semibold'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span className="text-blue-500">{item.icon}</span>
                    {item.children ? (
                      <span>{item.label}</span>
                    ) : (
                      <Link href={item.href || '#'}>{item.label}</Link>
                    )}
                  </span>
                  {item.children &&
                    (openMenu === item.label ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    ))}
                </button>

                {/* Submenu */}
                {item.children && openMenu === item.label && (
                  <div className="ml-6 mt-1 space-y-1 animate-fadeIn">
                    {item.children.map((sub) => {
                      const isSubActive = sub.href === pathname;
                      return (
                        <Link
                          key={sub.label}
                          href={sub.href}
                          className={`block px-3 py-2 text-sm rounded-md transition-colors ${
                            isSubActive
                              ? 'bg-blue-100 text-blue-700 font-medium'
                              : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600'
                          }`}
                        >
                          {sub.label}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </aside>

      {/* Tombol Toggle Mobile */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 bg-blue-600 text-white p-2 rounded-md shadow-lg"
      >
        <Menu size={18} />
      </button>

      {/* Animasi CSS tambahan */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out forwards;
        }
      `}</style>
    </>
  );
}

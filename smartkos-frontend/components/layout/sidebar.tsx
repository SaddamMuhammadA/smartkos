'use client';
import { useState, useEffect } from 'react';
import {
  Home,
  Calendar,
  ClipboardList,
  CreditCard,
  Layers,
  Settings,
  Menu,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedKos, setSelectedKos] = useState('SmartKos 1');

  // Ambil pathname dari Next.js (aman untuk SSR)
  const pathname = usePathname();

  const kosList = ['SmartKos 1', 'SmartKos 2', 'SmartKos 3'];

  const menuItems = [
    { href: '/', label: 'Dashboard', icon: <Home className="w-4 h-4" /> },
    { href: '/kalender', label: 'Kalender', icon: <Calendar className="w-4 h-4" /> },
    { href: '/penyewaan', label: 'Penyewaan', icon: <ClipboardList className="w-4 h-4" /> },
    { href: '/pembayaran', label: 'Pembayaran', icon: <CreditCard className="w-4 h-4" /> },
    { href: '/master', label: 'Master Data', icon: <Layers className="w-4 h-4" /> },
    { href: '/pengaturan', label: 'Pengaturan', icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      <aside
        className={`fixed md:static z-50 inset-y-0 left-0 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out shadow-lg md:shadow-none ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Header Dropdown */}
        <div className="px-6 py-4 border-b border-gray-100 relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-full flex items-center justify-between text-lg font-bold text-blue-600 hover:text-blue-700 transition"
          >
            {selectedKos}
            {dropdownOpen ? (
              <ChevronUp className="w-4 h-4 text-gray-600" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-600" />
            )}
          </button>

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
        <nav className="p-4 space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-all ${
                  isActive
                    ? 'bg-blue-100 text-blue-700 font-semibold'
                    : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                }`}
              >
                <span className="text-blue-500">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Tombol Mobile */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 bg-blue-600 text-white p-2 rounded-md shadow-lg hover:bg-blue-700 transition"
      >
        <Menu size={18} />
      </button>

      {/* Animasi */}
      <style jsx global>{`
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
          animation: fadeIn 0.2s ease-in-out;
        }
      `}</style>
    </>
  );
}

'use client';

import { useEffect, useRef, useState } from 'react';
import { Search, Bell, LogOut, Settings, User, Sun } from 'lucide-react';

export default function Topbar() {
const [profileOpen, setProfileOpen] = useState(false);
const [notifOpen, setNotifOpen] = useState(false);

const notifRef = useRef<HTMLDivElement>(null);
const profileRef = useRef<HTMLDivElement>(null);

const user = {
name: 'Saddam Muhammad',
role: 'Super Admin',
initials: 'SA',
};

const notifications = [
{ id: 1, text: 'Pembayaran kamar A1 berhasil diterima.' },
{ id: 2, text: '3 kamar akan jatuh tempo dalam 3 hari.' },
];

// Auto close dropdown saat klik di luar area
useEffect(() => {
function handleClickOutside(event: MouseEvent) {
if (
notifRef.current &&
!notifRef.current.contains(event.target as Node)
) {
setNotifOpen(false);
}
if (
profileRef.current &&
!profileRef.current.contains(event.target as Node)
) {
setProfileOpen(false);
}
}
document.addEventListener('mousedown', handleClickOutside);
return () => document.removeEventListener('mousedown', handleClickOutside);
}, []);

return (
<header className="sticky top-0 z-40 bg-white border-b border-gray-200 flex items-center justify-between px-6 py-3 shadow-sm backdrop-blur-md">
{/* Search bar */}
<div className="flex items-center gap-3 w-full md:w-1/2">
<Search className="text-gray-400 w-4 h-4" />
<input type="text" placeholder="Cari sesuatu..." className="w-full bg-transparent focus:outline-none text-sm text-gray-700 placeholder-gray-400" />
</div>

      {/* Right side */}
  <div className="flex items-center gap-4 relative">
    {/* Theme icon (Light only for now) */}
    <button className="p-2 rounded-full hover:bg-gray-100 transition">
      <Sun className="w-5 h-5 text-gray-600" />
    </button>

    {/* Notifications */}
    <div className="relative" ref={notifRef}>
      <button
        onClick={() => setNotifOpen(!notifOpen)}
        className="p-2 rounded-full hover:bg-gray-100 transition relative"
      >
        <Bell className="w-5 h-5 text-gray-700" />
        {notifications.length > 0 && (
          <>
            <span className="absolute top-1 right-1 inline-flex h-2 w-2 rounded-full bg-red-500"></span>
            <span className="absolute top-1 right-1 inline-flex h-2 w-2 rounded-full bg-red-500 animate-ping"></span>
          </>
        )}
      </button>

      {/* Dropdown Notifikasi */}
      {notifOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded-xl shadow-lg animate-fadeIn z-50">
          <div className="p-3 border-b border-gray-100">
            <h4 className="text-sm font-semibold text-gray-700">
              Notifikasi Terbaru
            </h4>
          </div>
          <div className="max-h-60 overflow-y-auto p-2">
            {notifications.length > 0 ? (
              notifications.map((n) => (
                <div
                  key={n.id}
                  className="text-sm text-gray-600 bg-gray-50 p-2 rounded-md mb-1 hover:bg-gray-100 transition"
                >
                  {n.text}
                </div>
              ))
            ) : (
              <p className="text-xs text-gray-500 text-center py-2">
                Tidak ada notifikasi
              </p>
            )}
          </div>
        </div>
      )}
    </div>

    {/* Avatar & Dropdown */}
    <div className="relative" ref={profileRef}>
      <button
        onClick={() => setProfileOpen(!profileOpen)}
        className="flex items-center gap-3 focus:outline-none"
      >
        <div className="w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center font-semibold text-blue-600 hover:scale-105 transition-transform">
          {user.initials}
        </div>
        <div className="hidden md:flex flex-col items-start">
          <span className="font-medium text-gray-700">{user.name}</span>
          <span className="text-xs text-gray-400">{user.role}</span>
        </div>
      </button>

      {profileOpen && (
        <div className="absolute right-0 mt-3 w-48 bg-white border border-gray-200 rounded-xl shadow-lg animate-fadeIn overflow-hidden z-50">
          <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition">
            <User size={16} /> Profil
          </button>
          <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition">
            <Settings size={16} /> Pengaturan
          </button>
          <hr className="border-gray-100" />
          <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition">
            <LogOut size={16} /> Keluar
          </button>
        </div>
      )}
    </div>
  </div>
</header>




  );
}

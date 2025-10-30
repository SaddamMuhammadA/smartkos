'use client';
import { Search, Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';

export default function Topbar() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200 flex items-center justify-between px-6 py-3 shadow-sm">
      {/* Search bar */}
      <div className="flex items-center gap-3 w-full md:w-1/2">
        <Search className="text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Cari sesuatu..."
          className="w-full bg-transparent focus:outline-none text-sm text-gray-700 placeholder-gray-400"
        />
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="p-2 rounded-full hover:bg-gray-100 transition"
        >
          {theme === 'dark' ? (
            <Sun className="w-5 h-5 text-gray-700" />
          ) : (
            <Moon className="w-5 h-5 text-gray-700" />
          )}
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center font-semibold text-blue-600">
            D
          </div>
          <span className="font-medium text-gray-700 hidden md:block">
            SADDAM
          </span>
        </div>
      </div>
    </header>
  );
}

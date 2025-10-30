import './globals.css';
import type { Metadata } from 'next';
import Sidebar from '@/components/layout/sidebar';
import Topbar from '@/components/layout/topbar';

export const metadata: Metadata = {
  title: 'SmartKos Dashboard',
  description: 'Sistem Manajemen Kos Modern',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="bg-[#f8fafc] text-slate-800 flex min-h-screen">
        {/* Sidebar */}
        <Sidebar />

        {/* Konten utama */}
        <div className="flex-1 flex flex-col">
          {/* Topbar */}
          <Topbar />

          {/* Isi konten */}
          <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-[#f8fafc]">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}

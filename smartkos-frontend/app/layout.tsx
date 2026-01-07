// app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';

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
      <body className="bg-[#f8fafc] text-slate-800">
        {children}
      </body>
    </html>
  );
}
import './globals.css';
import { Providers } from './providers';

export const metadata = {
  title: 'SmartKos Dashboard',
  description: 'Manajemen Kos Modern',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className="bg-gray-50 text-gray-900 dark:bg-[#1e1f24] dark:text-gray-100">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

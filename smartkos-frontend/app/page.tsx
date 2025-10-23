'use client'; 

import React, { useState, useCallback } from 'react';
import { Home, List, Users, DollarSign, Bell, RefreshCw, LucideIcon, FileText, LayoutDashboard } from 'lucide-react';

// --- DEFINISI KONSTANTA WARNA BARU (Rekomendasi 2: Calm Black & Teal Accent) ---
const COLOR_BG_PRIMARY = '#0F172A'; // Biru Navy Gelap
const COLOR_BG_SECONDARY = '#1E293B'; // Abu-abu Slate Gelap (untuk Card)
const COLOR_ACCENT_TEAL = '#2DD4BF'; // Teal Cerah untuk Aksen Utama
const COLOR_TEXT_PRIMARY = '#E2E8F0'; // Putih Kebiruan
const COLOR_SUCCESS = '#4ADE80'; // Hijau Lemon Cerah
const COLOR_WARNING = '#FBBF24'; // Kuning Cerah
const COLOR_SIDEBAR_ACTIVE = 'rgba(17, 73, 160)'; // Warna Biru Tua dari permintaan Anda

// --- DEFINISI KOMPONEN UI DUMMY UNTUK MENGHINDARI ERROR MODUL TIDAK DITEMUKAN ---

// Komponen Card (Background Card Utama)
const Card = ({ children, className }: { children: React.ReactNode, className?: string }) => (
    // Menggunakan COLOR_BG_SECONDARY dan border yang lebih gelap
    <div className={`rounded-xl border border-gray-800 bg-[${COLOR_BG_SECONDARY}] shadow-xl ${className || ''}`}>{children}</div>
);

// Header Card (Untuk Judul)
const CardHeader = ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <div className={`flex flex-col space-y-1.5 p-4 md:p-6 ${className || ''}`}>{children}</div>
);

// Judul Card
const CardTitle = ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <h3 className={`text-xl font-bold leading-none tracking-tight text-[${COLOR_TEXT_PRIMARY}] ${className || ''}`}>{children}</h3>
);

// Konten Card
const CardContent = ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <div className={`p-4 md:p-6 pt-0 ${className || ''}`}>{children}</div>
);

// Komponen Button (Simulasi)
const Button = ({ children, className, variant = 'default', onClick }: { children: React.ReactNode, className?: string, variant?: 'default' | 'ghost', onClick?: () => void }) => {
    let baseStyle = 'inline-flex items-center justify-center rounded-lg font-semibold transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[${COLOR_ACCENT_TEAL}]';
    
    if (variant === 'default') {
        // Menggunakan Teal untuk tombol utama
        baseStyle += ` bg-[${COLOR_ACCENT_TEAL}] text-${COLOR_BG_PRIMARY} hover:bg-opacity-90 shadow-md py-2 px-4`;
    } else if (variant === 'ghost') {
        // Menggunakan Teal sebagai teks ghost
        baseStyle += ` text-[${COLOR_ACCENT_TEAL}] hover:bg-[${COLOR_BG_SECONDARY}] py-1 px-2`;
    }

    return (
        <button className={`${baseStyle} ${className || ''}`} onClick={onClick}>
            {children}
        </button>
    );
};
// --- END DUMMY UI COMPONENTS ---

// --- DATA MENU SIDEBAR ---
const NAV_ITEMS = [
    { name: 'Dashboard', key: 'dashboard', icon: LayoutDashboard },
    { name: 'Master Kamar', key: 'master-data-kamar', icon: Home },
    { name: 'Jadwal Kamar', key: 'jadwal-kamar', icon: List },
    { name: 'Penyewaan', key: 'penyewaan', icon: Users },
    { name: 'Keuangan', key: 'keuangan', icon: DollarSign },
    { name: 'Data Kos & Pricing', key: 'master-data-kos', icon: FileText },
];


// --- DEFINISI TIPE (INTERFACE) & DATA DUMMY ---
interface HistoryItem { month: string; amount: number; }
interface JadwalItem { no: number; kamar: string; tipe: string; tanggal: string; sewa: number; status: 'Aktif' | 'Booking'; }
interface NotifikasiItem { type: string; message: string; }

interface DashboardData {
    totalKamar: number; tersedia: number; penghuniAktif: number; pendapatanBulanIni: number;
    userName: string; pendapatanHistory: HistoryItem[]; jadwalSingkat: JadwalItem[]; notifikasi: NotifikasiItem[];
}

interface StatCardProps { title: string; value: number; icon: LucideIcon; format?: boolean; }
interface SimpleLineChartProps { data: HistoryItem[]; }
interface DashboardMainProps { data: DashboardData; }

const DUMMY_DATA: DashboardData = {
    totalKamar: 128, tersedia: 56, penghuniAktif: 83, pendapatanBulanIni: 12950000, userName: 'Dimas',
    pendapatanHistory: [
        { month: 'Jan', amount: 3000000 }, { month: 'Feb', amount: 4500000 }, { month: 'Mar', amount: 5000000 }, 
        { month: 'Apr', amount: 4000000 }, { month: 'May', amount: 6500000 }, { month: 'Jun', amount: 5500000 },
    ],
    jadwalSingkat: [
        { no: 1, kamar: '1A', tipe: 'Standar', tanggal: '22 Jun 2023', sewa: 8000, status: 'Aktif' },
        { no: 2, kamar: '2B', tipe: 'VIP', tanggal: '22 Jun 2023', sewa: 12000, status: 'Aktif' },
        { no: 3, kamar: '3A', tipe: 'Premium', tanggal: '16 Jun 2023', sewa: 10000, status: 'Aktif' },
        { no: 4, kamar: '4B', tipe: 'VIP', tanggal: '17 Jun 2023', sewa: 10000, status: 'Booking' },
    ],
    notifikasi: [
        { type: 'Tagihan', message: '3 kamar akan jatuh tempo dalam 3 hari' }
    ]
};

// --- Helper Components ---

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, format = true }) => (
    // Gunakan Secondary BG
    <Card className={`h-full transition duration-300 hover:shadow-[0_0_15px_rgba(45,212,191,0.3)] hover:scale-[1.01] bg-[${COLOR_BG_SECONDARY}] border-gray-800`}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4">
            <h3 className="text-sm font-medium text-gray-400">
                {title}
            </h3>
            {/* Ikon menggunakan warna Teal */}
            <Icon className={`w-5 h-5 text-[${COLOR_ACCENT_TEAL}]`} />
        </CardHeader>
        <CardContent className='p-4 pt-0'>
             {/* Metrik positif menggunakan warna Success */}
             <p className={`text-3xl font-extrabold ${format ? `text-[${COLOR_SUCCESS}]` : `text-[${COLOR_TEXT_PRIMARY}]`}`}>
                {format ? `Rp${value.toLocaleString('id-ID')}` : value}
            </p>
        </CardContent>
    </Card>
);

const SimpleLineChart: React.FC<SimpleLineChartProps> = ({ data }) => {
    if (data.length === 0) return <div className="text-center text-gray-500 h-48 flex items-center justify-center">Data tidak tersedia.</div>;

    const amounts = data.map(d => d.amount);
    const max = Math.max(...amounts);
    const min = Math.min(...amounts);

    const normalizedData = data.map(d => ({
        ...d,
        height: max === min ? 50 : ((d.amount - min) / (max - min)) * 90 + 5,
    }));

    const points = normalizedData.map((d, i) => {
        const x = (i / (data.length - 1)) * 100;
        const y = 100 - d.height;
        return `${x},${y}`;
    }).join(' ');

    return (
        <div className="relative h-48 pt-4">
            <div className={`absolute left-0 w-full h-[calc(100%-25px)] text-xs text-gray-500 opacity-70 text-[${COLOR_TEXT_PRIMARY}]`}>
                <div className="absolute top-0">Rp{max.toLocaleString('id-ID', { maximumFractionDigits: 0 })}</div>
                <div className="absolute bottom-0">Rp{min.toLocaleString('id-ID', { maximumFractionDigits: 0 })}</div>
            </div>
            
            <div className="absolute left-10 w-[calc(100%-40px)] h-[calc(100%-25px)]">
                 <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
                    {/* Garis Grid - lebih gelap */}
                    {[0, 25, 50, 75, 100].map(y => (
                        <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="#374151" strokeWidth="0.3" strokeDasharray="1, 2" />
                    ))}
                    
                    {/* Garis Data menggunakan Teal */}
                    <polyline 
                        fill="none" 
                        stroke={COLOR_ACCENT_TEAL}
                        strokeWidth="1.5" 
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        points={points}
                    />
                    {/* Area di bawah garis menggunakan gradient Teal */}
                    <polygon 
                        fill="url(#gradientFill)"
                        points={`0,100 ${points} 100,100`}
                    />
                    <defs>
                        <linearGradient id="gradientFill" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" style={{stopColor:COLOR_ACCENT_TEAL, stopOpacity:0.2}} />
                            <stop offset="100%" style={{stopColor:COLOR_ACCENT_TEAL, stopOpacity:0}} />
                        </linearGradient>
                    </defs>

                    {/* Poin Data menggunakan Teal */}
                    {normalizedData.map((d, i) => (
                         <circle 
                            key={d.month}
                            cx={(i / (data.length - 1)) * 100} 
                            cy={100 - d.height} 
                            r="1.5" 
                            fill={COLOR_ACCENT_TEAL}
                        />
                    ))}
                </svg>
            </div>

            <div className="absolute bottom-0 left-10 w-[calc(100%-40px)] flex justify-between text-xs text-gray-500 pt-1">
                {data.map(d => <span key={d.month} className='font-semibold'>{d.month}</span>)}
            </div>
        </div>
    );
};

const DashboardMain: React.FC<DashboardMainProps> = ({ data }) => (
    <div className="grid grid-cols-4 gap-6">
        <div className="col-span-4 lg:col-span-3 space-y-6">
            <h2 className={`text-3xl font-extrabold text-[${COLOR_TEXT_PRIMARY}] mb-6`}>Dashboard Properti</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <StatCard title="Total Kamar" value={data.totalKamar} icon={List} format={false} />
                <StatCard title="Tersedia" value={data.tersedia} icon={Home} format={false} />
                <StatCard title="Penghuni Aktif" value={data.penghuniAktif} icon={Users} format={false} />
                <div className="col-span-2 md:col-span-1">
                     <StatCard title="Pendapatan Bulan Ini" value={data.pendapatanBulanIni} icon={DollarSign} format={true} />
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Pendapatan Tahunan (Simulasi)</CardTitle>
                    <p className="text-sm text-gray-400 mt-1">Total pemasukan bersih selama 6 bulan terakhir.</p>
                </CardHeader>
                <CardContent>
                    <SimpleLineChart data={data.pendapatanHistory} />
                </CardContent>
            </Card>

            <Card>
                <CardHeader className='flex-row items-center justify-between p-4 md:p-6 pb-2'>
                    <CardTitle className='text-xl'>Jadwal Sewa Aktif Singkat</CardTitle>
                    <Button variant="ghost" className='text-sm'>Lihat Semua &rarr;</Button>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto -mx-4">
                        <table className="min-w-full divide-y divide-gray-700 text-sm">
                            <thead>
                                <tr className='text-left bg-gray-700/50'>
                                    <th className="px-4 py-2 text-gray-400">No.</th>
                                    <th className="px-4 py-2 text-gray-400">Kamar</th>
                                    <th className="px-4 py-2 text-gray-400">Tipe</th>
                                    <th className="px-4 py-2 text-gray-400">Tanggal Sewa</th>
                                    <th className="px-4 py-2 text-gray-400">Sewa/Bln (x1000)</th>
                                    <th className="px-4 py-2 text-gray-400">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-800">
                                {data.jadwalSingkat.map(item => (
                                    <tr key={item.no} className={`hover:bg-[${COLOR_BG_PRIMARY}] transition duration-100`}>
                                        <td className="px-4 py-2 text-gray-300">{item.no}</td>
                                        {/* Teks kamar menggunakan warna Teal */}
                                        <td className={`px-4 py-2 text-[${COLOR_ACCENT_TEAL}] font-medium`}>{item.kamar}</td>
                                        <td className="px-4 py-2 text-gray-300">{item.tipe}</td>
                                        <td className="px-4 py-2 text-gray-300">{item.tanggal}</td>
                                        <td className="px-4 py-2 text-gray-300">Rp{item.sewa.toLocaleString('id-ID')}</td>
                                        <td className="px-4 py-2">
                                            <span className={`px-3 py-1 text-xs font-semibold rounded-full 
                                                ${item.status === 'Aktif' 
                                                    ? `bg-[${COLOR_SUCCESS}] text-${COLOR_BG_PRIMARY}` // Active menggunakan warna Success
                                                    : `bg-[${COLOR_WARNING}] text-${COLOR_BG_PRIMARY}` // Booking menggunakan warna Warning
                                                }`}>
                                                {item.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>

        <div className="col-span-4 lg:col-span-1 space-y-6">
            <Card>
                <CardHeader>
                    {/* Ikon Bell menggunakan warna Warning */}
                    <CardTitle className={`flex items-center text-xl`}><Bell className={`w-6 h-6 mr-2 text-[${COLOR_WARNING}]`}/> Notifikasi</CardTitle>
                </CardHeader>
                <CardContent>
                    {data.notifikasi.map((item, index) => (
                        <div key={index} className={`p-4 bg-opacity-30 rounded-lg mb-4 border border-[${COLOR_WARNING}]/50 bg-[${COLOR_WARNING}]/10`}>
                            <h4 className={`font-bold text-[${COLOR_WARNING}] mb-1 flex items-center`}>{item.type} <RefreshCw className={`w-4 h-4 ml-auto text-[${COLOR_WARNING}]`}/></h4>
                            <p className="text-sm text-gray-300">{item.message}</p>
                            <Button className="mt-4 w-full" variant='default'>
                                Lihat
                            </Button>
                        </div>
                    ))}
                    
                    <div className="p-4 text-sm text-gray-500 text-center mt-6">
                        Tampilan diperbarui setiap 1 jam.
                    </div>
                </CardContent>
            </Card>
        </div>
    </div>
);


// --- KOMPONEN SIDEBAR ---

interface SidebarProps {
    activePage: string;
    setActivePage: (key: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activePage, setActivePage }) => {
    // Warna aktif dari permintaan Anda, dipertahankan
    const activeColor = COLOR_SIDEBAR_ACTIVE;

    return (
        // Sidebar menggunakan warna primary background
        <div className={`w-64 fixed h-full bg-[${COLOR_BG_PRIMARY}] border-r border-gray-800 flex flex-col z-10`}>
            {/* Logo/Header */}
            <div className={`p-6 text-2xl font-bold text-[${COLOR_ACCENT_TEAL}] border-b border-gray-800`}>
                Smart<span className={`text-[${COLOR_TEXT_PRIMARY}]`}>kos</span>
            </div>

            {/* Navigasi Utama */}
            <nav className="flex-grow p-4 space-y-2">
                <h3 className="text-xs font-semibold uppercase text-gray-500 mb-4 px-2 pt-2">Menu Utama</h3>
                {NAV_ITEMS.map((item) => {
                    const isActive = activePage === item.key;
                    
                    // Conditional styling untuk item aktif
                    const itemStyle = isActive 
                        ? { 
                            // Background lebih gelap dari primary background
                            backgroundColor: '#0A101D', 
                            color: activeColor, // Warna teks yang diminta
                            boxShadow: `0 0 0 2px ${activeColor} inset`, // Garis tepi berwarna
                        }
                        : {};

                    return (
                        <div
                            key={item.key}
                            onClick={() => setActivePage(item.key)}
                            className={`flex items-center p-3 rounded-xl cursor-pointer transition-all duration-200 
                                ${isActive ? 'font-bold' : 'text-gray-400 hover:bg-[#1E293B] hover:text-white'}
                            `}
                            style={itemStyle}
                        >
                            <item.icon className="w-5 h-5 mr-3" />
                            <span>{item.name}</span>
                        </div>
                    );
                })}
            </nav>

            {/* Footer Sidebar (Contoh User) */}
            <div className={`p-4 border-t border-gray-800`}>
                <div className="flex items-center text-sm text-gray-400">
                    <div className={`w-8 h-8 rounded-full bg-[${COLOR_ACCENT_TEAL}] mr-3 flex items-center justify-center text-black font-semibold`}>
                        D
                    </div>
                    <div>
                        <p className={`text-[${COLOR_TEXT_PRIMARY}] font-medium`}>{DUMMY_DATA.userName}</p>
                        <p className="text-xs text-gray-500">Administrator</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

// --- Komponen Container Utama (SmartkosAppClient) ---

const SmartkosAppClient: React.FC = () => {
    const [activePage, setActivePage] = useState('dashboard');
    const dashboardData = DUMMY_DATA; 

    const renderContent = useCallback(() => {
        const NavCard: React.FC<{ children: React.ReactNode }> = ({ children }) => (
            <Card className="p-6">{children}</Card>
        );

        // Styling untuk halaman non-dashboard
        const ContentWrapper: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
             <div className={`p-4 md:p-10 w-full text-[${COLOR_TEXT_PRIMARY}]`}>
                <h2 className='text-3xl font-bold mb-4'>{title}</h2>
                {children}
            </div>
        );

        switch (activePage) {
            case 'dashboard':
                return (
                    <div className="p-4 md:p-8 w-full"> 
                         <DashboardMain data={dashboardData} />
                    </div>
                );
            case 'master-data-kamar':
                return <ContentWrapper title="Halaman Master Kamar"><NavCard>Modul pengelolaan Unit Kamar.</NavCard></ContentWrapper>;
            case 'jadwal-kamar':
                return <ContentWrapper title="Halaman Jadwal Ketersediaan Kamar"><NavCard>Modul visualisasi Bagan Gantt (Gantt Chart).</NavCard></ContentWrapper>;
            case 'penyewaan':
                return <ContentWrapper title="Halaman Penyewaan"><NavCard>Modul Booking dan Perpanjangan Sewa.</NavCard></ContentWrapper>;
            case 'keuangan':
                return <ContentWrapper title="Halaman Keuangan"><NavCard>Modul Tagihan dan Transaksi Log.</NavCard></ContentWrapper>;
            case 'master-data-kos':
                return <ContentWrapper title="Halaman Master Data (Kos & Pricing)"><NavCard>Modul pengelolaan Master Kos, Jenis Kamar, dan Pricing.</NavCard></ContentWrapper>;
            default:
                return (
                    <div className="p-10 text-center w-full text-gray-500">Halaman {activePage} tidak ditemukan.</div>
                );
        }
    }, [activePage, dashboardData]);

    return (
        // Wrapper utama menggunakan COLOR_BG_PRIMARY
        <div className={`min-h-screen bg-[${COLOR_BG_PRIMARY}] flex text-[${COLOR_TEXT_PRIMARY}]`}>
            {/* Sidebar (Fixed 64) */}
            <Sidebar activePage={activePage} setActivePage={setActivePage} />

            {/* Main Content (Margin kiri 64 untuk mengimbangi Sidebar) */}
            <main className="flex-1 ml-64 overflow-y-auto">
                {renderContent()}
            </main>
        </div>
    );
};

// Export komponen Client utama agar dapat di-render oleh Server Component default
export default function Page() {
    return <SmartkosAppClient />;
}

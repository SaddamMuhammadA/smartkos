// components/Dashboard/RecentBookings.js
import { useRouter } from 'next/router';
import { CalendarIcon, UserIcon, HomeIcon } from '@heroicons/react/24/outline';

export const RecentBookings = ({ bookings = [] }) => {
  const router = useRouter();

  const getStatusColor = (status) => {
    switch (status) {
      case 'Aktif': return 'bg-green-100 text-green-800';
      case 'Selesai': return 'bg-gray-100 text-gray-800';
      case 'Dibatalkan': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  if (bookings.length === 0) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-500">Belum ada penyewaan terbaru</p>
      </div>
    );
  }

  return (
    <div className="divide-y">
      {bookings.map((booking) => (
        <div
          key={booking.id_jadwal}
          className="p-6 hover:bg-gray-50 cursor-pointer"
          onClick={() => router.push(`/jadwal/${booking.id_jadwal}`)}
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center">
                <UserIcon className="h-5 w-5 text-gray-400 mr-2" />
                <span className="font-medium">{booking.customer?.nama_customer}</span>
              </div>
              <div className="mt-2 flex items-center text-sm text-gray-500">
                <HomeIcon className="h-4 w-4 mr-1" />
                <span>{booking.kamar?.kode_kamar} - {booking.kos?.nama_kos}</span>
              </div>
              <div className="mt-1 flex items-center text-sm text-gray-500">
                <CalendarIcon className="h-4 w-4 mr-1" />
                <span>{formatDate(booking.tanggal_mulai)} - {formatDate(booking.tanggal_selesai)}</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-lg font-semibold">
                  Rp {booking.total_harga?.toLocaleString('id-ID')}
                </div>
                <div className="text-sm text-gray-500">Total</div>
              </div>
              <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(booking.status_sewa)}`}>
                {booking.status_sewa}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
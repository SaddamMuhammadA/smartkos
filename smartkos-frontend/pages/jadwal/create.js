// pages/jadwal/create.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout/Layout';
import { useForm } from 'react-hook-form';
import { useKos } from '@/hooks/useKos';
import { useKamar } from '@/hooks/useKamar';
import { useCustomer } from '@/hooks/useCustomer';
import { useJadwal } from '@/hooks/useJadwal';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Swal from 'sweetalert2';

export default function CreateJadwalPage() {
  const router = useRouter();
  const { kos: kosId } = router.query;

  const [selectedKos, setSelectedKos] = useState(kosId || '');
  const [selectedKamar, setSelectedKamar] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(() => {
    const date = new Date();
    date.setMonth(date.getMonth() + 1);
    return date;
  });

  const { useGetAllKos } = useKos();
  const { useGetKamarByKos } = useKamar();
  const { useGetAllCustomers } = useCustomer();
  const { useCreateJadwal } = useJadwal();

  const { data: kosList } = useGetAllKos();
  const { data: kamarList } = useGetKamarByKos(selectedKos);
  const { data: customerList } = useGetAllCustomers();
  const createMutation = useCreateJadwal();

  const { register, handleSubmit, setValue, watch } = useForm();
  const durasi = watch('durasi');

  useEffect(() => {
    if (selectedKos) {
      setValue('id_kos', selectedKos);
    }
  }, [selectedKos, setValue]);

  const calculateTotal = () => {
    if (!durasi || !kamarList?.data) return 0;
    
    const selectedRoom = kamarList.data.find(k => k.id_kamar == selectedKamar);
    const harga = selectedRoom?.jenis_kamar?.harga || 0;
    
    let multiplier = 1;
    switch (durasi) {
      case 'monthly': multiplier = 30; break;
      case 'weekly': multiplier = 7; break;
      case 'yearly': multiplier = 365; break;
      default: multiplier = 1;
    }
    
    return harga * multiplier;
  };

  const onSubmit = async (data) => {
    const formData = {
      ...data,
      id_kamar: selectedKamar,
      id_customer: selectedCustomer,
      tanggal_mulai: startDate.toISOString().split('T')[0],
      tanggal_selesai: endDate.toISOString().split('T')[0],
      total_harga: calculateTotal(),
    };

    try {
      await createMutation.mutateAsync(formData);
      Swal.fire({
        title: 'Berhasil!',
        text: 'Jadwal sewa berhasil dibuat',
        icon: 'success',
      }).then(() => {
        router.push('/jadwal');
      });
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message || 'Gagal membuat jadwal',
        icon: 'error',
      });
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="text-blue-600 hover:text-blue-800"
          >
            ← Kembali
          </button>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <h1 className="text-2xl font-bold text-gray-900">Buat Jadwal Sewa</h1>
            <p className="text-gray-600">Isi informasi penyewaan kamar kos</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-8">
            {/* Step 1: Pilih Kos */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">1. Pilih Kos</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {kosList?.data?.map((kos) => (
                  <div
                    key={kos.id_kos}
                    onClick={() => setSelectedKos(kos.id_kos)}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      selectedKos === kos.id_kos
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-medium">{kos.nama_kos}</div>
                    <div className="text-sm text-gray-500 mt-1">{kos.alamat_kos}</div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm">{kos.jenis_kos}</span>
                      <span className="text-sm font-medium">
                        {kos.kamar_tersedia} kamar tersedia
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 2: Pilih Kamar */}
            {selectedKos && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">2. Pilih Kamar</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {kamarList?.data
                    ?.filter(k => k.status_kamar === 'Tersedia')
                    .map((kamar) => (
                      <div
                        key={kamar.id_kamar}
                        onClick={() => setSelectedKamar(kamar.id_kamar)}
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          selectedKamar === kamar.id_kamar
                            ? 'border-green-500 bg-green-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-medium">Kamar {kamar.kode_kamar}</div>
                            <div className="text-sm text-gray-500">
                              {kamar.jenis_kamar?.nama_jenis_kamar}
                            </div>
                          </div>
                          <div className="text-lg font-bold text-green-600">
                            Rp {kamar.jenis_kamar?.harga?.toLocaleString('id-ID')}
                          </div>
                        </div>
                        {kamar.catatan && (
                          <div className="mt-2 text-sm text-gray-600">
                            {kamar.catatan}
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Step 3: Pilih Penyewa */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">3. Pilih Penyewa</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cari Penyewa
                    </label>
                    <select
                      value={selectedCustomer}
                      onChange={(e) => setSelectedCustomer(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    >
                      <option value="">Pilih Penyewa</option>
                      {customerList?.data?.map((customer) => (
                        <option key={customer.id_customer} value={customer.id_customer}>
                          {customer.nama_customer} - {customer.no_telp}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-end">
                    <button
                      type="button"
                      onClick={() => router.push('/customer/create')}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      + Tambah Penyewa Baru
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4: Periode Sewa */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">4. Periode Sewa</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tanggal Mulai
                  </label>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    dateFormat="dd/MM/yyyy"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    minDate={new Date()}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tanggal Selesai
                  </label>
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    dateFormat="dd/MM/yyyy"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    minDate={startDate}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Durasi Sewa
                  </label>
                  <select
                    {...register('durasi')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="daily">Harian</option>
                    <option value="weekly">Mingguan</option>
                    <option value="monthly">Bulanan</option>
                    <option value="yearly">Tahunan</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Step 5: Pembayaran */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">5. Pembayaran</h3>
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Harga per malam:</span>
                    <span className="font-medium">
                      Rp {kamarList?.data?.find(k => k.id_kamar == selectedKamar)?.jenis_kamar?.harga?.toLocaleString('id-ID') || 0}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Durasi:</span>
                    <span className="font-medium">{durasi || '-'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Deposit:</span>
                    <span className="font-medium">Rp 500.000</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total:</span>
                      <span className="text-green-600">
                        Rp {calculateTotal().toLocaleString('id-ID')}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Metode Pembayaran
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    {['Tunai', 'Transfer Bank', 'QRIS', 'Lainnya'].map((method) => (
                      <label key={method} className="flex items-center">
                        <input
                          type="radio"
                          {...register('metode_pembayaran')}
                          value={method}
                          className="h-4 w-4 text-blue-600"
                        />
                        <span className="ml-2">{method}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-4 pt-6 border-t">
              <button
                type="button"
                onClick={() => router.push('/jadwal')}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={!selectedKamar || !selectedCustomer || createMutation.isLoading}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {createMutation.isLoading ? 'Menyimpan...' : 'Buat Jadwal Sewa'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
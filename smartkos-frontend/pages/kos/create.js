// pages/kos/create.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout/Layout';
import { useForm } from 'react-hook-form';
import { useKos } from '@/hooks/useKos';
import Swal from 'sweetalert2';

export default function CreateKosPage() {
  const router = useRouter();
  const { useCreateKos } = useKos();
  const createMutation = useCreateKos();
  
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await createMutation.mutateAsync(data);
      Swal.fire({
        title: 'Berhasil!',
        text: 'Kos berhasil ditambahkan',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        router.push('/kos');
      });
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message || 'Gagal menambahkan kos',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    } finally {
      setLoading(false);
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
            <h1 className="text-2xl font-bold text-gray-900">Tambah Kos Baru</h1>
            <p className="text-gray-600">Isi informasi kos yang akan ditambahkan</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Nama Kos */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Kos *
                </label>
                <input
                  type="text"
                  {...register('nama_kos', { required: 'Nama kos wajib diisi' })}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.nama_kos ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Contoh: Kos Bahagia"
                />
                {errors.nama_kos && (
                  <p className="mt-1 text-sm text-red-600">{errors.nama_kos.message}</p>
                )}
              </div>

              {/* Jenis Kos */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Jenis Kos *
                </label>
                <select
                  {...register('jenis_kos', { required: 'Jenis kos wajib dipilih' })}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.jenis_kos ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Pilih Jenis Kos</option>
                  <option value="Putra">Putra</option>
                  <option value="Putri">Putri</option>
                  <option value="Campur">Campur</option>
                </select>
                {errors.jenis_kos && (
                  <p className="mt-1 text-sm text-red-600">{errors.jenis_kos.message}</p>
                )}
              </div>

              {/* Alamat */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Alamat Lengkap *
                </label>
                <textarea
                  {...register('alamat_kos', { required: 'Alamat wajib diisi' })}
                  rows={3}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.alamat_kos ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Contoh: Jl. Merdeka No. 123, Jakarta Pusat"
                />
                {errors.alamat_kos && (
                  <p className="mt-1 text-sm text-red-600">{errors.alamat_kos.message}</p>
                )}
              </div>

              {/* Contact Info */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nomor Telepon
                </label>
                <input
                  type="tel"
                  {...register('no_telp')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="0812-3456-7890"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  {...register('email')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="kos@example.com"
                />
              </div>
            </div>

            {/* Additional Information */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Informasi Tambahan</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Jumlah Lantai
                  </label>
                  <input
                    type="number"
                    {...register('jumlah_lantai')}
                    min="1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tahun Berdiri
                  </label>
                  <input
                    type="number"
                    {...register('tahun_berdiri')}
                    min="1900"
                    max={new Date().getFullYear()}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="2020"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Luas Tanah (m²)
                  </label>
                  <input
                    type="number"
                    {...register('luas_tanah')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="200"
                  />
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-4 pt-6 border-t">
              <button
                type="button"
                onClick={() => router.push('/kos')}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                disabled={loading}
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Menyimpan...
                  </span>
                ) : (
                  'Simpan Kos'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
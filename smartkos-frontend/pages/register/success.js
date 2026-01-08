// pages/register/success.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function RegisterSuccessPage() {
  const router = useRouter();
  
  // Auto redirect setelah 5 detik
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/login');
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12">
            <svg className="h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Pendaftaran Berhasil!
          </h2>
          
          <div className="mt-4 text-gray-600">
            <p className="mb-2">
              Selamat! Akun Anda telah berhasil dibuat.
            </p>
            <p className="mb-4">
              Silakan cek email Anda untuk verifikasi akun.
            </p>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">
                    Periksa folder spam
                  </h3>
                  <div className="mt-2 text-sm text-yellow-700">
                    <p>
                      Jika Anda tidak menerima email verifikasi, 
                      periksa folder spam atau junk email Anda.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <div>
              <Link
                href="/login"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Masuk ke Akun
              </Link>
            </div>
            
            <div>
              <button
                onClick={() => router.push('/')}
                className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Kembali ke Beranda
              </button>
            </div>
            
            <div className="text-sm text-gray-500">
              Anda akan diarahkan ke halaman login dalam 5 detik...
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              Butuh bantuan?{' '}
              <Link href="/contact" className="text-blue-600 hover:text-blue-500">
                Hubungi Support
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
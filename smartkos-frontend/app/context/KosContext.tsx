'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

// 🔹 Tipe data untuk context
interface KosContextType {
  selectedKos: string;
  setSelectedKos: (value: string) => void;
}

// 🔹 Context default
const KosContext = createContext<KosContextType | undefined>(undefined);

// 🔹 Provider
export function KosProvider({ children }: { children: ReactNode }) {
  const [selectedKos, setSelectedKos] = useState('SmartKos 1');

  return (
    <KosContext.Provider value={{ selectedKos, setSelectedKos }}>
      {children}
    </KosContext.Provider>
  );
}

// 🔹 Hook untuk akses mudah
export function useKos() {
  const context = useContext(KosContext);
  if (!context) {
    throw new Error('useKos must be used within a KosProvider');
  }
  return context;
}

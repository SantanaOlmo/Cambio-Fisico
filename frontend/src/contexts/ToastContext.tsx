import React, { createContext, useContext } from 'react';
import { useToast, ToastItem } from '../hooks/useToast';

interface ToastContextValue {
  toasts: ToastItem[];
  removeToast: (id: string) => void;
  toast: {
    success: (msg: string) => void;
    error: (msg: string) => void;
    info: (msg: string) => void;
    warning: (msg: string) => void;
  };
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const toastState = useToast();
  return (
    <ToastContext.Provider value={toastState}>{children}</ToastContext.Provider>
  );
}

export function useToastContext(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToastContext must be used within <ToastProvider>');
  return ctx;
}

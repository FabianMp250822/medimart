'use client';

import { useAuth } from '@/components/providers/auth-context';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { Icons } from '@/components/icons';

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user && pathname.startsWith('/dashboard')) {
      router.push('/login');
    }
  }, [user, loading, router, pathname]);

  if (loading) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-slate-50 gap-4">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary animate-bounce">
          <Icons.stethoscope className="w-8 h-8" />
        </div>
        <div className="flex flex-col items-center gap-1">
          <p className="font-bold text-slate-800 animate-pulse">Cargando Panel...</p>
          <div className="flex gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-bounce [animation-delay:-0.3s]" />
            <div className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-bounce [animation-delay:-0.15s]" />
            <div className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-bounce" />
          </div>
        </div>
      </div>
    );
  }

  if (!user && pathname.startsWith('/dashboard')) {
    return null;
  }

  return <>{children}</>;
};


'use client';

import { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { imedicAuth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { DashboardSidebar } from '@/components/pacientes/dashboard-sidebar';
import { ProfileView } from '@/components/pacientes/dashboard/profile-view';
import { AppointmentsView } from '@/components/pacientes/dashboard/appointments-view';
import { ResultsView } from '@/components/pacientes/dashboard/results-view';
import { ChatView } from '@/components/pacientes/dashboard/chat-view';
import { Loader2 } from 'lucide-react';
import type { User } from 'firebase/auth';

export default function DashboardPage() {
  const [user, loading, error] = useAuthState(imedicAuth);
  const [activeView, setActiveView] = useState('profile');
  const router = useRouter();

  // This effect will ensure that the user object is available before rendering the views
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  
  useEffect(() => {
    if (user) {
      setCurrentUser(user);
    }
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Error: {error.message}</p>
      </div>
    );
  }

  if (!user) {
    router.push('/pacientes/solicitar-cita');
    return (
        <div className="flex items-center justify-center min-h-screen">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="ml-4">Redirigiendo a inicio de sesión...</p>
        </div>
    );
  }

  const renderContent = () => {
    if (!currentUser) {
       return <div className="flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
    }

    switch (activeView) {
      case 'profile':
        return <ProfileView user={currentUser} />;
      case 'appointments':
        return <AppointmentsView user={currentUser} />;
      case 'results':
        return <ResultsView />;
      case 'chat':
        return <ChatView />;
      default:
        return <ProfileView user={currentUser} />;
    }
  };

  return (
    <div className="grid lg:grid-cols-4 gap-12 items-start">
      <aside className="lg:col-span-1">
        <DashboardSidebar activeView={activeView} setActiveView={setActiveView} />
      </aside>
      <main className="lg:col-span-3">
        {renderContent()}
      </main>
    </div>
  );
}

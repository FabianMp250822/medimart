
'use client';

import { useRouter } from 'next/navigation';
import { useSignOut } from 'react-firebase-hooks/auth';
import { imedicAuth } from '@/lib/firebase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { User, Calendar, FileText, MessageSquare, LogOut } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DashboardSidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
}

const menuItems = [
  { id: 'profile', label: 'Mi Perfil', icon: User },
  { id: 'appointments', label: 'Agendar Cita', icon: Calendar },
  { id: 'results', label: 'Resultados Médicos', icon: FileText },
  { id: 'chat', label: 'Chat de Soporte', icon: MessageSquare },
];

export function DashboardSidebar({ activeView, setActiveView }: DashboardSidebarProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [signOut, loading, error] = useSignOut(imedicAuth as any);

  const handleSignOut = async () => {
    const success = await signOut();
    if (success) {
      toast({ title: 'Has cerrado sesión exitosamente.' });
      router.push('/pacientes/solicitar-cita');
    }
    if (error) {
      toast({ variant: 'destructive', title: 'Error', description: error.message });
    }
  };

  return (
    <Card className="sticky top-24 shadow-md">
      <CardHeader>
        <CardTitle className="text-xl text-primary">Portal del Paciente</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col space-y-2">
        {menuItems.map((item) => (
          <Button
            key={item.id}
            variant="ghost"
            onClick={() => setActiveView(item.id)}
            className={cn(
              "justify-start gap-3 px-3",
              activeView === item.id && "bg-accent text-accent-foreground"
            )}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </Button>
        ))}
        <Button
          variant="ghost"
          onClick={handleSignOut}
          disabled={loading}
          className="justify-start gap-3 px-3 text-destructive hover:text-destructive"
        >
          <LogOut className="h-5 w-5" />
          <span>Cerrar Sesión</span>
        </Button>
      </CardContent>
    </Card>
  );
}

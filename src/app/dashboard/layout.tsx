'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { cn } from '@/lib/utils';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/components/providers/auth-context';
import { AuthGuard } from '@/components/auth/auth-guard';
import { toast } from '@/hooks/use-toast';

const sidebarItems = [
  { name: 'Dashboard', href: '/dashboard', icon: 'dashboard' },
  { name: 'Crear Perfil Web', href: '/dashboard/profile', icon: 'plus' },
  { name: 'Médicos', href: '/dashboard/doctors', icon: 'users' },
  { name: 'Crear Blog', href: '/dashboard/blog', icon: 'fileText' },
  { name: 'Crear Oferta', href: '/dashboard/offers', icon: 'tag' },
  { name: 'Postulaciones', href: '/dashboard/applications', icon: 'briefcase' },
  { name: 'Comentarios', href: '/dashboard/comments', icon: 'message' },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/login');
      toast({
        title: 'Sesión cerrada',
        description: 'Has salido del sistema correctamente.',
      });
    } catch (error) {
      console.error('Error logging out:', error);
      toast({
        title: 'Error',
        description: 'No se pudo cerrar la sesión.',
        variant: 'destructive',
      });
    }
  };

  return (
    <AuthGuard>
      <div className="min-h-screen bg-[#f8fafc] flex">
        {/* Sidebar */}
        <aside 
          className={cn(
            "bg-white border-r border-slate-200 transition-all duration-300 ease-in-out flex flex-col z-20 sticky top-0 h-screen",
            isSidebarOpen ? "w-64" : "w-20"
          )}
        >
          <div className="p-6 flex items-center justify-between overflow-hidden">
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white shrink-0">
                 <Icons.stethoscope className="w-5 h-5" />
              </div>
              {isSidebarOpen && (
                <span className="font-bold text-xl text-slate-800 tracking-tight">Clínica de la Costa</span>
              )}
            </Link>
          </div>

          <nav className="flex-1 px-4 space-y-1 mt-4 scrollbar-hide overflow-y-auto">
            {sidebarItems.map((item) => {
              const Icon = (Icons as any)[item.icon];
              const isActive = pathname === item.href;

              return (
                <Link key={item.name} href={item.href}>
                  <div className={cn(
                    "flex items-center gap-3 px-3 py-3 rounded-xl transition-all group",
                    isActive 
                      ? "bg-primary/10 text-primary" 
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                  )}>
                    <Icon className={cn(
                      "w-5 h-5 shrink-0",
                      isActive ? "text-primary" : "group-hover:text-slate-900"
                    )} />
                    {isSidebarOpen && (
                      <span className="font-medium text-sm truncate">{item.name}</span>
                    )}
                    {!isSidebarOpen && (
                      <div className="absolute left-20 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">
                        {item.name}
                      </div>
                    )}
                  </div>
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-slate-100 italic">
             <Button 
               variant="ghost" 
               onClick={handleLogout}
               className={cn(
                 "w-full flex items-center gap-3 text-slate-500 hover:text-red-500 hover:bg-red-50 py-3 rounded-xl",
                 !isSidebarOpen && "justify-center"
               )}
             >
               <Icons.logout className="w-5 h-5" />
               {isSidebarOpen && <span className="font-medium text-sm">Cerrar Sesión</span>}
             </Button>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <header className="h-16 bg-white/80 backdrop-blur-md border-bottom border-slate-200 sticky top-0 z-10 flex items-center justify-between px-6">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="text-slate-500"
              >
                <Icons.menu className="w-5 h-5" />
              </Button>
              <div className="relative hidden md:block w-64">
                 <Icons.search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                 <input 
                   type="text" 
                   placeholder="Buscar..."
                   className="w-full pl-10 pr-4 py-2 bg-slate-100 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                 />
              </div>
            </div>

            <div className="flex items-center gap-4">
               <Button variant="ghost" size="icon" className="text-slate-500 relative">
                  <Icons.bell className="w-5 h-5" />
                  <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
               </Button>

               <div className="h-8 w-[1px] bg-slate-200 mx-2 hidden sm:block"></div>

               <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="p-1 hover:bg-slate-100 rounded-lg flex items-center gap-2">
                       <Avatar className="h-8 w-8 ring-2 ring-primary/10">
                        <AvatarImage src="" />
                        <AvatarFallback className="bg-primary/10 text-primary font-bold">DR</AvatarFallback>
                      </Avatar>
                      <div className="hidden sm:block text-left">
                         <p className="text-xs font-bold text-slate-800">Dr. Rodríguez</p>
                         <p className="text-[10px] text-slate-500">Administrador</p>
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Mi Perfil</DropdownMenuItem>
                    <DropdownMenuItem>Ajustes</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-500" onClick={handleLogout}>
                      Cerrar Sesión
                    </DropdownMenuItem>
                  </DropdownMenuContent>
               </DropdownMenu>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 p-6 overflow-x-hidden overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </AuthGuard>
  );
}

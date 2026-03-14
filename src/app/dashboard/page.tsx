'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function DashboardPage() {
  const stats = [
    { name: 'Posts Blog', value: '45', icon: 'fileText', color: 'bg-blue-500' },
    { name: 'Postulaciones', value: '18', icon: 'briefcase', color: 'bg-green-500' },
    { name: 'Ofertas Activas', value: '6', icon: 'tag', color: 'bg-purple-500' },
    { name: 'Nuevos Comentarios', value: '12', icon: 'message', color: 'bg-orange-500' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Bienvenido al Panel Administrativo</h1>
          <p className="text-slate-500">Gestión de contenidos, talento y comunicación de la Clínica.</p>
        </div>
        <div className="flex items-center gap-3">
           <Button variant="outline" className="bg-white">
              <Icons.fileText className="w-4 h-4 mr-2" />
              Ver Sitio Web
           </Button>
           <Button className="bg-primary text-white hover:bg-primary/90">
              <Icons.plus className="w-4 h-4 mr-2" />
              Nuevo Contenido
           </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = (Icons as any)[stat.icon];
          return (
            <Card key={stat.name} className="border-none shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl ${stat.color} flex items-center justify-center text-white`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500">{stat.name}</p>
                    <h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Applications */}
        <Card className="lg:col-span-2 border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-bold">Últimas Postulaciones</CardTitle>
            <Button variant="link" className="text-primary text-xs">Ver todas</Button>
          </CardHeader>
          <CardContent>
             <div className="space-y-6">
                {[
                  { name: 'Carlos Mendoza', role: 'Médico General', time: 'Hoy, 09:15 AM' },
                  { name: 'Ana Sofía Pérez', role: 'Enfermera Especialista', time: 'Ayer, 04:30 PM' },
                  { name: 'Roberto Gómez', role: 'Radiólogo', time: '12 de Marzo' },
                ].map((app, i) => (
                  <div key={i} className="flex items-center justify-between group cursor-pointer">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src="" />
                        <AvatarFallback className="bg-slate-100 text-slate-600">{app.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                         <p className="text-sm font-bold text-slate-800">{app.name}</p>
                         <p className="text-xs text-slate-500">{app.role} • {app.time}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                       <Button size="icon" variant="ghost" className="h-8 w-8 text-slate-400 hover:text-primary">
                          <Icons.fileText className="h-4 w-4" />
                       </Button>
                       <Button size="icon" variant="ghost" className="h-8 w-8 text-slate-400">
                          <Icons.moreVertical className="h-4 w-4" />
                       </Button>
                    </div>
                  </div>
                ))}
             </div>
          </CardContent>
        </Card>

        {/* Activity Feed */}
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Contenido Reciente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
               {[
                 { text: 'Nuevo blog publicado: "Avances en Cirugía"', time: 'Hace 15 min' },
                 { text: 'Oferta laboral: "Auxiliar Administrativo" lanzada', time: 'Hace 45 min' },
                 { text: 'Comentario aprobado en artículo de Nutrición', time: 'Hace 1 hora' },
                 { text: 'Perfil de profesional actualizado: Dr. Ruiz', time: 'Hace 3 horas' },
               ].map((activity, i) => (
                 <div key={i} className="flex gap-3 relative pb-6 last:pb-0">
                   {i !== 3 && <div className="absolute left-[11px] top-6 w-[2px] h-full bg-slate-100"></div>}
                   <div className="w-6 h-6 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center shrink-0 z-10">
                      <div className="w-2 h-2 rounded-full bg-slate-400"></div>
                   </div>
                   <div>
                      <p className="text-sm text-slate-800">{activity.text}</p>
                      <p className="text-[10px] text-slate-400 uppercase font-bold mt-1">{activity.time}</p>
                   </div>
                 </div>
               ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

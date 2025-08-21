
"use client";

import { useState, useMemo } from 'react';
import { Medico } from '@/types/medico';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface EspecialistasListProps {
  especialistas: Medico[];
}

// Función para normalizar texto: a minúsculas, sin acentos y sin espacios extra.
const normalizeText = (text: string | undefined | null): string => {
    if (!text) return '';
    return text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim();
};


export function EspecialistasList({ especialistas }: EspecialistasListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');

  const specialties = useMemo(() => {
    const specialtyMap = new Map<string, string>();
    especialistas.forEach(e => {
        const specialtyName = e.especialidad?.trim();
        if (specialtyName) {
            const normalized = normalizeText(specialtyName);
            if (!specialtyMap.has(normalized)) {
                specialtyMap.set(normalized, specialtyName); // Guardar el nombre original bien escrito
            }
        }
    });
    
    const sortedSpecialties = Array.from(specialtyMap.values()).sort((a, b) => a.localeCompare(b, 'es', { sensitivity: 'base' }));
    return ['all', ...sortedSpecialties];
  }, [especialistas]);


  const filteredEspecialistas = useMemo(() => {
    return especialistas.filter(especialista => {
      const matchesSearch = searchTerm === '' ||
        normalizeText(especialista.nombreCompleto).includes(normalizeText(searchTerm)) ||
        normalizeText(especialista.especialidad).includes(normalizeText(searchTerm));
      
      const matchesSpecialty = selectedSpecialty === 'all' || normalizeText(especialista.especialidad) === normalizeText(selectedSpecialty);

      return matchesSearch && matchesSpecialty;
    });
  }, [especialistas, searchTerm, selectedSpecialty]);

  return (
    <div className="grid lg:grid-cols-4 gap-12">
      {/* Sidebar de filtros */}
      <aside className="lg:col-span-1 space-y-6 sticky top-24 self-start">
        <Card>
            <CardContent className="p-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                        type="text"
                        placeholder="Buscar por nombre..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-full"
                    />
                </div>
            </CardContent>
        </Card>
        <Card>
            <CardContent className="p-4">
                <h3 className="font-semibold text-lg text-primary mb-4">Especialidades</h3>
                <ScrollArea className="h-96">
                  <div className="space-y-2 flex flex-col items-start pr-4">
                      {specialties.map(specialty => (
                          <Button
                              key={specialty}
                              variant={selectedSpecialty === specialty ? 'default' : 'ghost'}
                              onClick={() => setSelectedSpecialty(specialty)}
                              className={`w-full justify-start text-left h-auto py-2 px-3 ${selectedSpecialty === specialty ? 'bg-accent text-accent-foreground' : 'text-foreground'}`}
                          >
                              {specialty === 'all' ? 'Todas las especialidades' : specialty}
                          </Button>
                      ))}
                  </div>
                </ScrollArea>
            </CardContent>
        </Card>
      </aside>

      {/* Grid de especialistas */}
      <div className="lg:col-span-3">
        {filteredEspecialistas.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredEspecialistas.map(especialista => (
              <Card key={especialista.id} className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col group">
                <CardContent className="p-6 flex flex-col flex-grow items-center">
                    <Link href={`/especialistas/${especialista.id}`} className="block">
                        <Avatar className="h-32 w-32 mb-4 border-4 border-transparent group-hover:border-accent transition-colors duration-300">
                            <AvatarImage src={especialista.profileImage} alt={especialista.nombreCompleto} />
                            <AvatarFallback>{especialista.nombreCompleto.charAt(0)}</AvatarFallback>
                        </Avatar>
                    </Link>
                    <h3 className="text-lg font-bold text-primary">
                        <Link href={`/especialistas/${especialista.id}`} className="hover:underline">{especialista.nombreCompleto}</Link>
                    </h3>
                    <p className="text-accent font-medium mb-4">{especialista.especialidad}</p>
                    <Button asChild size="sm" className="mt-auto bg-accent hover:bg-accent/90">
                        <Link href={`/especialistas/${especialista.id}`}>Ver Perfil</Link>
                    </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 lg:col-span-3">
            <h2 className="text-2xl font-semibold text-primary">No se encontraron especialistas</h2>
            <p className="text-muted-foreground mt-4">Intente ajustar su búsqueda o filtros.</p>
          </div>
        )}
      </div>
    </div>
  );
}

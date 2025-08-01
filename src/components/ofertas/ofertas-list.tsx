"use client";

import { useState, useMemo, useEffect } from 'react';
import { OfertaEmpleo } from '@/types/oferta-empleo';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { JobOfferCard } from './job-offer-card';
import { ApplyModal } from './apply-modal';
import { ImportantNoticeDialog } from './important-notice-dialog';
import { PaginationComponent } from './pagination';

interface OfertasListProps {
  ofertas: OfertaEmpleo[];
}

export function OfertasList({ ofertas }: OfertasListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    ubicacion: 'all',
    tipoContrato: 'all',
    jornada: 'all',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNoticeOpen, setIsNoticeOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const offersPerPage = 6;

  useEffect(() => {
    const noticeShown = sessionStorage.getItem('jobNoticeShown');
    if (!noticeShown) {
      setIsNoticeOpen(true);
      sessionStorage.setItem('jobNoticeShown', 'true');
    }
  }, []);

  const handleFilterChange = (filterName: keyof typeof filters, value: string) => {
    setFilters(prev => ({ ...prev, [filterName]: value }));
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setFilters({ ubicacion: 'all', tipoContrato: 'all', jornada: 'all' });
    setSearchTerm('');
    setCurrentPage(1);
  };

  const uniqueOptions = useMemo(() => {
    const ubicaciones = new Set<string>();
    const tiposContrato = new Set<string>();
    const jornadas = new Set<string>();
    ofertas.forEach(o => {
      ubicaciones.add(o.ubicacion);
      tiposContrato.add(o.tipoContrato);
      jornadas.add(o.jornada);
    });
    return {
      ubicaciones: Array.from(ubicaciones).sort(),
      tiposContrato: Array.from(tiposContrato).sort(),
      jornadas: Array.from(jornadas).sort(),
    };
  }, [ofertas]);

  const filteredOfertas = useMemo(() => {
    return ofertas.filter(oferta => {
      const matchesSearch = searchTerm === '' ||
        oferta.titulo.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(searchTerm.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""));
      
      const matchesUbicacion = filters.ubicacion === 'all' || oferta.ubicacion === filters.ubicacion;
      const matchesTipoContrato = filters.tipoContrato === 'all' || oferta.tipoContrato === filters.tipoContrato;
      const matchesJornada = filters.jornada === 'all' || oferta.jornada === filters.jornada;

      return matchesSearch && matchesUbicacion && matchesTipoContrato && matchesJornada;
    });
  }, [ofertas, searchTerm, filters]);

  const totalPages = Math.ceil(filteredOfertas.length / offersPerPage);
  const currentOffers = filteredOfertas.slice((currentPage - 1) * offersPerPage, currentPage * offersPerPage);

  const hasActiveFilters = filters.ubicacion !== 'all' || filters.tipoContrato !== 'all' || filters.jornada !== 'all' || searchTerm !== '';

  return (
    <>
      <ImportantNoticeDialog open={isNoticeOpen} onOpenChange={setIsNoticeOpen} />
      <ApplyModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      
      <div className="grid lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1 space-y-6 sticky top-24 self-start">
          <Card className="shadow-md">
            <CardHeader className="flex-row items-center justify-between">
                <h3 className="font-semibold text-lg text-primary flex items-center gap-2"><SlidersHorizontal className="h-5 w-5"/> Filtros</h3>
                {hasActiveFilters && (
                    <Button variant="ghost" size="sm" onClick={clearFilters} className="text-xs">
                        <X className="h-3 w-3 mr-1"/> Limpiar
                    </Button>
                )}
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              <div className="space-y-1">
                <label className="text-sm font-medium text-muted-foreground">Ubicación</label>
                <Select value={filters.ubicacion} onValueChange={(value) => handleFilterChange('ubicacion', value)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas</SelectItem>
                    {uniqueOptions.ubicaciones.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
               <div className="space-y-1">
                <label className="text-sm font-medium text-muted-foreground">Tipo de Contrato</label>
                <Select value={filters.tipoContrato} onValueChange={(value) => handleFilterChange('tipoContrato', value)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    {uniqueOptions.tiposContrato.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-muted-foreground">Jornada</label>
                <Select value={filters.jornada} onValueChange={(value) => handleFilterChange('jornada', value)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas</SelectItem>
                    {uniqueOptions.jornadas.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </aside>

        <div className="lg:col-span-3 space-y-8">
          <Card className="shadow-md">
            <CardContent className="p-4 flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="relative w-full sm:flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Buscar por cargo (p. ej. Enfermera, Médico)"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="pl-10 w-full"
                />
              </div>
              <div className="text-center sm:text-right">
                <p className="text-sm text-muted-foreground">¿No encuentras lo que buscas?</p>
                <Button variant="link" className="p-0 h-auto" onClick={() => setIsModalOpen(true)}>
                  Deja tu hoja de vida aquí
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {filteredOfertas.length > 0 ? (
            <div className="space-y-6">
              <p className="text-sm text-muted-foreground">Mostrando {filteredOfertas.length} oferta(s)</p>
              <div className="grid grid-cols-1 gap-6">
                {currentOffers.map(oferta => (
                  <JobOfferCard key={oferta.id} oferta={oferta} />
                ))}
              </div>
              {totalPages > 1 && (
                <PaginationComponent
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
              )}
            </div>
          ) : (
            <div className="text-center py-20 lg:col-span-3 bg-gray-50 rounded-lg">
              <h2 className="text-2xl font-semibold text-primary">No se encontraron ofertas</h2>
              <p className="text-muted-foreground mt-4">Intenta ajustar tu búsqueda o filtros, o déjanos tu hoja de vida.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

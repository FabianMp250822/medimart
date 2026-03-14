'use client';

import { useState, useEffect } from 'react';
import { Postulacion, ApplicationStatus } from '@/types/postulacion';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { db } from '@/lib/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { cn } from '@/lib/utils';

interface FollowUpModalProps {
  application: Postulacion | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (updatedApp: Postulacion) => void;
}

export function FollowUpModal({ application, isOpen, onClose, onUpdate }: FollowUpModalProps) {
  const [formData, setFormData] = useState({
    entrevistaLink: '',
    entrevistaRealizada: false,
    entrevistaReporte: '',
    entrevistaAprobado: false,
    documentacionRecibida: false,
    documentacionVerificada: false,
    documentacionObservaciones: '',
    estado: 'Pendiente' as ApplicationStatus
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (isOpen && application) {
      setFormData({
        entrevistaLink: application.entrevistaLink || '',
        entrevistaRealizada: !!application.entrevistaRealizada,
        entrevistaReporte: application.entrevistaReporte || '',
        entrevistaAprobado: !!application.entrevistaAprobado,
        documentacionRecibida: !!application.documentacionRecibida,
        documentacionVerificada: !!application.documentacionVerificada,
        documentacionObservaciones: application.documentacionObservaciones || '',
        estado: application.estado || 'Pendiente'
      });
    }
  }, [isOpen, application]);

  if (!application) return null;

  const handleSave = async (forceStatus?: ApplicationStatus) => {
    try {
      setIsSaving(true);
      const newStatus = forceStatus || formData.estado;
      const updateData = {
        entrevistaLink: formData.entrevistaLink,
        entrevistaRealizada: formData.entrevistaRealizada,
        entrevistaReporte: formData.entrevistaReporte,
        entrevistaAprobado: formData.entrevistaAprobado,
        documentacionRecibida: formData.documentacionRecibida,
        documentacionVerificada: formData.documentacionVerificada,
        documentacionObservaciones: formData.documentacionObservaciones,
        estado: newStatus
      };

      if (!db) return;
      await updateDoc(doc(db, 'postulaciones', application.id), updateData);
      
      onUpdate({ ...application, ...updateData });
      toast({ 
        title: forceStatus ? `Estado: ${forceStatus}` : "Seguimiento guardado", 
        description: "Los cambios se han aplicado correctamente." 
      });
      if (forceStatus) onClose();
    } catch (error) {
      console.error("Error saving follow-up: ", error);
      toast({ title: "Error", description: "No se pudo guardar la información.", variant: "destructive" });
    } finally {
      setIsSaving(false);
    }
  };

  const assignInterview = () => {
    setFormData(prev => ({ 
      ...prev, 
      entrevistaLink: 'https://meet.google.com/new',
      estado: 'En Proceso' 
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0 border-none shadow-2xl rounded-3xl overflow-hidden">
        <DialogHeader className="p-6 bg-slate-50 border-b">
          <DialogTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Icons.user className="w-4 h-4" />
            </div>
            Seguimiento de {application.nombresApellidos || (application as any).nombre}
          </DialogTitle>
        </DialogHeader>

        <div className="p-8 space-y-8">
          {/* Entrevista */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                <Icons.calendar className="w-4 h-4 text-blue-500" /> Entrevista
              </h3>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={assignInterview}
                className="text-[10px] font-bold h-7 px-3 border-blue-200 text-blue-600 hover:bg-blue-50"
              >
                ASIGNAR ENTREVISTA
              </Button>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-xs text-slate-500 font-medium">Enlace o información de la reunión de Google Meet</Label>
                <Input 
                  placeholder="https://meet.google.com/abc-defg-hij" 
                  value={formData.entrevistaLink}
                  onChange={(e) => setFormData(prev => ({ ...prev, entrevistaLink: e.target.value }))}
                  className="bg-slate-50 border-slate-200 focus:bg-white transition-all"
                />
              </div>
              <div className="flex items-center space-x-2 bg-slate-50 p-3 rounded-xl border border-dashed border-slate-200">
                <Checkbox 
                  id="realizada" 
                  checked={formData.entrevistaRealizada}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, entrevistaRealizada: !!checked }))}
                />
                <label htmlFor="realizada" className="text-sm font-medium text-slate-700 cursor-pointer">Realizada</label>
              </div>
              <div className="space-y-2">
                <Label className="text-xs text-slate-500 font-medium">Reporte de Entrevista</Label>
                <Textarea 
                  placeholder="Detalles sobre el desempeño del candidato..."
                  value={formData.entrevistaReporte}
                  onChange={(e) => setFormData(prev => ({ ...prev, entrevistaReporte: e.target.value }))}
                  className="min-h-[100px] bg-slate-50 border-slate-200 focus:bg-white transition-all"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="aprobado" 
                  checked={formData.entrevistaAprobado}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, entrevistaAprobado: !!checked }))}
                />
                <label htmlFor="aprobado" className="text-sm font-medium text-slate-700 cursor-pointer">Aprobado</label>
              </div>
            </div>
          </section>

          <Separator className="bg-slate-100" />

          {/* Documentación */}
          <section className="space-y-4">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <Icons.fileText className="w-4 h-4 text-amber-500" /> Documentación
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2 bg-slate-50 p-3 rounded-xl border border-dashed border-slate-200">
                <Checkbox 
                  id="recibida" 
                  checked={formData.documentacionRecibida}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, documentacionRecibida: !!checked }))}
                />
                <label htmlFor="recibida" className="text-sm font-medium text-slate-700 cursor-pointer font-bold">Recibida</label>
              </div>
              <div className="flex items-center space-x-2 bg-slate-50 p-3 rounded-xl border border-dashed border-slate-200">
                <Checkbox 
                  id="verificada" 
                  checked={formData.documentacionVerificada}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, documentacionVerificada: !!checked }))}
                />
                <label htmlFor="verificada" className="text-sm font-medium text-slate-700 cursor-pointer font-bold">Verificada</label>
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-xs text-slate-500 font-medium">Observaciones</Label>
              <Textarea 
                placeholder="Notas sobre la documentación recibida..."
                value={formData.documentacionObservaciones}
                onChange={(e) => setFormData(prev => ({ ...prev, documentacionObservaciones: e.target.value }))}
                className="bg-slate-50 border-slate-200 focus:bg-white transition-all"
              />
            </div>
            <Button 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold h-10 rounded-xl shadow-md gap-2"
              onClick={() => toast({ title: "Solicitud enviada", description: "Se ha enviado un correo al candidato." })}
            >
              <Icons.send className="w-4 h-4" /> ENVIAR SOLICITUD
            </Button>
          </section>

          <Separator className="bg-slate-100" />

          {/* Documentos Enviados */}
          <section className="space-y-3">
             <h3 className="text-sm font-bold text-slate-800">Documentos enviados por el solicitante</h3>
             <div className="space-y-1 text-sm text-slate-500 italic">
               {!application.cvURL && <p>No se ha subido un CV.</p>}
               {(!application.certificadosURLs || application.certificadosURLs.length === 0) && <p>No se han subido certificados.</p>}
               {application.cvURL && <p className="text-blue-600 font-medium flex items-center gap-1"><Icons.check className="w-3 h-3" /> CV Cargado</p>}
               {application.certificadosURLs && application.certificadosURLs.length > 0 && <p className="text-blue-600 font-medium flex items-center gap-1"><Icons.check className="w-3 h-3" /> {application.certificadosURLs.length} Certificados cargados</p>}
             </div>
          </section>

          <div className="flex items-center justify-between pt-4 bg-slate-50/50 -mx-8 px-8 py-4">
             <div className="flex items-center gap-2">
               <span className="text-xs font-bold text-slate-400 uppercase">Estado actual:</span>
               <Badge 
                 variant="outline" 
                 className={cn(
                   "font-bold uppercase text-[10px]",
                   formData.estado === 'Pendiente' ? "text-amber-600 bg-amber-50" :
                   formData.estado === 'En Proceso' ? "text-blue-600 bg-blue-50" :
                   formData.estado === 'Contratado' ? "text-emerald-600 bg-emerald-50" :
                   "text-red-600 bg-red-50"
                 )}
               >
                 {formData.estado}
               </Badge>
             </div>
          </div>
        </div>

        <DialogFooter className="p-6 bg-slate-50 border-t flex flex-row items-center justify-between sm:justify-between gap-4">
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              className="text-emerald-600 border-emerald-200 hover:bg-emerald-50 font-bold text-xs"
              onClick={() => handleSave('Contratado')}
              disabled={isSaving}
            >
              CONTRATAR
            </Button>
            <Button 
              variant="outline" 
              className="text-red-600 border-red-200 hover:bg-red-50 font-bold text-xs"
              onClick={() => handleSave('Rechazado')}
              disabled={isSaving}
            >
              NO CONTINUAR
            </Button>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="ghost" 
              onClick={onClose}
              className="text-slate-500 font-bold text-xs"
              disabled={isSaving}
            >
              CANCELAR
            </Button>
            <Button 
              onClick={() => handleSave()} 
              disabled={isSaving}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 font-bold text-xs"
            >
              {isSaving ? <Icons.spinner className="w-4 h-4 animate-spin" /> : "GUARDAR"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

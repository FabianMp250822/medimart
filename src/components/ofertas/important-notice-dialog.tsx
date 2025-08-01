"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface ImportantNoticeDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function ImportantNoticeDialog({ open, onOpenChange }: ImportantNoticeDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Comunicado Importante</AlertDialogTitle>
          <AlertDialogDescription asChild>
            <div className="text-sm text-left text-muted-foreground space-y-3 pt-4 max-h-[60vh] overflow-y-auto pr-2">
                 <h4 className="font-semibold text-center text-foreground">
                    Barranquilla, 03 de Febrero de 2025
                </h4>
                <p>
                    La Clínica de la Costa S.A.S. informa a todos los aspirantes a nuestras convocatorias laborales que 
                    dentro de nuestros procesos de selección 
                    <strong className="text-primary"> NO solicitamos ningún tipo de pago </strong> 
                    por concepto de inscripción, realización de pruebas, cursos, laboratorios o cualquier otro trámite 
                    relacionado con la vinculación a nuestra institución.
                </p>
                <p>
                    Cualquier solicitud de dinero en nombre de la Clínica de la Costa S.A.S. es fraudulenta. 
                    En caso de detectar este tipo de prácticas, le pedimos abstenerse de realizar pagos y 
                    reportarlo de inmediato a nuestros canales oficiales de atención.
                </p>
                <p>
                    Para información verídica sobre nuestros procesos de selección, le invitamos a consultar
                    nuestra página web oficial y redes sociales verificadas.
                </p>
                <p className="font-semibold text-right pt-4">
                    Atentamente,<br/>
                    Clínica de la Costa S.A.S
                </p>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction className="bg-accent hover:bg-accent/90">Entendido</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

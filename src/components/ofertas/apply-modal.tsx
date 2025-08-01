
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { OfertaEmpleo } from "@/types/oferta-empleo";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "../ui/textarea";

interface ApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  oferta?: OfertaEmpleo;
}

const applySchema = z.object({
  name: z.string().min(3, "El nombre es requerido"),
  email: z.string().email("El correo electrónico no es válido"),
  cv: z.any().refine((files) => files?.length === 1, "Debes adjuntar tu hoja de vida."),
  // Puedes agregar más validaciones aquí para el formulario completo
});

type ApplyFormValues = z.infer<typeof applySchema>;

export function ApplyModal({ isOpen, onClose, oferta }: ApplyModalProps) {
  const { toast } = useToast();
  const form = useForm<ApplyFormValues>({
    resolver: zodResolver(applySchema),
    defaultValues: {
      name: "",
      email: "",
    }
  });

  const onSubmit: SubmitHandler<ApplyFormValues> = (data) => {
    // Aquí iría la lógica para subir el archivo y enviar los datos
    console.log(data);

    toast({
        title: "¡Postulación enviada!",
        description: "Hemos recibido tu información. ¡Mucho éxito!",
        variant: "default"
    });

    form.reset();
    onClose();
  };

  const fileRef = form.register("cv");

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {oferta ? `Aplicar a: ${oferta.titulo}` : "Envía tu currículum para futuras postulaciones"}
          </DialogTitle>
          <DialogDescription>
            Completa el formulario para postularte. Nos pondremos en contacto si tu perfil se ajusta a nuestras necesidades.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 py-4">
              {/* Información Personal */}
              <div className="space-y-4 p-4 border rounded-lg">
                <h3 className="text-lg font-semibold text-primary">Información Personal</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField control={form.control} name="name" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nombres y Apellidos</FormLabel>
                            <FormControl><Input {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="email" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Correo Electrónico</FormLabel>
                            <FormControl><Input type="email" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                     {/* Agrega más campos de información personal aquí */}
                </div>
              </div>
              
              {/* Información Académica */}
              <div className="space-y-4 p-4 border rounded-lg">
                <h3 className="text-lg font-semibold text-primary">Información Académica</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Campos de información académica */}
                </div>
              </div>

               {/* Experiencia Laboral */}
              <div className="space-y-4 p-4 border rounded-lg">
                <h3 className="text-lg font-semibold text-primary">Experiencia Laboral</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     {/* Campos de experiencia laboral */}
                </div>
              </div>
              
              {/* Archivos */}
              <div className="space-y-4 p-4 border rounded-lg">
                 <h3 className="text-lg font-semibold text-primary">Documentos</h3>
                 <FormField
                    control={form.control}
                    name="cv"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Hoja de vida (PDF, DOC, DOCX)</FormLabel>
                             <FormControl>
                                <Input 
                                    {...fileRef}
                                    type="file" 
                                    accept=".pdf,.doc,.docx"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
              </div>

                <DialogFooter>
                    <Button type="button" variant="outline" onClick={onClose}>Cancelar</Button>
                    <Button type="submit" className="bg-accent hover:bg-accent/90" disabled={form.formState.isSubmitting}>
                        {form.formState.isSubmitting ? "Enviando..." : "Enviar Postulación"}
                    </Button>
                </DialogFooter>
            </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

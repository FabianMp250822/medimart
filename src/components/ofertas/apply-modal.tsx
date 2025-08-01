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

interface ApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  oferta?: OfertaEmpleo;
}

const applySchema = z.object({
  name: z.string().min(3, "El nombre es requerido"),
  email: z.string().email("El correo electrónico no es válido"),
  cv: z.instanceof(FileList).refine(files => files?.length === 1, "Debes adjuntar tu hoja de vida."),
});

type ApplyFormValues = z.infer<typeof applySchema>;

export function ApplyModal({ isOpen, onClose, oferta }: ApplyModalProps) {
  const { toast } = useToast();
  const form = useForm<ApplyFormValues>({
    resolver: zodResolver(applySchema),
  });

  const onSubmit: SubmitHandler<ApplyFormValues> = (data) => {
    // Aquí iría la lógica para subir el archivo y enviar los datos
    console.log(data);

    toast({
        title: "¡Postulación enviada!",
        description: "Hemos recibido tu hoja de vida. ¡Mucho éxito!",
        variant: "default"
    });

    form.reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {oferta ? `Aplicar a: ${oferta.titulo}` : "Deja tu hoja de vida"}
          </DialogTitle>
          <DialogDescription>
            Completa el formulario para postularte. Nos pondremos en contacto si tu perfil se ajusta a nuestras necesidades.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nombre completo</FormLabel>
                            <FormControl><Input placeholder="Tu nombre" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Correo electrónico</FormLabel>
                            <FormControl><Input type="email" placeholder="tu@correo.com" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="cv"
                    render={({ field: { value, onChange, ...fieldProps } }) => (
                        <FormItem>
                            <FormLabel>Hoja de vida (PDF)</FormLabel>
                             <FormControl>
                                <Input 
                                    {...fieldProps}
                                    type="file" 
                                    accept=".pdf"
                                    onChange={(event) => onChange(event.target.files)}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <DialogFooter>
                    <Button type="button" variant="outline" onClick={onClose}>Cancelar</Button>
                    <Button type="submit" className="bg-accent hover:bg-accent/90" disabled={form.formState.isSubmitting}>
                        {form.formState.isSubmitting ? "Enviando..." : "Enviar postulación"}
                    </Button>
                </DialogFooter>
            </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

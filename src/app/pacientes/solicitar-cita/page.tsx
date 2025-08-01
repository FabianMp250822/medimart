
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { imedicAuth, imedicDb, imedicStorage } from '@/lib/firebase';
import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Loader2 } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Checkbox } from '@/components/ui/checkbox';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useToast } from '@/hooks/use-toast';
import { Logo } from '@/components/logo';
import Link from 'next/link';

const loginSchema = z.object({
  email: z.string().email({ message: 'Por favor, introduce un correo válido.' }),
  password: z.string().min(1, { message: 'La contraseña es obligatoria.' }),
});

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const MAX_FILE_SIZE = 5000000; // 5MB

const registerSchema = z.object({
  nombres: z.string().min(3, { message: 'El nombre debe tener al menos 3 caracteres.' }),
  apellidos: z.string().min(3, { message: 'El apellido debe tener al menos 3 caracteres.' }),
  identificacion: z.string().min(5, { message: 'La identificación es obligatoria.' }),
  fechaNacimiento: z.date({ required_error: 'La fecha de nacimiento es obligatoria.' }),
  telefono: z.string().min(7, { message: 'El teléfono es obligatorio.' }),
  direccion: z.string().min(5, { message: 'La dirección es obligatoria.' }),
  lugarSolicitud: z.string().optional(),
  foto: z.any()
    .refine((files) => files?.length === 0 || (files?.[0] && MAX_FILE_SIZE >= files[0].size), {
        message: `El tamaño máximo de la imagen es de 5MB.`,
    })
    .refine((files) => files?.length === 0 || (files?.[0] && ACCEPTED_IMAGE_TYPES.includes(files[0].type)), {
        message: "Solo se aceptan formatos .jpg, .jpeg, .png y .webp.",
    }).optional(),
  email: z.string().email({ message: 'Por favor, introduce un correo válido.' }),
  password: z.string().min(6, { message: 'La contraseña debe tener al menos 6 caracteres.' }),
  aceptarTerminos: z.boolean().default(false).refine(val => val === true, {
    message: 'Debes aceptar los términos y condiciones.'
  }),
});

type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;

export default function SolicitarCitaPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('login');

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      nombres: '',
      apellidos: '',
      identificacion: '',
      telefono: '',
      direccion: '',
      lugarSolicitud: '',
      email: '',
      password: '',
      aceptarTerminos: false,
    },
  });

  const onLoginSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    if (!imedicAuth) {
        toast({ variant: 'destructive', title: 'Error de configuración', description: 'El servicio de autenticación no está disponible.' });
        setIsLoading(false);
        return;
    }
    try {
      await signInWithEmailAndPassword(imedicAuth, data.email, data.password);
      toast({
        title: '¡Bienvenido de nuevo!',
        description: 'Has iniciado sesión correctamente.',
      });
      // Aquí puedes redirigir al usuario al dashboard de citas
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error al iniciar sesión',
        description: error.message.includes('auth/invalid-credential') 
          ? 'Correo o contraseña incorrectos.'
          : 'Ocurrió un error. Por favor, inténtalo de nuevo.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onRegisterSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true);
     if (!imedicAuth || !imedicDb || !imedicStorage) {
        toast({ variant: 'destructive', title: 'Error de configuración', description: 'El servicio de registro no está disponible.' });
        setIsLoading(false);
        return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(imedicAuth, data.email, data.password);
      const user = userCredential.user;
      const fullName = `${data.nombres} ${data.apellidos}`;
      
      let photoURL = '';
      if (data.foto && data.foto.length > 0) {
        const file = data.foto[0];
        const fileExtension = file.name.split('.').pop();
        const fileName = `${uuidv4()}.${fileExtension}`;
        const storageRef = ref(imedicStorage, `patient-photos/${user.uid}/${fileName}`);
        
        await uploadBytes(storageRef, file);
        photoURL = await getDownloadURL(storageRef);
      }

      await updateProfile(user, { 
          displayName: fullName,
          photoURL: photoURL || undefined
      });

      await setDoc(doc(imedicDb, "patients", user.uid), {
        uid: user.uid,
        nombres: data.nombres,
        apellidos: data.apellidos,
        nombreCompleto: fullName,
        identificacion: data.identificacion,
        fechaNacimiento: data.fechaNacimiento,
        telefono: data.telefono,
        direccion: data.direccion,
        email: data.email,
        lugarSolicitud: data.lugarSolicitud,
        photoURL: photoURL,
        createdAt: new Date(),
      });
      
      toast({
        title: '¡Registro exitoso!',
        description: 'Tu cuenta ha sido creada. Ahora puedes iniciar sesión.',
      });
      setActiveTab('login');
      loginForm.reset();
      registerForm.reset();
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error en el registro',
        description: error.message.includes('auth/email-already-in-use')
          ? 'Este correo electrónico ya está en uso.'
          : `Ocurrió un error: ${error.message}`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fotoRef = registerForm.register("foto");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      <div className="mb-8">
        <Link href="/">
          <Logo />
        </Link>
      </div>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-lg lg:max-w-4xl">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
          <TabsTrigger value="register">Registrarse</TabsTrigger>
        </TabsList>

        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Acceso a tu Portal</CardTitle>
              <CardDescription>Ingresa tu correo y contraseña para solicitar o gestionar tus citas.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...loginForm}>
                <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-6">
                  <FormField
                    control={loginForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Correo Electrónico</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="tu@correo.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={loginForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contraseña</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="••••••••" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full bg-accent hover:bg-accent/90" disabled={isLoading}>
                    {isLoading ? <Loader2 className="animate-spin" /> : 'Ingresar'}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="register">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Registro de Paciente</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...registerForm}>
                <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* Columna Izquierda */}
                    <div className="space-y-4">
                      <FormField control={registerForm.control} name="nombres" render={({ field }) => (<FormItem><FormLabel>Nombres *</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                      <FormField control={registerForm.control} name="apellidos" render={({ field }) => (<FormItem><FormLabel>Apellidos *</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                      <FormField control={registerForm.control} name="identificacion" render={({ field }) => (<FormItem><FormLabel>Identificación *</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                      <FormField control={registerForm.control} name="fechaNacimiento" render={({ field }) => (
                        <FormItem className="flex flex-col"><FormLabel>Fecha de Nacimiento *</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button variant={"outline"} className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
                                  {field.value ? (format(field.value, "dd 'de' MMMM 'de' yyyy", { locale: es })) : (<span>dd/mm/aaaa</span>)}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={(date) => date > new Date() || date < new Date("1900-01-01")} initialFocus />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={registerForm.control} name="telefono" render={({ field }) => (<FormItem><FormLabel>Teléfono *</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                      <FormField control={registerForm.control} name="direccion" render={({ field }) => (<FormItem><FormLabel>Dirección *</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                    </div>
                    {/* Columna Derecha */}
                    <div className="space-y-4">
                      <FormField control={registerForm.control} name="lugarSolicitud" render={({ field }) => (<FormItem><FormLabel>Lugar de Solicitud</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                      <FormField control={registerForm.control} name="foto" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Subir Foto</FormLabel>
                            <FormControl>
                                <Input type="file" accept="image/*" className="file:text-accent file:font-semibold" {...fotoRef} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                      )} />
                      <FormField control={registerForm.control} name="email" render={({ field }) => (<FormItem><FormLabel>Correo (Auth) *</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem>)} />
                      <FormField control={registerForm.control} name="password" render={({ field }) => (<FormItem><FormLabel>Contraseña (Auth) *</FormLabel><FormControl><Input type="password" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    </div>
                  </div>
                  
                  <Accordion type="single" collapsible>
                      <AccordionItem value="item-1">
                          <AccordionTrigger className="text-sm">Información sobre el tratamiento de datos personales</AccordionTrigger>
                          <AccordionContent className="text-xs text-muted-foreground p-2">
                              Aquí va el texto detallado sobre la política de tratamiento de datos personales, explicando cómo se usará, almacenará y protegerá la información del paciente de acuerdo a la ley.
                          </AccordionContent>
                      </AccordionItem>
                  </Accordion>

                  <FormField control={registerForm.control} name="aceptarTerminos" render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>He leído y acepto el consentimiento informado para el tratamiento de mis datos personales</FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )} />

                  <Button type="submit" className="w-full bg-accent hover:bg-accent/90" disabled={isLoading}>
                    {isLoading ? <Loader2 className="animate-spin" /> : 'REGISTRAR PACIENTE'}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <div className="mt-6 text-center text-xs text-muted-foreground max-w-md">
        <p>
          Al registrarte o iniciar sesión, aceptas nuestra{' '}
          <Link href="/nosotros/politica-de-tratamiento-de-datos" className="underline hover:text-primary">
            Política de Tratamiento de Datos Personales
          </Link>
          . Tu información está segura con nosotros.
        </p>
      </div>
    </div>
  );
}

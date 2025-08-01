
'use client';

import React, { useState, useEffect, useMemo } from "react";
import { collection, getDocs, getDoc, addDoc, deleteDoc, doc, Timestamp, query, where, onSnapshot } from "firebase/firestore";
import { imedicDb, imedicStorage } from "@/lib/firebase";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import type { User } from 'firebase/auth';

import doctorsData from "@/data/doctors.json";
import { getDepartments, getCitiesByDepartment } from "@/data/colombiaData";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { CalendarIcon, Loader2, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useToast } from "@/hooks/use-toast";

interface AppointmentsViewProps {
    user: User;
}

const appointmentSchema = z.object({
    selectedEps: z.string().min(1, "Debe seleccionar una EPS"),
    customEps: z.string().optional(),
    selectedDepartment: z.string().min(1, "Debe seleccionar un departamento"),
    selectedCity: z.string().min(1, "Debe seleccionar una ciudad"),
    birthDate: z.date({ required_error: "Debe seleccionar su fecha de nacimiento" }),
    appointmentType: z.string().min(1, "Debe seleccionar el tipo de cita"),
    appointmentReason: z.string().min(1, "Debe ingresar el motivo de la cita"),
    contactPhone: z.string().min(7, "Debe ingresar un teléfono de contacto válido"),
    confirmEmail: z.string().email("Debe ingresar un correo electrónico válido"),
    additionalInfo: z.string().min(1, "Debe ingresar observaciones adicionales"),
    examFiles: z.any().optional(),
}).refine(data => {
    if (data.selectedEps === 'OTRA') {
        return !!data.customEps && data.customEps.length > 0;
    }
    return true;
}, {
    message: "Por favor, especifique su EPS",
    path: ["customEps"],
});

type AppointmentFormValues = z.infer<typeof appointmentSchema>;

export function AppointmentsView({ user }: AppointmentsViewProps) {
    const { toast } = useToast();
    const [requests, setRequests] = useState<any[]>([]);
    const [currentStep, setCurrentStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);

    const [specialtySearch, setSpecialtySearch] = useState("");
    const [selectedSpecialty, setSelectedSpecialty] = useState("");
    const [allDoctors] = useState(doctorsData);
    const [selectedDoctor, setSelectedDoctor] = useState<any | null>(null);
    const [epsList, setEpsList] = useState<string[]>([]);
    const departments = useMemo(() => getDepartments(), []);

    const form = useForm<AppointmentFormValues>({
        resolver: zodResolver(appointmentSchema),
        defaultValues: {
            selectedEps: '',
            customEps: '',
            selectedDepartment: '',
            selectedCity: '',
            appointmentType: '',
            appointmentReason: '',
            contactPhone: '',
            confirmEmail: '',
            additionalInfo: '',
        }
    });

    const selectedDepartment = form.watch("selectedDepartment");
    const availableCities = useMemo(() => selectedDepartment ? getCitiesByDepartment(selectedDepartment) : [], [selectedDepartment]);

    useEffect(() => {
        form.resetField("selectedCity");
    }, [selectedDepartment, form]);

    const filteredSpecialties = useMemo(() => {
        if (!specialtySearch) return [];
        const uniqueSpecs = Array.from(new Set(allDoctors.map(d => d.specialty)));
        return uniqueSpecs.filter(spec => spec.toLowerCase().includes(specialtySearch.toLowerCase()));
    }, [specialtySearch, allDoctors]);

    const filteredDoctors = useMemo(() => {
        if (!selectedSpecialty) return [];
        return allDoctors.filter(d => d.specialty.toLowerCase() === selectedSpecialty.toLowerCase());
    }, [selectedSpecialty, allDoctors]);

    useEffect(() => {
        console.log("AppointmentsView: useEffect triggered. User:", user?.uid);

        if (!user || !imedicDb) {
            console.log("AppointmentsView: User or imedicDb is not available. Aborting data fetch.");
            setInitialLoading(false);
            return;
        }

        const fetchInitialData = async () => {
            console.log("AppointmentsView: Starting to fetch initial data.");
            
            // Fetch EPS list
            try {
                console.log("AppointmentsView: Attempting to fetch 'eps' collection.");
                const epsSnapshot = await getDocs(collection(imedicDb, "eps"));
                console.log("AppointmentsView: 'eps' collection fetched successfully.", epsSnapshot.size, "documents found.");
                if (!epsSnapshot.empty) {
                    const epsData = epsSnapshot.docs[0].data();
                    if (epsData.listEps && Array.isArray(epsData.listEps)) {
                        setEpsList(epsData.listEps);
                    }
                }
            } catch (error) {
                console.error("AppointmentsView: Error fetching 'eps' collection:", error);
                toast({ variant: 'destructive', title: "Error de Permisos (EPS)", description: "No se pudo cargar la lista de EPS." });
            }

            // Fetch patient data
            try {
                console.log(`AppointmentsView: Attempting to fetch 'patients' document for user UID: ${user.uid}`);
                const patientDoc = await getDoc(doc(imedicDb, "patients", user.uid));
                if (patientDoc.exists()) {
                    console.log("AppointmentsView: 'patients' document found.", patientDoc.data());
                    const data = patientDoc.data();
                    form.setValue("contactPhone", data.telefono || "");
                    form.setValue("confirmEmail", data.email || "");
                    if (data.fechaNacimiento && data.fechaNacimiento.seconds) {
                       form.setValue("birthDate", new Date(data.fechaNacimiento.seconds * 1000));
                    }
                } else {
                    console.warn("AppointmentsView: 'patients' document does not exist for this user.");
                }
            } catch (error) {
                 console.error("AppointmentsView: Error fetching 'patients' document:", error);
                 toast({ variant: 'destructive', title: "Error (Datos Paciente)", description: "No se pudieron cargar los datos del paciente." });
            }
        };

        console.log(`AppointmentsView: Setting up onSnapshot for 'solicitudesCitas' for user UID: ${user.uid}`);
        const q = query(collection(imedicDb, "solicitudesCitas"), where("uidPaciente", "==", user.uid));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            console.log("AppointmentsView: onSnapshot for 'solicitudesCitas' triggered. Found", snapshot.size, "documents.");
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setRequests(data);
            setInitialLoading(false); 
        }, (error) => {
            console.error("AppointmentsView: Error onSnapshot for 'solicitudesCitas' collection:", error);
            toast({
                variant: 'destructive',
                title: "Error de Permisos (Solicitudes)",
                description: "No se pudieron cargar las solicitudes de citas.",
            });
            setInitialLoading(false);
        });

        fetchInitialData();
        
        return () => {
            console.log("AppointmentsView: Unsubscribing from onSnapshot listener.");
            unsubscribe();
        };
    }, [user, form, toast]);

    const deleteRequest = async (id: string) => {
        if (!imedicDb) return;
        try {
            await deleteDoc(doc(imedicDb, "solicitudesCitas", id));
            toast({ title: "Solicitud eliminada", description: "La solicitud ha sido eliminada correctamente." });
        } catch (error) {
            toast({ variant: 'destructive', title: "Error", description: "No se pudo eliminar la solicitud." });
        }
    };
    
    const onSubmit = async (data: AppointmentFormValues) => {
        if (!imedicDb || !imedicStorage || !user) return;
        setLoading(true);
        try {
            let examDocuments: string[] = [];
            if (data.examFiles && data.examFiles.length > 0) {
                for (const file of Array.from(data.examFiles as FileList)) {
                    const fileRef = storageRef(imedicStorage, `examenes/${user.uid}/${Date.now()}_${file.name}`);
                    const snapshot = await uploadBytes(fileRef, file);
                    const downloadURL = await getDownloadURL(snapshot.ref);
                    examDocuments.push(downloadURL);
                }
            }

            const finalEps = data.selectedEps === "OTRA" ? data.customEps : data.selectedEps;
            
            const appointmentObj = {
                doctorId: selectedDoctor.id,
                doctorName: selectedDoctor.doctorName,
                specialty: selectedDoctor.specialty,
                sede: selectedDoctor.sede,
                selectedEps: finalEps,
                department: data.selectedDepartment,
                city: data.selectedCity,
                birthDate: data.birthDate,
                appointmentType: data.appointmentType,
                appointmentReason: data.appointmentReason,
                contactPhone: data.contactPhone,
                confirmEmail: data.confirmEmail,
                additionalInfo: data.additionalInfo,
                examDocuments,
                uidPaciente: user.uid,
                createdAt: Timestamp.now(),
                status: "solicitando",
            };

            await addDoc(collection(imedicDb, "solicitudesCitas"), appointmentObj);
            
            toast({ title: "Solicitud Enviada", description: "Su solicitud ha sido enviada al soporte." });
            resetForm();

        } catch (error) {
            console.error("Error confirming appointment: ", error);
            toast({ variant: 'destructive', title: "Error", description: "Ocurrió un error al enviar la solicitud." });
        } finally {
            setLoading(false);
        }
    };
    
    const resetForm = () => {
        setCurrentStep(1);
        setSpecialtySearch("");
        setSelectedSpecialty("");
        setSelectedDoctor(null);
        form.reset();
    };

    const nextStep = () => setCurrentStep(prev => prev + 1);
    const prevStep = () => setCurrentStep(prev => prev - 1);

    const examFilesRef = form.register("examFiles");
    
    if (initialLoading) {
        return (
            <div className="flex items-center justify-center p-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className="space-y-4">
                        <Input placeholder="Buscar especialidad..." value={specialtySearch} onChange={e => setSpecialtySearch(e.target.value)} />
                        {filteredSpecialties.length > 0 && (
                            <Card><CardContent className="p-2 space-y-1">{filteredSpecialties.map(spec => (
                                <div key={spec} onClick={() => { setSelectedSpecialty(spec); setSpecialtySearch(spec); }} className="p-2 hover:bg-muted rounded-md cursor-pointer">{spec}</div>
                            ))}</CardContent></Card>
                        )}
                        {selectedSpecialty && <p className="text-sm font-medium">Especialidad seleccionada: <span className="text-accent">{selectedSpecialty}</span></p>}
                        <div className="flex justify-end"><Button onClick={nextStep} disabled={!selectedSpecialty}>Siguiente</Button></div>
                    </div>
                );
            case 2:
                return (
                    <div className="space-y-4">
                        {filteredDoctors.length > 0 ? (
                            <Table>
                                <TableHeader><TableRow><TableHead>Doctor</TableHead><TableHead>Sede</TableHead><TableHead></TableHead></TableRow></TableHeader>
                                <TableBody>{filteredDoctors.map(doc => (
                                    <TableRow key={doc.id}>
                                        <TableCell>{doc.doctorName}</TableCell>
                                        <TableCell>{doc.sede || "N/D"}</TableCell>
                                        <TableCell><Button size="sm" onClick={() => setSelectedDoctor(doc)}>Seleccionar</Button></TableCell>
                                    </TableRow>
                                ))}</TableBody>
                            </Table>
                        ) : <p>No hay doctores disponibles para esta especialidad.</p>}
                        {selectedDoctor && <p className="text-sm font-medium">Doctor seleccionado: <span className="text-accent">{selectedDoctor.doctorName}</span></p>}
                        <div className="flex justify-between">
                            <Button variant="outline" onClick={prevStep}>Atrás</Button>
                            <Button onClick={nextStep} disabled={!selectedDoctor}>Siguiente</Button>
                        </div>
                    </div>
                );
            case 3:
                return (
                   <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField control={form.control} name="selectedEps" render={({ field }) => (<FormItem><FormLabel>EPS</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Seleccione su EPS" /></SelectTrigger></FormControl><SelectContent>{epsList.map(eps => <SelectItem key={eps} value={eps}>{eps}</SelectItem>)}<SelectItem value="OTRA">OTRA</SelectItem></SelectContent></Select><FormMessage /></FormItem>)} />
                            {form.watch('selectedEps') === 'OTRA' && <FormField control={form.control} name="customEps" render={({ field }) => (<FormItem><FormLabel>Especifique su EPS</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />}
                            <FormField control={form.control} name="selectedDepartment" render={({ field }) => (<FormItem><FormLabel>Departamento</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Seleccione departamento" /></SelectTrigger></FormControl><SelectContent>{departments.map(dep => <SelectItem key={dep} value={dep}>{dep}</SelectItem>)}</SelectContent></Select><FormMessage /></FormItem>)} />
                            <FormField control={form.control} name="selectedCity" render={({ field }) => (<FormItem><FormLabel>Ciudad/Municipio</FormLabel><Select onValueChange={field.onChange} value={field.value || ''} disabled={!selectedDepartment}><FormControl><SelectTrigger><SelectValue placeholder="Seleccione ciudad" /></SelectTrigger></FormControl><SelectContent>{availableCities.map(city => <SelectItem key={city} value={city}>{city}</SelectItem>)}</SelectContent></Select><FormMessage /></FormItem>)} />
                            <FormField control={form.control} name="birthDate" render={({ field }) => (<FormItem className="flex flex-col"><FormLabel>Fecha de Nacimiento</FormLabel><Popover><PopoverTrigger asChild><FormControl><Button variant={"outline"} className={cn("pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>{field.value ? (format(field.value, "PPP", { locale: es })) : (<span>Seleccione una fecha</span>)}<CalendarIcon className="ml-auto h-4 w-4 opacity-50" /></Button></FormControl></PopoverTrigger><PopoverContent className="w-auto p-0" align="start"><Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={(date) => date > new Date() || date < new Date("1900-01-01")} initialFocus /></PopoverContent></Popover><FormMessage /></FormItem>)} />
                            <FormField control={form.control} name="appointmentType" render={({ field }) => (<FormItem><FormLabel>Tipo de Cita</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Seleccione tipo de cita" /></SelectTrigger></FormControl><SelectContent><SelectItem value="Consulta inicial">Consulta inicial</SelectItem><SelectItem value="Reunión con especialista">Reunión con especialista</SelectItem><SelectItem value="Revisión de exámenes">Revisión de exámenes</SelectItem></SelectContent></Select><FormMessage /></FormItem>)} />
                            <FormField control={form.control} name="contactPhone" render={({ field }) => (<FormItem><FormLabel>Teléfono de Contacto</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                            <FormField control={form.control} name="confirmEmail" render={({ field }) => (<FormItem><FormLabel>Correo de Verificación</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        </div>
                        <FormField control={form.control} name="appointmentReason" render={({ field }) => (<FormItem><FormLabel>Motivo de la Cita</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="additionalInfo" render={({ field }) => (<FormItem><FormLabel>Observaciones Adicionales</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="examFiles" render={({ field }) => (<FormItem><FormLabel>Subir Archivos (opcional)</FormLabel><FormControl><Input type="file" multiple {...examFilesRef} /></FormControl><FormMessage /></FormItem>)} />
                        <div className="flex justify-between pt-4">
                            <Button type="button" variant="outline" onClick={prevStep}>Atrás</Button>
                            <Button type="submit" disabled={loading}>{loading ? <Loader2 className="animate-spin" /> : "Confirmar Solicitud"}</Button>
                        </div>
                    </form>
                   </Form>
                );
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Agendar Cita Médica</CardTitle>
                <CardDescription>Siga los pasos para solicitar su cita.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="mb-8">
                    <h3 className="font-semibold mb-4">Mis Solicitudes de Cita</h3>
                    {requests.length > 0 ? (
                        <Table>
                            <TableHeader><TableRow><TableHead>Especialidad</TableHead><TableHead>Doctor</TableHead><TableHead>Estado</TableHead><TableHead>Fecha</TableHead><TableHead></TableHead></TableRow></TableHeader>
                            <TableBody>{requests.map(req => (
                                <TableRow key={req.id}>
                                    <TableCell>{req.specialty}</TableCell>
                                    <TableCell>{req.doctorName}</TableCell>
                                    <TableCell><span className={`px-2 py-1 text-xs rounded-full ${req.status === 'solicitando' ? 'bg-yellow-200 text-yellow-800' : 'bg-green-200 text-green-800'}`}>{req.status}</span></TableCell>
                                    <TableCell>{req.createdAt ? new Date(req.createdAt.seconds * 1000).toLocaleDateString() : 'N/A'}</TableCell>
                                    <TableCell><Button variant="ghost" size="icon" onClick={() => deleteRequest(req.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button></TableCell>
                                </TableRow>
                            ))}</TableBody>
                        </Table>
                    ) : <p className="text-sm text-muted-foreground">No tiene solicitudes de cita activas.</p>}
                </div>

                <div className="flex items-center justify-center space-x-4 mb-8">
                    {[1, 2, 3].map(step => (
                        <React.Fragment key={step}>
                            <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${currentStep >= step ? 'bg-primary border-primary text-primary-foreground' : 'bg-muted border-muted-foreground'}`}>
                                {step}
                            </div>
                            {step < 3 && <div className={`flex-1 h-0.5 ${currentStep > step ? 'bg-primary' : 'bg-muted'}`} />}
                        </React.Fragment>
                    ))}
                </div>

                {renderStepContent()}
            </CardContent>
        </Card>
    );
}

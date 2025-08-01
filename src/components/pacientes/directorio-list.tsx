"use client";

import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Mail, Phone, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

const areas = [
    { name: "Call center", phone: "3369999 ext: 0", email: "n/a" },
    { name: "Atención presencial", location: "carrera 50 # 80 - 149", phone: "n/a", email: "n/a" },
    { name: "Consulta externa", phone: "3369999 ext 133-132", email: "consultaexterna@clinicadelacosta.co" },
    { name: "Citas médicas", phone: "n/a", email: "citasmedicas@clinicadelacosta.co" },
    { name: "Resonancia", location: "carrera 50 # 80 – 144", phone: "3369999 ext 137", email: "resonancia@clinicadelacosta.co" },
    { name: "Neurofisiología", location: "carrera 50 # 80 - 90 tercer piso", phone: "3369999 ext 110", email: "neurofisiologia@clinicadelacosta.co" },
    { name: "Enfermería cirugía", location: "carrera 50 # 80 - 90 primer piso", phone: "3369999 ext 106", email: "enfermeriacirugia@clinicadelacosta.co" },
    { name: "Radioterapia", location: "carrera 50 # 80 - 90 primer piso", phone: "3369999 ext 141", email: "radioterapia@clinicadelacosta.co" },
    { name: "Unidad endoscópica", location: "carrera 50 # 80 - 90 segundo piso", phone: "3369999 ext 214", email: "unidadendoscopica@clinicadelacosta.co" },
    { name: "Hemodinamia", location: "carrera 50 # 80 - 90 segundo piso", phone: "3369999 ext 372", email: "hemodinamia@clinicadelacosta.co" },
    { name: "Diagnóstico vascular", location: "carrera 50 # 80 - 90 tercer piso", phone: "3369999 ext 370", email: "cardiologia@clinicadelacosta.co" },
    { name: "Laboratorio clínico", location: "carrera 50 # 80 - 90 quinto piso", phone: "3369999 ext 472", email: "laboratorio@clinicadelacosta.co" },
    { name: "Laboratorio de patología", location: "carrera 50 # 80 - 90 quinto piso", phone: "3369999 ext 203", email: "patologia@clinicadelacosta.co" },
    { name: "Atención al usuario", phone: "3369999 ext 112", email: "trabajosocial@clinicadelacosta.co" },
];

export function DirectorioList() {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredAreas = areas.filter((area) =>
        area.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            <div className="relative mb-8">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                    type="text"
                    placeholder="Buscar área o servicio..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-full"
                />
            </div>

            {filteredAreas.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredAreas.map((area, index) => (
                        <Card key={index} className="flex flex-col">
                            <CardHeader>
                                <CardTitle className="text-xl text-primary">{area.name}</CardTitle>
                            </CardHeader>
                            <CardContent className="flex-grow space-y-3 text-sm">
                                {area.location && <p className="text-muted-foreground">{area.location}</p>}
                                {area.phone !== "n/a" && (
                                    <div className="flex items-center gap-2">
                                        <Phone className="h-4 w-4 text-accent" />
                                        <a href={`tel:${area.phone.replace(/[^\d]/g, '')}`} className="text-foreground hover:underline">
                                            {area.phone}
                                        </a>
                                    </div>
                                )}
                                {area.email !== "n/a" && (
                                    <div className="flex items-center gap-2">
                                        <Mail className="h-4 w-4 text-accent" />
                                        <a href={`mailto:${area.email}`} className="text-foreground hover:underline truncate">
                                            {area.email}
                                        </a>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : (
                <div className="text-center py-16">
                    <h3 className="text-xl font-semibold text-primary">No se encontraron resultados</h3>
                    <p className="text-muted-foreground mt-2">Intenta con otro término de búsqueda.</p>
                </div>
            )}
        </div>
    );
}

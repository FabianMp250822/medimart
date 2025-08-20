"use client";

import { ResearcherData } from '@/types/medico';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Star, Trophy, Beaker, Mic, Users, Link as LinkIcon, Calendar, Building, Landmark, Award } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';
import Link from 'next/link';

interface ResearcherProfileProps {
  data: ResearcherData;
}

const COLORS = ['#08245B', '#2868D6', '#5DA5DA', '#80bdeA', '#A3D5F5'];

export function ResearcherProfile({ data }: ResearcherProfileProps) {
  const allPublications = [
    ...(data.produccion_bibliografica || []),
    {
        "doi": "10.1038/s41598-024-70913-6",
        "editorial": "Nature Publishing Group",
        "fecha": "2024",
        "titulo_articulo": "Gene profiling of Epstein-Barr Virus and human endogenous retrovirus in peripheral blood mononuclear cells of SLE patients: immune response implications",
        "revista": "Scientific Reports"
    },
    {
        "doi": "10.1007/s11255-024-03949-2",
        "editorial": "Springer Netherlands",
        "fecha": "2024",
        "titulo_articulo": "Alactic base excess (ABE): a novel internal milieu parameter—its concept and clinical importance",
        "revista": "International Urology and Nephrology"
    },
    {
        "doi": "10.1016/j.xkme.2024.100845",
        "editorial": "Elsevier Inc.",
        "fecha": "2024",
        "titulo_articulo": "CKD Stage and Cardiovascular and Mortality Events Among Older Adults: The SPRINT Trial",
        "revista": "Kidney Medicine"
    },
    {
        "doi": "10.1177/2333794X241231133",
        "editorial": "Sage Publications Inc",
        "fecha": "2024",
        "titulo_articulo": "Atypical Hemolytic Uremic Syndrome: A Nationwide Colombian Pediatric Series",
        "revista": "Global Pediatric Health"
    },
    {
        "doi": "10.47307/GMC.2024.132.1.8",
        "editorial": "Academia Nacional De Medicina",
        "fecha": "2024",
        "titulo_articulo": "Caracterización clínica y epidemiológica de la enfermedad renal poliquística en un Centro de referencia de Cuarto Nivel del Caribe Colombiano (2008-2022)",
        "revista": "Gaceta Médica de Caracas"
    },
    {
        "doi": "10.4103/ijn.ijn_175_22",
        "editorial": "Wolters Kluwer Medknow Publications",
        "fecha": "2024",
        "titulo_articulo": "Mortality Rate and Acute Kidney Injury Prevalence Reduction in COVID-19 Critical Patients Treated with Hemoperfusion",
        "revista": "Indian Journal of Nephrology"
    },
    {
        "doi": "10.1038/s41598-024-53679-9",
        "editorial": "Nature Publishing Group",
        "fecha": "2024",
        "titulo_articulo": "Surface-enhanced Raman Spectroscopy in urinalysis of hypertension patients with kidney disease",
        "revista": "Scientific Reports"
    },
    {
        "doi": "10.3390/ijms24098290",
        "editorial": "MDPI",
        "fecha": "2023",
        "titulo_articulo": "From Cell to Symptoms: The Role of SARS-CoV-2 Cytopathic Effects in the Pathogenesis of COVID-19 and Long COVID",
        "revista": "International Journal of Molecular Sciences"
    },
    {
        "doi": "10.3389/fneph.2023.1133352",
        "editorial": "Frontiers",
        "fecha": "2023",
        "titulo_articulo": "Insulin and the kidneys: a contemporary view on the molecular basis",
        "revista": "Frontiers in Nephrology"
    },
    {
        "doi": "10.1055/a-2164-8438",
        "editorial": "Thieme Medical Publishers Inc.",
        "fecha": "2023",
        "titulo_articulo": "Pregnancy-Associated Atypical Hemolytic Uremic Syndrome: A Case Report with a rare MCP Gene Mutation and Successful Eculizumab Treatment",
        "revista": "AJP Reports"
    },
    {
        "doi": "10.1007/s11845-023-03490-8",
        "editorial": "Springer London",
        "fecha": "2023",
        "titulo_articulo": "Hyponatremia and malnutrition: a comprehensive review",
        "revista": "Irish Journal of Medical Science"
    },
    {
        "doi": "10.1016/j.semnephrol.2023.151336",
        "editorial": "W.B. Saunders Ltd",
        "fecha": "2023",
        "titulo_articulo": "Chronic Kidney Disease Burden in Low-Resource Settings: Regional Perspectives",
        "revista": "Seminars in Nephrology"
    },
    {
        "doi": "10.3390/biomedicines11092435",
        "editorial": "MDPI",
        "fecha": "2023",
        "titulo_articulo": "Handgrip Strength Is Associated with Specific Aspects of Vascular Function in Individuals with Metabolic Syndrome",
        "revista": "Biomedicines"
    }
  ];

  // Remove duplicates based on title and keep the latest data
  const uniquePublications = Array.from(new Map(allPublications.map(item => [item.titulo_articulo, item])).values());


  const publicationByYear = uniquePublications.reduce((acc, pub) => {
    const year = pub.fecha ? new Date(pub.fecha).getFullYear() : 'N/A';
    if (year !== 'N/A' && !isNaN(year)) {
        acc[year] = (acc[year] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const publicationChartData = Object.entries(publicationByYear)
    .map(([year, count]) => ({ year, count }))
    .sort((a, b) => parseInt(a.year) - parseInt(b.year));
    
  const eventTypes = (data.eventos_cientificos || []).reduce((acc, event) => {
    const type = event.tipo_evento || 'Otro';
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const eventChartData = Object.entries(eventTypes).map(([name, value]) => ({ name, value }));
  
  const hasPublications = uniquePublications.length > 0;
  const hasEvents = data.eventos_cientificos && data.eventos_cientificos.length > 0;
  const hasStudies = data.clinical_studies && data.clinical_studies.length > 0;
  const hasRecognitions = data.reconocimientos && data.reconocimientos.length > 0;

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle className="text-3xl text-primary flex items-center gap-3">
          <Beaker /> Perfil de Investigador
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="publications" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto">
            {hasPublications && <TabsTrigger value="publications">Publicaciones</TabsTrigger>}
            {hasEvents && <TabsTrigger value="events">Eventos</TabsTrigger>}
            {hasStudies && <TabsTrigger value="studies">Estudios Clínicos</TabsTrigger>}
            {hasRecognitions && <TabsTrigger value="recognitions">Reconocimientos</TabsTrigger>}
          </TabsList>

          {hasPublications && (
            <TabsContent value="publications" className="mt-6">
                <Card>
                <CardHeader><CardTitle className="flex items-center gap-2 text-xl text-primary"><BookOpen/> Producción Bibliográfica ({uniquePublications.length})</CardTitle></CardHeader>
                <CardContent>
                    <div className="h-64 w-full mb-8">
                    <ResponsiveContainer>
                        <BarChart data={publicationChartData}>
                        <XAxis dataKey="year" />
                        <YAxis allowDecimals={false} />
                        <Tooltip />
                        <Bar dataKey="count" fill="hsl(var(--primary))" name="Publicaciones" />
                        </BarChart>
                    </ResponsiveContainer>
                    </div>
                    <ul className="space-y-4">
                    {uniquePublications.sort((a,b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime()).map((pub, index) => (
                        <li key={index} className="border-b pb-4 last:border-b-0 last:pb-0">
                        <p className="font-bold text-foreground">{pub.titulo_articulo}</p>
                        <p className="text-sm text-muted-foreground">{pub.revista} ({pub.fecha})</p>
                        {pub.doi && <Link href={`https://doi.org/${pub.doi}`} target="_blank" className="text-accent text-sm hover:underline flex items-center gap-1"><LinkIcon size={14}/> Ver DOI</Link>}
                        </li>
                    ))}
                    </ul>
                </CardContent>
                </Card>
            </TabsContent>
          )}

          {hasEvents && (
            <TabsContent value="events" className="mt-6">
                <Card>
                <CardHeader><CardTitle className="flex items-center gap-2 text-xl text-primary"><Mic/> Eventos Científicos</CardTitle></CardHeader>
                <CardContent>
                    <div className="h-64 w-full mb-8">
                        <ResponsiveContainer>
                            <PieChart>
                                <Pie data={eventChartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                                    {eventChartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <ul className="space-y-4">
                    {data.eventos_cientificos.map((event, index) => (
                        <li key={index} className="border-b pb-4">
                        <p className="font-bold text-foreground">{event.nombre_evento} <span className="text-xs font-normal bg-primary/10 text-primary px-2 py-1 rounded-full">{event.tipo_evento}</span></p>
                        <p className="text-sm text-muted-foreground flex items-center gap-2"><Landmark size={14}/> {event.lugar} ({event.ambito})</p>
                        <p className="text-sm text-muted-foreground flex items-center gap-2"><Calendar size={14}/> {event.fecha_inicio} - {event.fecha_fin}</p>
                        </li>
                    ))}
                    </ul>
                </CardContent>
                </Card>
            </TabsContent>
          )}
          
          {hasStudies && (
            <TabsContent value="studies" className="mt-6">
                <Card>
                <CardHeader><CardTitle className="flex items-center gap-2 text-xl text-primary"><Beaker/> Estudios Clínicos</CardTitle></CardHeader>
                <CardContent>
                    <ul className="space-y-4">
                    {data.clinical_studies.map((study, index) => (
                        <li key={index} className="border-b pb-4">
                        <p className="font-bold text-foreground">{study.title}</p>
                        <p className="text-sm text-muted-foreground my-1">{study.initial_description}</p>
                        <Link href={study.url} target="_blank" className="text-accent text-sm hover:underline flex items-center gap-1"><LinkIcon size={14}/> Ver en ClinicalTrials.gov</Link>
                        </li>
                    ))}
                    </ul>
                </CardContent>
                </Card>
            </TabsContent>
          )}

          {hasRecognitions && (
            <TabsContent value="recognitions" className="mt-6">
                <Card>
                <CardHeader><CardTitle className="flex items-center gap-2 text-xl text-primary"><Award/> Reconocimientos</CardTitle></CardHeader>
                <CardContent>
                    <ul className="space-y-3">
                    {data.reconocimientos.sort((a,b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime()).map((rec, index) => (
                        <li key={index} className="flex items-start gap-3">
                            <Trophy className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                            <div>
                                <p className="font-semibold text-foreground">{rec.nombre_reconocimiento}</p>
                                <p className="text-xs text-muted-foreground">{new Date(rec.fecha).getFullYear()}</p>
                            </div>
                        </li>
                    ))}
                    </ul>
                </CardContent>
                </Card>
            </TabsContent>
          )}

        </Tabs>
      </CardContent>
    </Card>
  );
}
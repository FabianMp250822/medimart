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

  const publicationByYear = (data.produccion_bibliografica || []).reduce((acc, pub) => {
    if (pub.fecha) {
        const year = new Date(pub.fecha).getFullYear();
        if (year && !isNaN(year)) {
            acc[year] = (acc[year] || 0) + 1;
        }
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
  
  const hasPublications = data.produccion_bibliografica && data.produccion_bibliografica.length > 0;
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
                <CardHeader><CardTitle className="flex items-center gap-2 text-xl text-primary"><BookOpen/> Producción Bibliográfica</CardTitle></CardHeader>
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
                    {data.produccion_bibliografica.map((pub, index) => (
                        <li key={index} className="border-b pb-4">
                        <p className="font-bold text-foreground">{pub.titulo_articulo}</p>
                        <p className="text-sm text-muted-foreground">{pub.revista}, Vol. {pub.volumen} ({pub.fecha})</p>
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
                    {data.reconocimientos.map((rec, index) => (
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

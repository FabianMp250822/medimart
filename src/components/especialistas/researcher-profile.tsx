
"use client";

import { ResearcherData } from '@/types/medico';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Star, Trophy, Beaker, Mic, Users, Link as LinkIcon, Calendar, Building, Landmark, Award } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';
import Link from 'next/link';

interface ResearcherProfileProps {
  data: ResearcherData;
  specialistId: string;
}

const COLORS = ['#08245B', '#2868D6', '#5DA5DA', '#80bdeA', '#A3D5F5'];

// Hardcoded data for specific specialists
const hardcodedData: { [key: string]: { newPublications: any[] } } = {
  'p3DcIXWsU0fJ4m0uamrr': {
    newPublications: [
        {"titulo": "Efficacy and Safety of Obinutuzumab in Active Lupus Nephritis", "revista": "The New England Journal of Medicine", "año": 2025},
        {"titulo": "Lymphoid Peritoneal Fluid as a Variant of Chylous-Like Effluent in Peritoneal Dialysis: Proposal for a New Diagnostic Term", "revista": "Giornale Italiano di Nefrologia", "año": 2025},
        {"titulo": "Acute Intersticial Nephritis", "revista": "Allergies, Poisoning and Intolerance to Common Substances", "año": 2025},
        {"titulo": "RESULTS FROM THE REGENCY TRIAL ASSESSING EFFICACY AND SAFETY OF OBINUTUZUMAB IN ACTIVE LUPUS NEPHRITIS", "revista": "The Journal of Rheumatology", "año": 2025},
        {"titulo": "Results From The Regency Trial Assessing Efficacy And Safety Of Obinutuzumab In Active Lupus Nephritis", "revista": "Global Rheumatology", "año": 2025},
        {"titulo": "Finerenone and Clinical Outcomes in CKD and Type 2 Diabetes by Frailty Index: FIDELITY Post Hoc Analysis", "revista": "Clinical Journal of the American Society of Nephrology", "año": 2025},
        {"titulo": "The physician-patient relationship in the context of clinical research: Does it ensure effective relational patterns?", "revista": "Revista Colombiana de Nefrología", "año": 2025, "url": "https://revistanefrologia.org/index.php/rcn/article/view/882"},
        {"titulo": "La relación médico-paciente en el contexto de las investigaciones clínicas: ¿asegura formas relacionales efectivas?", "revista": "Revista Colombiana de Nefrología", "año": 2025},
        {"titulo": "Overlap Syndrome in Late-Onset Systemic Lupus Erythematosus With Lupus Nephritis and MPO-ANCA Pauci-Immune Glomerulonephritis and Tuberculosis: An Uncommon Association", "revista": "Case Reports in Nephrology", "año": 2025},
        {"titulo": "Part B of the LILAC study of litifilimab for cutaneous lupus erythematosus: a plain language summary", "revista": "Immunotherapy", "año": 2025},
        {"titulo": "May Measurement Month 2022: an analysis of blood pressure screening results from Colombia", "revista": "European Heart Journal Supplements", "año": 2025},
        {"titulo": "WCN25-927 PREVALENCE OF PROTEINURIA, HYPERTENSION, AND DIABETES IN AN INDIGENOUS POPULATION OF THE BIODIVERSE JUNGLE OF THE COLOMBIAN PACIFIC COAST", "revista": "Kidney International Reports", "año": 2025},
        {"titulo": "WCN25-3676 RESULTS FROM THE REGENCY TRIAL ASSESSING EFFICACY AND SAFETY OF OBINUTUZUMAB IN ACTIVE LUPUS NEPHRITIS", "revista": "Kidney International Reports", "año": 2025},
        {"titulo": "WCN25-63 Refractory Nephrotic Syndrome in Focal and Segmental Glomerulosclerosis by PMM2 Genetic Variant", "revista": "Kidney International Reports", "año": 2025},
        {"titulo": "Kidney Failure Risk Equation predictive tool to improve predialysis patient management?", "revista": "Società Italiana di Nefrologia", "año": 2025},
        {"titulo": "Reset osmostat", "revista": "Asociación Colombiana de Nefrología e Hipertensión Arterial", "año": 2025},
        {"titulo": "POS1216 EFFECT OF GENDER AND FOLLOW-UP TIME IN DAMAGE ACCRUAL: DATA FROM A LATIN AMERICA LUPUS COHORT", "revista": "Annals of the Rheumatic Diseases", "año": 2025},
        {"titulo": "POS0841 THE RENAL ACTIVITY INDEX FOR LUPUS IDENTIFIES AND PREDICTS COMPLETE RENAL REMISSION OR ABSENCE OF KIDNEY INVOLVEMENT IN SYSTEMIC LUPUS ERYTHEMATOSUS", "revista": "Annals of the Rheumatic Diseases", "año": 2025},
        {"titulo": "POS0985 CROSS CULTURAL VALIDATION OF WORK PRODUCTIVITY AND ACTIVITY IMPAIRMENT QUESTIONNAIRE IN LUPUS PATIENTS FROM LATIN AMERICA", "revista": "Annals of the Rheumatic Diseases", "año": 2025},
        {"titulo": "Frequency And Associated Factors Of Herpes Zoster Infection In Systemic Lupus Erythematosus Patients From LatinAmerica", "revista": "Global Rheumatology", "año": 2025},
        {"titulo": "Validation Of A Score For The Prediction Of Serious Infection In Patients With Systemic Lupus Erythematosus: Data From A Latin American Lupus Cohort", "revista": "Global Rheumatology", "año": 2025},
        {"titulo": "Socioeconomic And Environmental Factors Associated With Clinical Manifestations, Activity, And Chronicity Of Systemic Lupus Erythematosus: A Multilevel Study Of The Gladel Cohort", "revista": "Global Rheumatology", "año": 2025},
        {"titulo": "Histopathologic Patterns in Lupus Nephritis: A Case Series of Late-Onset Systemic Lupus Erythematosus", "revista": "Archives of Pathology & Laboratory Medicine", "año": 2025},
        {"titulo": "DELAYED DIAGNOSIS IN SYSTEMIC LUPUS ERYTHEMATOSUS", "revista": "The Journal of Rheumatology", "año": 2025},
        {"titulo": "The role of autoantibodies in post-chikungunya viral arthritis disease severity", "revista": "Microbiology spectrum", "año": 2025},
        {"titulo": "Chronic Kidney Disease (CKD) classification for low-resource settings: Taking into account patients' social vulnerability", "revista": "Revista Colombiana de Nefrología", "año": 2024},
        {"titulo": "May Measurement Month 2022: results from the global blood pressure screening campaign", "revista": "BMJ Global Health", "año": 2024},
        {"titulo": "Atrasentan in Patients with IgA Nephropathy", "revista": "The New England Journal of Medicine", "año": 2024},
        {"titulo": "Alternative Complement Pathway Inhibition with Iptacopan in IgA Nephropathy", "revista": "New England Journal of Medicine", "año": 2024},
        {"titulo": "A Descriptive Analysis of Risk Factors for Chronic Kidney Disease Among the Afro-descendant Population of San José de Saco in the Department of Atlántico, Colombia", "revista": "Acta Scientific NUTRITIONAL HEALTH", "año": 2024},
        {"titulo": "Treatment adherence and quality of life in colombian patients with lupus nephritis", "revista": "Lupus", "año": 2024},
        {"titulo": "Clinical and Immunological Factors Associated with the Progression of Lupus Nephritis in a Population from the Colombian Caribbean", "revista": "Biomedicines", "año": 2024},
        {"titulo": "Gene profiling of Epstein-Barr Virus and human endogenous retrovirus in peripheral blood mononuclear cells of SLE patients: immune response implications", "revista": "Scientific Reports", "año": 2024},
        {"titulo": "Renal Functional Reserve in Naïve HIV Patients", "revista": "Giornale Italiano di Nefrologia", "año": 2024},
        {"titulo": "Prevalence and target attainment of traditional cardiovascular risk factors in patients with systemic lupus erythematosus: a cross-sectional study including 3401 individuals", "revista": "The Lancet Rheumatology", "año": 2024},
        {"titulo": "Alactic base excess (ABE): a novel internal milieu parameter-its concept and clinical importance", "revista": "International Urology and Nephrology", "año": 2024},
        {"titulo": "CKD Stage and Cardiovascular and Mortality Events Among Older Adults: The SPRINT Trial", "revista": "Kidney Medicine", "año": 2024},
        {"titulo": "Obesity and glomerular filtration rate", "revista": "International Urology and Nephrology", "año": 2024},
        {"titulo": "Urinary metabolomic profiling of a cohort of Colombian patients with systemic lupus erythematosus", "revista": "Scientific Reports", "año": 2024},
        {"titulo": "Capacity for the management of kidney failure in the International Society of Nephrology Latin America region: report from the 2023 ISN Global Kidney Health Atlas (ISN-GKHA)", "revista": "Kidney International Supplements", "año": 2024},
        {"titulo": "Expert consensus on evidence-based recommendations for the diagnosis, treatment, and follow-up of X-linked hypophosphatemic rickets (XLH)", "revista": "Revista Colombiana de Nefrologia", "año": 2024},
        {"titulo": "Mortality Rate and Acute Kidney Injury Prevalence Reduction in COVID-19 Critical Patients Treated with Hemoperfusion", "revista": "Indian Journal of Nephrology", "año": 2024},
        {"titulo": "Exploring the interplay of MTHFR and FGG polymorphisms with serum levels of adiponectin and leptin in pediatric lupus nephritis: a pilot study", "revista": "Egyptian Journal of Medical Human Genetics", "año": 2024},
        {"titulo": "Longitudinal assessment of biomarkers in NOBILITY, a randomized, phase II clinical trial of obinutuzumab for treatment of proliferative lupus nephritis", "revista": "Lupus Science & Medicine", "año": 2024},
        {"titulo": "Pregnancy-Associated Atypical Hemolytic Uremic Syndrome: A Case Report with MCP Gene Mutation and Successful Eculizumab Treatment", "revista": "American Journal of Perinatology Reports", "año": 2024},
        {"titulo": "Surface-enhanced Raman Spectroscopy in urinalysis of hypertension patients with kidney disease", "revista": "Scientific Reports", "año": 2024},
        {"titulo": "Kidney Outcomes and Preservation of Kidney Function With Obinutuzumab in Patients With Lupus Nephritis: A Post Hoc Analysis of the NOBILITY Trial", "revista": "Arthritis & Rheumatology", "año": 2024},
        {"titulo": "The fourth wave in chronic kidney disease (CKD) classification: taking into account the aging kidney", "revista": "International Urology and Nephrology", "año": 2024},
        {"titulo": "Atypical hemolytic uremic syndrome: a nationwide Colombian pediatric series", "revista": "Global Pediatric Health", "año": 2024},
        {"titulo": "Factores de riesgo cardiovasculares y metabólicos asociados con la aparición de síndrome poscovid: un estudio de cohorte retrospectivo", "revista": "Revista Colombiana de endocrinologia y metabolismo", "año": 2024},
        {"titulo": "Association of anti-C1q antibodies, adiponectin and HLA II genotype in Colombian patients with systemic lupus erythematosus with lupus nephritis", "revista": "Revista Colombiana de Reumatología", "año": 2024},
        {"titulo": "POS0114 LUPUS NEPHRITIS AND RESPONSE TO TREATMENT IN LATIN AMERICA", "revista": "Annals of the Rheumatic Diseases", "año": 2024},
        {"titulo": "POS1016 THE IMPACT OF ACTIVE LUPUS NEPHRITIS ON WORK PRODUCTIVITY IN PATIENTS FROM A LATIN AMERICAN LUPUS COHORT", "revista": "Annals of the Rheumatic Diseases", "año": 2024},
        {"titulo": "609 Pregnancy outcomes in systemic lupus erythematosus (SLE): data from a multiethnic, multinational Latin American cohort", "revista": "Lupus Science & Medicine", "año": 2024},
        {"titulo": "EE821 Effect of Socioeconomic Status on the Direct Costs of Lupus Nephritis in Colombian Patients", "revista": "Value in Health", "año": 2024},
        {"titulo": "Obinutuzumab Benefits Patients with Active Lupus Nephritis Irrespective of Baseline Proteinuria Severity: A Post Hoc Analysis of a Phase II Trial", "revista": "Arthritis & Rheumatology", "año": 2024},
        {"titulo": "Frequency and Associated Factors of Herpes Zoster Infection in Systemic Lupus Erythematosus Patients from Latin-America", "revista": "Arthritis & Rheumatology", "año": 2024},
        {"titulo": "The Impact of Active Lupus Nephritis on Work Productivity in Patients from a Latin American Lupus Cohort", "revista": "Arthritis & Rheumatology", "año": 2024},
        {"titulo": "Lupus Nephritis and Response to Treatment in Latin America", "revista": "Arthritis & Rheumatology", "año": 2024},
        {"titulo": "Validation of a Score for the Prediction of Serious Infection in Patients with Systemic Lupus Erythematosus: Data from a Latin American Lupus Cohort", "revista": "Arthritis & Rheumatology", "año": 2024},
        {"titulo": "WCN24-1762 URGENT CARDIOVASCULAR CASES IN PATIENTS DIAGNOSED WITH DIABETES AND DE NOVO IN A HEALTHCARE PROVIDER IN MAGANGUÉ (BOL) BETWEEN JANUARY 2021 AND JULY 2023", "revista": "Kidney International Reports", "año": 2024},
        {"titulo": "WCN24-1370 INCIDENCE OF ACUTE KIDNEY INJURY AND THE NEED FOR RENAL SUPPORT THERAPY IN THE POSTOPERATIVE PERIOD OF CARDIOVASCULAR SURGERY", "revista": "Kidney International Reports", "año": 2024},
        {"titulo": "WCN24-1355 RISK OF DIALYSIS ACCORDING TO THE KIDNEY FAILURE RISK EQUATION (KFRE) IN PATIENTS WITH CHRONIC KIDNEY DISEASE ENROLLED IN A NEPHROPROTECTION PROGRAM IN LA GUAJIRA", "revista": "Kidney International Reports", "año": 2024},
        {"titulo": "WCN24-1356 RENAL HEALTH IN LATIN AMERICAN IMMIGRANTS IN THE US ACCORDING TO THE NHANES REGISTRY: JANUARY 2015-MARCH 2020", "revista": "Kidney International Reports", "año": 2024},
        {"titulo": "WCN24-1676 RESULTS OF A KIDNEY TRANSPLANT PROGRAM AT AN CLINIC IN THE COLOMBIAN CARIBBEAN REGION–2019 TO 2022", "revista": "Kidney International Reports", "año": 2024},
        {"titulo": "WCN24-1449 CARACTERIZACIÓN CLÍNICA Y EPIDEMIOLÓGICA DE LA ENFERMEDAD RENAL POLIQUÍSTICA EN PACIENTES ATENDIDOS EN UN CENTRO DE REFERENCIA DE CUARTO NIVEL DEL CARIBE COLOMBIANO DURANTE EL PERIODO 2008-2022", "revista": "Kidney International Reports", "año": 2024},
        {"titulo": "Caracterización clínica y epidemiológica de la enfermedad renal poliquística en un Centro de referencia de Cuarto Nivel del Caribe Colombiano (2008-2022)", "revista": "GACETA MEDICA DE CARACAS", "año": 2024},
        {"titulo": "Diagnosticando la enfermedad glomerular en el adulto", "revista": "Texto de Medicina Interna Aprendizaje Basado en Problemas Segunda Edicion", "año": 2024},
        {"titulo": "Hiponatremia y desnutrición-una revisión exhaustiva", "revista": "Irish Journal of Medical Science", "año": 2024}
    ]
  },
  'eM8fDVBxZ7KebIU5vJVT': {
    newPublications: [
        { "titulo": "Histopathologic Patterns in Lupus Nephritis: A Case Series of Late-Onset Systemic Lupus Erythematosus", "año": 2025 },
        { "titulo": "The Journal of Rheumatology 52 (Suppl 1), 14-15 - Delayed Diagnosis in Systemic Lupus Erythematosus", "año": 2025 },
        { "titulo": "The role of autoantibodies in post-chikungunya viral arthritis disease severity", "año": 2025 },
        { "titulo": "Analysis of Memory Antibody Responses in Individuals with Zika-Associated Guillain–Barré Syndrome", "año": 2024 },
        { "titulo": "Treatment adherence and quality of life in colombian patients with lupus nephritis", "año": 2024 },
        { "titulo": "Gene profiling of Epstein-Barr Virus and human endogenous retrovirus in peripheral blood mononuclear cells of SLE patients: immune response implications", "año": 2024 },
        { "titulo": "Cardiovascular Risk in Chinese Immigrants in the Colombian Caribbean Region", "año": 2024 },
        { "titulo": "Differential Gene Profiling of Epstein-Barr Virus and Human Endogenous Retrovirus in Peripheral Blood Mononuclear Cells of Patients with Systemic Lupus Erythematosus", "año": 2024 },
        { "titulo": "POS0741 IMPACT OF ACTIVE LUPUS NEPHRITIS ON THE QUALITY OF LIFE OF PATIENTS FROM A LATIN AMERICAN LUPUS COHORT", "año": 2024 },
        { "titulo": "ARTÍCULO ESPECIAL Proyecto y Alianza Centenarios: Cohorte COOLCEN", "año": 2024 },
        { "titulo": "WCN24-1355 RISK OF DIALYSIS ACCORDING TO THE KIDNEY FAILURE RISK EQUATION (KFRE) IN PATIENTS WITH CHRONIC KIDNEY DISEASE ENROLLED IN A NEPHROPROTECTION PROGRAM IN LA GUAJIRA", "año": 2024 },
        { "titulo": "Cytokine and T cell responses in post-chikungunya viral arthritis: A cross-sectional study", "año": 2024 },
        { "titulo": "Delayed Diagnosis in Systemic Lupus Erythematosus", "año": 2024 },
        { "titulo": "Development of a Chikungunya Arthritis Disease Activity Score (CHIK-DAS) Based on a Prospective Cohort Study", "año": 2024 },
        { "titulo": "Hemorragias de vías digestivas altas asociada a helicobacter pylori en Barranquilla (Atl, Co) entre los años 2021 a 2023", "año": 2024 },
        { "titulo": "A descriptive analysis of risk factors for chronic kidney disease among the Afro-descendant population of San José de saco in the department of Atlántico, Colombia", "año": 2024 },
        { "titulo": "609 Pregnancy outcomes in systemic lupus erythematosus (SLE): data from a multiethnic, multinational Latin American cohort", "año": 2024 },
        { "titulo": "The natural history of post-chikungunya viral arthritis disease activity and T-cell immunology: a cohort study", "año": 2024 }
    ]
  }
};

export function ResearcherProfile({ data, specialistId }: ResearcherProfileProps) {
  
  // Start with publications from the database
  let publicationsFromDb = (data.produccion_bibliografica || []).map(p => ({
    titulo_articulo: p.titulo_articulo,
    fecha: p.fecha,
    revista: p.revista,
    doi: p.doi,
    url: p.url_articulo,
  }));

  // Check if there is hardcoded data for the current specialist
  const specialistHardcodedData = hardcodedData[specialistId];
  let additionalPublications: any[] = [];

  if (specialistHardcodedData) {
    additionalPublications = specialistHardcodedData.newPublications.map(p => ({
        titulo_articulo: p.titulo || p['Título'],
        fecha: String(p.año || p['Año']),
        revista: p.revista,
        doi: p.doi || null,
        url: p.url || null
    }));
  }
  
  // Combine and deduplicate publications
  const allPublications = [...publicationsFromDb, ...additionalPublications];
  const uniquePublications = Array.from(new Map(allPublications.map(item => [item.titulo_articulo, item])).values());
  
  const publicationByYear = uniquePublications.reduce((acc, pub) => {
    const yearString = String(pub.fecha).split('-')[0];
    if (yearString && /^\d{4}$/.test(yearString)) {
        const year = parseInt(yearString, 10);
        acc[year] = (acc[year] || 0) + 1;
    }
    return acc;
  }, {} as Record<number, number>);

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
                    {uniquePublications.sort((a,b) => {
                        const yearA = String(a.fecha).split('-')[0];
                        const yearB = String(b.fecha).split('-')[0];
                        return parseInt(yearB) - parseInt(yearA);
                    }).map((pub, index) => (
                        <li key={index} className="border-b pb-4 last:border-b-0 last:pb-0">
                        <p className="font-bold text-foreground">{pub.titulo_articulo}</p>
                        <p className="text-sm text-muted-foreground">{pub.revista} ({String(pub.fecha).split('-')[0]})</p>
                        {pub.doi && pub.doi.startsWith('http') && <Link href={pub.doi} target="_blank" className="text-accent text-sm hover:underline flex items-center gap-1"><LinkIcon size={14}/> Ver URL</Link>}
                        {pub.doi && !pub.doi.startsWith('http') && <Link href={`https://doi.org/${pub.doi}`} target="_blank" className="text-accent text-sm hover:underline flex items-center gap-1"><LinkIcon size={14}/> Ver DOI</Link>}
                        {pub.url && <Link href={pub.url} target="_blank" className="text-accent text-sm hover:underline flex items-center gap-1"><LinkIcon size={14}/> Ver URL</Link>}
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
                    {data.reconocimientos.sort((a,b) => {
                        const dateA = a.fecha ? new Date(a.fecha).getTime() : 0;
                        const dateB = b.fecha ? new Date(b.fecha).getTime() : 0;
                        return dateB - dateA;
                    }).map((rec, index) => (
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

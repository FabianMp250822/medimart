
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Beaker, Bone, BrainCircuit, Heart, Microscope, Monitor, Syringe, TestTube } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Preparación Para Procedimientos Médicos - Clínica de la Costa',
  description: 'Encuentre aquí las instrucciones detalladas para la preparación de procedimientos como colonoscopia, ecocardiograma, tomografía, mamografía y más en la Clínica de la Costa.',
};

const procedimientos = [
  {
    value: "colonoscopia-tarde",
    title: "Colonoscopia (Programación en horas de la tarde)",
    icon: <TestTube className="h-5 w-5 text-accent" />,
    content: (
      <div className="prose max-w-none text-muted-foreground">
        <p>La Colonoscopía es un procedimiento que permite examinar el recubrimiento de la parte baja de su tracto digestivo, el colon o intestino grueso, usando un tubo delgado y flexible que contiene una cámara y una luz.</p>
        <p>También permite tomar muestras (biopsias) y extraer pequeños tumores llamados pólipos.</p>
        <h4>¿Qué preparación se requiere?</h4>
        <p>Para que se pueda hacer un examen adecuado y seguro, es muy importante que el colon esté completamente vacío. Su preparación iniciará 24 horas antes del estudio:</p>
        <ul>
            <li><strong>El día anterior del estudio:</strong> Debe desayunar, almorzar y cenar solo líquidos claros, como: jugos sin leche, ni bebidas negras, ni colorantes, caldos (solo el agua, no verduras ni carnes), agua natural.</li>
            <li><strong>A las 8:00 pm:</strong> Vaciar el contenido de DOS sobres de POLIETILENGLICOL 3350 110.1 gramos + ELECTROLITOS en UN LITRO de agua fría o jugo de naranja (si no es diabético). Beber esta solución en UNA HORA (un vaso de 250 ml cada 15 minutos).</li>
            <li><strong>A las 5:00 am (día del estudio):</strong> Vaciar el contenido de DOS sobres de POLIETILENGLICOL 3350 110.1 gramos + ELECTROLITOS en UN LITRO de agua fría o jugo de naranja. Beber esta solución en UNA HORA (un vaso de 250 ml cada 15 minutos).</li>
        </ul>
      </div>
    )
  },
  {
    value: "colonoscopia-diurno",
    title: "Colonoscopia (Programación en horario diurno)",
    icon: <TestTube className="h-5 w-5 text-accent" />,
    content: (
        <div className="prose max-w-none text-muted-foreground">
            <p>La preparación iniciará 48 horas antes del estudio:</p>
            <ul>
                <li><strong>Primer día de preparación:</strong> Puede desayunar y almorzar de manera normal. La cena debe ser solo líquidos claros (jugos sin leche, sin colorantes oscuros, caldos sin sólidos, agua).</li>
                <li><strong>Segundo día (día anterior al estudio):</strong> Continuar con dieta líquida todo el día.</li>
                <li><strong>A las 8:00 pm:</strong> Diluir DOS sobres de POLIETILENGLICOL en UN LITRO de agua o jugo de naranja y beber en una hora.</li>
                <li><strong>A las 12:00 am (medianoche):</strong> Diluir DOS sobres más en UN LITRO de agua o jugo de naranja y beber en una hora.</li>
            </ul>
            <h4>Información Adicional</h4>
            <ul>
                <li>El día del estudio debe asistir completamente en ayunas.</li>
                <li>Si está tomando medicamentos para la coagulación (Aspirina, Clopidogrel, Warfarina), consulte a su médico sobre su suspensión.</li>
                <li>Debe asistir con un acompañante adulto y sin esmalte en las uñas.</li>
                <li>Traer Historia Clínica y resultados de laboratorios (TP, TPTT, HEMOGRAMA, VIH, ELECTROCARDIOGRAMA).</li>
            </ul>
        </div>
    )
  },
  {
    value: "ecocardiograma-transesofagico",
    title: "Ecocardiograma Transesofágico",
    icon: <Heart className="h-5 w-5 text-accent" />,
    content: (
        <div className="prose max-w-none text-muted-foreground">
            <p>Es una prueba diagnóstica para pacientes con enfermedad de las arterias o de la aorta o con sospechas de ellas.</p>
            <h4>Preparación:</h4>
            <ul>
                <li>Tomar solo el desayuno temprano en la mañana. De ahí en adelante, nada vía oral (NO tomar agua).</li>
                <li>Tomar sus medicamentos habituales durante el desayuno, no después.</li>
                <li>Asistir a la cita con un acompañante mayor de 18 años.</li>
                <li>Si tiene prótesis dental removible, debe entregarla al acompañante antes del procedimiento.</li>
                <li>Se le solicitará firmar un consentimiento informado.</li>
            </ul>
        </div>
    )
  },
   {
    value: "ecocardiograma-stress",
    title: "Ecocardiograma de Stress (Ejercicio, Dobutamina)",
    icon: <Heart className="h-5 w-5 text-accent" />,
    content: (
        <div className="prose max-w-none text-muted-foreground">
            <p>Consiste en tomar imágenes del corazón por ultrasonido durante el reposo y bajo estrés físico (banda) o farmacológico (dobutamina).</p>
            <h4>Preparación:</h4>
            <ul>
                <li>Suspender BETABLOQUEADORES (Propanolol, Metoprolol, Carvedilol, etc.) al menos 24 horas antes del estudio, previa autorización de su médico.</li>
                <li>Usar ropa cómoda para realizar ejercicio (tenis, sudadera).</li>
                <li>Se le solicitará firmar un consentimiento informado.</li>
                <li>Informe al personal si tiene alguna dificultad para caminar.</li>
            </ul>
        </div>
    )
  },
  {
    value: "tomografia",
    title: "Tomografía Axial Computarizada (TAC)",
    icon: <Monitor className="h-5 w-5 text-accent" />,
    content: (
        <div className="prose max-w-none text-muted-foreground">
            <p>Es una prueba de diagnóstico por imágenes para crear imágenes detalladas de órganos, huesos y tejidos.</p>
            <h4>El día de la cita:</h4>
            <ul>
                <li>Traer orden médica, autorización vigente y fotocopia de su documento de identidad.</li>
                <li>Aportar historia clínica y datos clínicos completos.</li>
                <li>Si su estudio requiere contraste, deberá tener un ayuno de 6 horas y un examen de creatinina reciente.</li>
                <li>Si su estudio es abdominal, se le pedirá que ingiera agua o contraste oral.</li>
                <li>Deberá retirar prótesis dentales y permanecer muy quieto durante el estudio.</li>
            </ul>
        </div>
    )
  },
  {
    value: "resonancia",
    title: "Resonancia Magnética",
    icon: <BrainCircuit className="h-5 w-5 text-accent" />,
    content: (
        <div className="prose max-w-none text-muted-foreground">
            <p>Es una técnica de diagnóstico por imagen que funciona con un imán potente y ondas de radio.</p>
            <h4>El día de la Cita:</h4>
            <ul>
                <li>El técnico le explicará el estudio y firmará un consentimiento informado si se requiere contraste.</li>
                <li>Deberá retirar prótesis dentales y objetos metálicos.</li>
                <li>Si se usa contraste, se le canalizará una vena.</li>
                <li>Deberá permanecer muy quieto durante el estudio (30 a 45 minutos).</li>
                <li>Se le proporcionará protección auditiva para el ruido del equipo.</li>
            </ul>
        </div>
    )
  },
  {
    value: "mamografia",
    title: "Mamografía",
    icon: <Syringe className="h-5 w-5 text-accent" />,
    content: (
        <div className="prose max-w-none text-muted-foreground">
            <p>Es una imagen de la mama tomada con rayos X para buscar signos de cáncer de mama en sus etapas iniciales.</p>
            <h4>Instrucciones:</h4>
            <ul>
                <li>Intente no programar su mamografía la semana previa a su menstruación o durante ella, ya que las mamas pueden estar más sensibles.</li>
                <li>El día del examen, no use desodorante, perfume ni talco en la zona de las axilas o mamas.</li>
                <li>Use ropa de dos piezas (blusa y pantalón/falda) para mayor comodidad, ya que deberá desvestirse de la cintura para arriba.</li>
            </ul>
        </div>
    )
  },
  {
    value: "densitometria",
    title: "Densitometría Ósea",
    icon: <Bone className="h-5 w-5 text-accent" />,
    content: (
        <div className="prose max-w-none text-muted-foreground">
            <p>Prueba que mide el grado de mineralización del hueso, útil para el diagnóstico de la osteoporosis.</p>
            <h4>Instrucciones:</h4>
            <ul>
                <li>No ingerir suplementos de calcio (tabletas, cápsulas, etc.) mínimo 72 horas antes del examen.</li>
                <li>No requiere ayuno. Puede tomar sus alimentos y medicamentos habituales.</li>
                <li>No debe haberse realizado exámenes con medio de contraste (TAC, Urografía, etc.) en las 2 semanas previas.</li>
                <li>Asistir con ropa cómoda, sin ganchos, cremalleras ni otros accesorios metálicos.</li>
                <li>Traer resultados de densitometrías anteriores si las tiene.</li>
                <li>Si es mayor de 65 años o tiene dificultad de movilidad, venir con un acompañante.</li>
            </ul>
        </div>
    )
  },
   {
    value: "cateterismo",
    title: "Cateterismo Cardíaco",
    icon: <Heart className="h-5 w-5 text-accent" />,
    content: (
        <div className="prose max-w-none text-muted-foreground">
            <p>Consiste en la introducción de un catéter a través de una vena o arteria para visualizar las arterias coronarias y las cavidades cardíacas.</p>
            <h4>Preparación:</h4>
            <ul>
                <li>Ayuno total (sólidos y líquidos) desde la medianoche del día anterior.</li>
                <li>Suspender anticoagulantes (Coumadin, Warfarina) 48 horas antes, previa autorización de su médico.</li>
                <li>Acudir duchado y con ambas ingles rasuradas hasta la mitad del muslo.</li>
                <li>Tomar medicamentos para la hipertensión a las 5 AM con poca agua.</li>
                <li>Asistir con un acompañante adulto y sin joyas, maquillaje o esmalte de uñas.</li>
            </ul>
        </div>
    )
  },
  {
    value: "angiografia",
    title: "Angiografía (Vertebral, Cabeza, Carotídeo)",
    icon: <BrainCircuit className="h-5 w-5 text-accent" />,
    content: (
        <div className="prose max-w-none text-muted-foreground">
            <p>Prueba para identificar o confirmar problemas con los vasos sanguíneos en el cerebro.</p>
            <h4>Preparación:</h4>
            <ul>
                <li>Ayuno total (sólidos y líquidos) desde la medianoche del día anterior. No fumar ni consumir alcohol.</li>
                <li>Suspender Warfarina, Asawin o Aspirineta 7 días antes, previa autorización médica.</li>
                <li>Rasurar regiones inguinales derecha e izquierda hasta el muslo.</li>
                <li>Asistir con un acompañante adulto responsable.</li>
                <li>No usar cremas, perfumes, maquillaje ni joyas. Retirar esmalte de uñas.</li>
                <li>Traer todos los documentos médicos y exámenes de laboratorio recientes.</li>
            </ul>
        </div>
    )
  },
  {
    value: "cpre",
    title: "Colangio Pancreatografía Endoscópica (CPRE)",
    icon: <TestTube className="h-5 w-5 text-accent" />,
    content: (
        <div className="prose max-w-none text-muted-foreground">
            <p>Procedimiento para examinar los conductos biliares a través de un endoscopio.</p>
            <h4>Preparación:</h4>
            <ul>
                <li>Debe asistir en ayunas.</li>
                <li>Si toma medicamentos para la coagulación (Aspirina, Clopidogrel, Warfarina), consulte a su médico sobre su suspensión.</li>
                <li>Debe asistir con un acompañante adulto y sin esmalte en las uñas.</li>
                <li>Traer Historia Clínica y resultados de laboratorios (TP, TPTT, HEMOGRAMA, VIH, ELECTROCARDIOGRAMA).</li>
                <li>Informar sobre cualquier alergia a medicamentos.</li>
            </ul>
        </div>
    )
  },
    {
    value: "endoscopia",
    title: "Endoscopia de Vías Digestivas",
    icon: <Microscope className="h-5 w-5 text-accent" />,
    content: (
        <div className="prose max-w-none text-muted-foreground">
            <p>Técnica diagnóstica para explorar el esófago, estómago y la primera porción del intestino delgado (duodeno) a través de un endoscopio.</p>
            <h4>Preparación:</h4>
            <ul>
                <li>Asistir en ayunas (no comer ni beber nada 8 horas antes).</li>
                <li>Si toma medicamentos para la coagulación, consulte a su médico sobre su suspensión.</li>
                <li>Debe asistir con un acompañante adulto y sin esmalte en las uñas.</li>
                 <li>Traer Historia Clínica y resultados de laboratorios (TP, TPTT, HEMOGRAMA, VIH, ELECTROCARDIOGRAMA).</li>
            </ul>
        </div>
    )
  },
  {
    value: "mesa-basculante",
    title: "Mesa Basculante (Tilt Test)",
    icon: <Heart className="h-5 w-5 text-accent" />,
    content: (
         <div className="prose max-w-none text-muted-foreground">
            <p>Se emplea para estudiar el origen de desvanecimientos, desmayos y síncopes.</p>
            <h4>Preparación:</h4>
            <ul>
                <li>Venir en completo ayuno. No debe beber agua.</li>
                <li>Asistir a la cita con un acompañante mayor de 18 años.</li>
                <li>Se le solicitará firmar un consentimiento informado.</li>
            </ul>
        </div>
    )
  },
  {
    value: "prueba-esfuerzo",
    title: "Prueba de Esfuerzo",
    icon: <Heart className="h-5 w-5 text-accent" />,
    content: (
         <div className="prose max-w-none text-muted-foreground">
            <p>Prueba para valorar la respuesta del corazón al ejercicio físico controlado.</p>
            <h4>Recomendaciones:</h4>
            <ul>
                <li>No tomar bebidas alcohólicas ni cafeína tres horas antes. No realizar actividad física intensa 12 horas antes.</li>
                <li>Llevar ropa cómoda y fácil de quitar.</li>
                <li>Asistir con un acompañante. No se le permitirá conducir después de la prueba.</li>
                <li>Suspender medicamentos que bajen la presión arterial o la frecuencia cardíaca dos o tres días antes, según indicación médica.</li>
                <li>Llevar una lista de sus medicamentos y su historia clínica.</li>
            </ul>
        </div>
    )
  },
  {
    value: "eeg",
    title: "Electroencefalograma (EEG)",
    icon: <BrainCircuit className="h-5 w-5 text-accent" />,
    content: (
         <div className="prose max-w-none text-muted-foreground">
            <p>Examen que proporciona una imagen de la actividad eléctrica cerebral.</p>
            <h4>Preparación:</h4>
            <ul>
                <li>El paciente debe venir con el cabello limpio y seco, sin acondicionador, bálsamo ni cremas de peinar.</li>
                <li>No se requiere ayuno.</li>
                <li>No debe suspender su tratamiento médico, excepto por orden de su médico tratante.</li>
            </ul>
        </div>
    )
  },
  {
    value: "contraste-endovenoso",
    title: "Información sobre Contraste Endovenoso",
    icon: <Beaker className="h-5 w-5 text-accent" />,
    content: (
        <div className="prose max-w-none text-muted-foreground">
            <p>Es una sustancia líquida que permite obtener una mayor información en las imágenes. Generalmente es bien tolerada, pero puede provocar reacciones alérgicas.</p>
            <h4>Si se requiere contraste:</h4>
            <ul>
                <li>Es indispensable un ayuno de 6 horas.</li>
                <li>Se requiere un examen de creatinina en sangre reciente (no superior a 20 días).</li>
                <li>Informe sobre todos los medicamentos que toma; algunos podrían necesitar ser suspendidos.</li>
                <li>Debe venir acompañado.</li>
                <li>Es crucial informar si ha tenido reacciones alérgicas previas, asma u otras enfermedades relevantes.</li>
                <li><strong>PRECAUCIÓN:</strong> Deberá comunicar si se encuentra en embarazo o si tiene alguna duda al respecto.</li>
            </ul>
        </div>
    )
  }
];

export default function PreparacionProcedimientosPage() {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl text-primary">
            <Beaker />
            Instrucciones para Procedimientos Médicos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Una preparación adecuada es fundamental para garantizar la calidad y precisión de sus resultados. A continuación, encontrará las guías de preparación para nuestros principales procedimientos diagnósticos. Por favor, lea atentamente las instrucciones correspondientes al estudio que se va a realizar.
          </p>
        </CardContent>
      </Card>

      <Accordion type="single" collapsible className="w-full">
        {procedimientos.map((examen) => (
          <AccordionItem value={examen.value} key={examen.value}>
            <AccordionTrigger className="font-semibold hover:no-underline text-lg">
              <div className="flex items-center gap-3">
                {examen.icon}
                <span>{examen.title}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pl-11">
              {examen.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

    
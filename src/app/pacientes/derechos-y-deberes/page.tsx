
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Handshake, Mail, DatabaseZap } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Derechos y Deberes del Paciente - Clínica de la Costa',
  description: 'Conozca sus derechos y deberes como paciente en la Clínica de la Costa para garantizar una atención respetuosa, digna y segura.',
};

const derechos = [
    "Recibir servicios de salud de calidad sin discriminación.",
    "Ser informado de forma clara sobre su estado de salud y tratamientos.",
    "Aceptar o rechazar procedimientos médicos después de ser informado.",
    "Garantía de privacidad y confidencialidad de su historia clínica.",
    "Tomar decisiones sobre su cuerpo, incluyendo la donación de órganos.",
    "Solicitar una segunda opinión médica sobre su diagnóstico.",
    "Ser tratado con cortesía, consideración y respeto.",
];

const deberes = [
    "Proveer información veraz y completa sobre su estado de salud.",
    "Seguir las indicaciones y tratamientos prescritos por el personal médico.",
    "Tratar con respeto al personal de la clínica y a otros pacientes.",
    "Hacer uso adecuado de las instalaciones y recursos de la clínica.",
    "Cumplir con los compromisos económicos de los servicios recibidos.",
    "Firmar el consentimiento informado para los procedimientos.",
    "Asistir puntualmente a las citas y reportar cambios en su salud.",
];

export default function DerechosDeberesPage() {
  return (
    <div className="space-y-8">
        <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-primary">Derechos y Deberes del Paciente</h1>
            <p className="mt-4 text-muted-foreground max-w-3xl mx-auto">
                En la Clínica de la Costa, garantizamos que todos nuestros pacientes sean tratados con respeto, dignidad y cuidado. Conocer sus derechos y deberes es fundamental para una atención segura y efectiva.
            </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-2xl text-primary">
                        <Shield className="text-accent" />
                        Derechos del Paciente
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-3 list-disc list-inside text-muted-foreground">
                        {derechos.map((derecho, index) => <li key={index}>{derecho}</li>)}
                    </ul>
                </CardContent>
            </Card>

            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-2xl text-primary">
                        <Handshake className="text-accent" />
                        Deberes del Paciente
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-3 list-disc list-inside text-muted-foreground">
                        {deberes.map((deber, index) => <li key={index}>{deber}</li>)}
                    </ul>
                </CardContent>
            </Card>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
             <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-xl text-primary">
                        <DatabaseZap className="text-accent" />
                        Protección de Datos
                    </CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                    <p>
                        De acuerdo con la Ley 1581 de 2012, garantizamos la protección de sus datos personales. Tiene derecho a conocer, actualizar y rectificar su información. Para más detalles, contacte a <a href="mailto:protecciondedatos@clinicadelacosta.co" className="text-accent hover:underline">protecciondedatos@clinicadelacosta.co</a>.
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-xl text-primary">
                        <Mail className="text-accent" />
                        Reclamaciones y Sugerencias
                    </CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                     <p>
                        Para presentar una queja, reclamo o sugerencia, puede contactarnos a través de nuestras líneas de atención o escribiendo a <a href="mailto:quejas@clinicadelacosta.co" className="text-accent hover:underline">quejas@clinicadelacosta.co</a>.
                    </p>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}

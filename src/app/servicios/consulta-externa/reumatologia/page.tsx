import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ExternalLink, Stethoscope } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Reumatología - Clínica de la Costa',
    description: 'Acceda a nuestro portal especializado en Reumatología para una atención integral de enfermedades autoinmunes y musculoesqueléticas.',
};

export default function ReumatologiaRedirectPage() {
    const externalUrl = "https://clinica-reumatologia.vercel.app/";

    return (
        <div className="flex items-center justify-center py-12">
            <Card className="w-full max-w-2xl text-center shadow-lg">
                <CardHeader>
                    <div className="mx-auto bg-accent/10 p-4 rounded-full w-fit mb-4">
                        <Stethoscope className="h-12 w-12 text-accent" />
                    </div>
                    <CardTitle className="text-3xl text-primary">Portal Especializado de Reumatología</CardTitle>
                    <CardDescription className="text-lg pt-2">
                        Atención de vanguardia para enfermedades autoinmunes.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                        Para brindarle la mejor atención especializada, nuestro servicio de Reumatología se gestiona a través de un portal externo dedicado.
                    </p>
                    <p className="text-foreground">
                        Será redirigido a nuestra plataforma de Reumatología, donde encontrará información detallada, especialistas y podrá gestionar su atención.
                    </p>
                </CardContent>
                <CardFooter className="flex justify-center p-6">
                    <Button asChild size="lg" className="bg-accent hover:bg-accent/90 w-full sm:w-auto">
                        <Link href={externalUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-2 h-5 w-5" />
                            Visitar el Portal de Reumatología
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}

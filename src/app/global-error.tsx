'use client';

import { useEffect } from 'react';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

/**
 * Global error handler for unhandled errors in the app
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global error:', error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="container mx-auto px-4 py-12 min-h-screen flex items-center justify-center">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-destructive">
                <AlertCircle className="h-6 w-6" />
                Error Crítico
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Ha ocurrido un error crítico en la aplicación. Por favor, intenta recargar la página o contacta al soporte técnico.
              </p>
              {process.env.NODE_ENV === 'development' && (
                <details className="mt-4 p-4 bg-muted rounded-md">
                  <summary className="cursor-pointer font-semibold">Detalles del error</summary>
                  <pre className="mt-2 text-xs overflow-auto">
                    {error.toString()}
                    {'\n'}
                    {error.stack}
                    {error.digest && `\nDigest: ${error.digest}`}
                  </pre>
                </details>
              )}
              <div className="flex gap-2">
                <Button onClick={() => reset()} variant="default">
                  Reintentar
                </Button>
                <Button onClick={() => window.location.href = '/'} variant="outline">
                  Ir al inicio
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </body>
    </html>
  );
}

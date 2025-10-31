'use client';

import { useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

/**
 * Root-level error handler for the app
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('App error:', error);
  }, [error]);

  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-6 w-6" />
            Error
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Lo sentimos, ha ocurrido un error. Por favor, intenta nuevamente.
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
              Intentar de nuevo
            </Button>
            <Button onClick={() => window.location.href = '/'} variant="outline">
              Ir al inicio
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

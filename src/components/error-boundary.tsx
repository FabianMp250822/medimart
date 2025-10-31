'use client';

import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * Client-side Error Boundary component for graceful error handling.
 * Catches errors in child components and displays fallback UI.
 */
export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="container mx-auto px-4 py-12">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-destructive">
                <AlertCircle className="h-6 w-6" />
                Algo salió mal
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Lo sentimos, ha ocurrido un error inesperado. Por favor, intenta recargar la página.
              </p>
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="mt-4 p-4 bg-muted rounded-md">
                  <summary className="cursor-pointer font-semibold">Detalles del error</summary>
                  <pre className="mt-2 text-xs overflow-auto">
                    {this.state.error.toString()}
                    {'\n'}
                    {this.state.error.stack}
                  </pre>
                </details>
              )}
              <div className="flex gap-2">
                <Button
                  onClick={() => this.setState({ hasError: false, error: null })}
                  variant="default"
                >
                  Intentar de nuevo
                </Button>
                <Button
                  onClick={() => window.location.href = '/'}
                  variant="outline"
                >
                  Ir al inicio
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

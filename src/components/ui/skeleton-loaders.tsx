/**
 * Componentes de skeleton loading para mejorar la percepción de velocidad
 * Estos se muestran mientras se cargan los componentes dinámicos
 */

export function SectionSkeleton({ className = "h-64" }: { className?: string }) {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className={`${className} bg-muted animate-pulse rounded-lg`} />
    </div>
  );
}

export function CardsSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="h-8 w-48 bg-muted animate-pulse rounded mb-4" />
      <div className="h-6 w-96 bg-muted animate-pulse rounded mb-8" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="space-y-4">
            <div className="h-64 bg-muted animate-pulse rounded-lg" />
            <div className="h-4 bg-muted animate-pulse rounded w-3/4" />
            <div className="h-4 bg-muted animate-pulse rounded w-1/2" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function SliderSkeleton() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="h-8 w-64 bg-muted animate-pulse rounded mb-8 mx-auto" />
      <div className="flex gap-4 overflow-hidden">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-32 w-48 bg-muted animate-pulse rounded-lg flex-shrink-0" />
        ))}
      </div>
    </div>
  );
}

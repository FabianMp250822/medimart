import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from './ui/button';
import Link from 'next/link';
import { Blog } from '@/types/blog';

interface RecentArticlesProps {
  articles: Blog[];
}

export function RecentArticles({ articles }: RecentArticlesProps) {
  return (
    <section className="py-16 text-center">
      <h2 className="text-3xl font-bold text-primary my-4">Consulta Nuestros Artículos Más Recientes</h2>
      {articles.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            {articles.map((article) => (
              <Card key={article.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 text-left flex flex-col group">
                 <Link href={`/noticias/${article.id}`} className="block overflow-hidden">
                    <div className="relative h-56">
                        <Image src={article.image} alt={article.title} layout="fill" objectFit="cover" className="transition-transform duration-300 group-hover:scale-105"/>
                    </div>
                </Link>
                <CardContent className="p-6 flex flex-col flex-grow">
                  <p className="text-sm text-accent font-semibold">{article.category}</p>
                  <Link href={`/noticias/${article.id}`} className="hover:underline">
                    <h3 className="text-lg font-bold text-primary mt-2 mb-4 flex-grow">{article.title}</h3>
                  </Link>
                   <Button variant="link" className="p-0 text-accent mt-auto self-start">
                     <Link href={`/noticias/${article.id}`}>Leer más...</Link>
                    </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <Button asChild className="mt-12 bg-accent hover:bg-accent/90">
            <Link href="/noticias">Ver más artículos</Link>
          </Button>
        </>
      ) : (
        <p className="text-muted-foreground mt-8">No hay artículos recientes para mostrar.</p>
      )}
    </section>
  );
}

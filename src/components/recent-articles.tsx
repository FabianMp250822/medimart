import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from './ui/button';

const articles = [
  {
    title: 'Importancia de la Vacunación para Prevenir Enfermedades',
    category: 'Prevención y Salud',
    image: 'https://placehold.co/400x300.png',
    hint: 'vaccination clinic'
  },
  {
    title: 'Diez Consejos para Mantener un Corazón Saludable este Año',
    category: 'Cardiología',
    image: 'https://placehold.co/400x300.png',
    hint: 'healthy heart'
  },
  {
    title: 'Últimos Avances en el Tratamiento del Cáncer de Próstata',
    category: 'Oncología',
    image: 'https://placehold.co/400x300.png',
    hint: 'medical research'
  },
];

export function RecentArticles() {
  return (
    <section className="py-16 text-center">
      <h2 className="text-3xl font-bold text-primary my-4">Consulta Nuestros Artículos Más Recientes</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
        {articles.map((article) => (
          <Card key={article.title} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 text-left">
            <div className="relative h-56">
                <Image src={article.image} alt={article.title} layout="fill" objectFit="cover" data-ai-hint={article.hint}/>
            </div>
            <CardContent className="p-6">
              <p className="text-sm text-accent font-semibold">{article.category}</p>
              <h3 className="text-lg font-bold text-primary mt-2 mb-4 h-16">{article.title}</h3>
              <Button variant="link" className="p-0 text-accent">Leer más...</Button>
            </CardContent>
          </Card>
        ))}
      </div>
      <Button className="mt-12 bg-accent hover:bg-accent/90">Ver más artículos</Button>
    </section>
  );
}

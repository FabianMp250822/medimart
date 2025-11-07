import { Blog, generateSlug } from '@/types/blog';
import { Card, CardContent } from '../ui/card';
import Link from 'next/link';
import Image from 'next/image';
import { Separator } from '../ui/separator';

interface SimilarArticlesProps {
    articles: Blog[];
}

function getBlogUrl(blog: Blog): string {
  const slug = blog.slug || generateSlug(blog.title);
  return `/noticias/${slug}`;
}

export function SimilarArticles({ articles }: SimilarArticlesProps) {
    return (
        <section className="mt-16 py-8">
            <Separator className="mb-8" />
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-8 text-center">Artículos Similares</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {articles.map((article) => (
                    <Card key={article.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col group">
                        <Link href={getBlogUrl(article)} className="block overflow-hidden">
                            <div className="relative h-48 w-full">
                                <Image
                                    src={article.image}
                                    alt={article.title}
                                    layout="fill"
                                    objectFit="cover"
                                    className="transition-transform duration-300 group-hover:scale-105"
                                />
                            </div>
                        </Link>
                        <CardContent className="p-4 flex flex-col flex-grow">
                            <p className="text-xs text-accent font-semibold mb-1">{article.category}</p>
                            <h3 className="text-base font-bold text-primary flex-grow">
                                <Link href={getBlogUrl(article)} className="hover:underline">
                                    {article.title}
                                </Link>
                            </h3>
                             <p className="text-xs text-muted-foreground mt-2">
                                {new Date(article.date).toLocaleDateString('es-ES', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' })}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
}

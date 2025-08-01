import { Blog } from '@/types/blog';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import Link from 'next/link';
import Image from 'next/image';

interface BlogSidebarProps {
    recentBlogs: Blog[];
}

export function BlogSidebar({ recentBlogs }: BlogSidebarProps) {
    return (
        <div className="sticky top-24 space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl text-primary">Noticias Destacadas</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-4">
                        {recentBlogs.map(blog => (
                            <li key={blog.id} className="flex items-start gap-4">
                                <Link href={`/noticias/${blog.id}`} className="block w-20 h-20 relative flex-shrink-0">
                                    <Image 
                                        src={blog.image} 
                                        alt={blog.title} 
                                        layout="fill" 
                                        objectFit="cover" 
                                        className="rounded-md"
                                    />
                                </Link>
                                <div>
                                    <h4 className="font-semibold text-base leading-tight">
                                        <Link href={`/noticias/${blog.id}`} className="hover:text-accent transition-colors">
                                            {blog.title}
                                        </Link>
                                    </h4>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        {new Date(blog.date).toLocaleDateString('es-ES', { month: 'long', day: 'numeric', year: 'numeric' })}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>

             <Card>
                <CardHeader>
                    <CardTitle className="text-xl text-primary">Categorías</CardTitle>
                </CardHeader>
                <CardContent>
                   <ul className="space-y-2">
                        <li><Link href="#" className="text-foreground hover:text-accent transition-colors">Salud</Link></li>
                        <li><Link href="#" className="text-foreground hover:text-accent transition-colors">Tecnología</Link></li>
                        <li><Link href="#" className="text-foreground hover:text-accent transition-colors">Bienestar</Link></li>
                        <li><Link href="#" className="text-foreground hover:text-accent transition-colors">Noticias de la Clínica</Link></li>
                   </ul>
                </CardContent>
            </Card>
        </div>
    )
}
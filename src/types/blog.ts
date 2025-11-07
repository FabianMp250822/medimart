export interface Blog {
  id: string;
  author: string;
  category: string;
  comments: number;
  content: string;
  date: string;
  image: string;
  lugar: string;
  title: string;
  slug?: string;
}

// Función para generar slug a partir del título
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD') // Normalizar caracteres Unicode
    .replace(/[\u0300-\u036f]/g, '') // Eliminar acentos
    .replace(/[^a-z0-9\s-]/g, '') // Eliminar caracteres especiales
    .trim()
    .replace(/\s+/g, '-') // Reemplazar espacios con guiones
    .replace(/-+/g, '-'); // Eliminar guiones múltiples
}

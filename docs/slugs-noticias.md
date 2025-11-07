# Sistema de Slugs para Noticias

## ¿Qué son los slugs?

Los slugs son URLs amigables y legibles que se generan automáticamente a partir del título de la noticia.

**Antes:** `/noticias/nptISboUTYrnLVZqCN1t`  
**Ahora:** `/noticias/dia-mundial-de-la-enfermedad-cerebrovascular-la-clinica-de-la-costa-lidera-la-prevencion-y-atencion-especializada-en-la-region-caribe`

## Beneficios

✅ **SEO mejorado**: Los motores de búsqueda entienden mejor el contenido  
✅ **URLs legibles**: Los usuarios pueden leer y entender la URL  
✅ **Compartir fácil**: URLs más profesionales para redes sociales  
✅ **Retrocompatibilidad**: Las URLs antiguas con ID siguen funcionando

## Cómo funciona

### 1. Para nuevas noticias

Cuando crees una nueva noticia en Firebase, simplemente agrega el campo `slug`:

```javascript
{
  title: "Día Mundial de la Enfermedad Cerebrovascular",
  slug: "dia-mundial-enfermedad-cerebrovascular", // ← Agregar manualmente
  author: "Dr. Juan Pérez",
  date: "2025-11-06",
  // ... otros campos
}
```

O déjalo vacío y el sistema lo generará automáticamente del título.

### 2. Para noticias existentes

Ejecuta el script de migración:

```bash
npx tsx scripts/add-slugs-to-blogs.ts
```

Este script:
- Lee todas las noticias de Firebase
- Genera slugs automáticamente desde los títulos
- Actualiza los documentos con el nuevo campo `slug`
- Mantiene las noticias que ya tienen slug

### 3. Generación automática

Si una noticia no tiene campo `slug`, el sistema lo genera automáticamente del título:

- Convierte a minúsculas
- Elimina acentos y caracteres especiales
- Reemplaza espacios con guiones
- Elimina guiones múltiples

**Ejemplo:**
- Título: `"Día Mundial de la Enfermedad Cerebrovascular: ¡Atención Especializada!"`
- Slug: `"dia-mundial-de-la-enfermedad-cerebrovascular-atencion-especializada"`

## Archivos modificados

### Core
- `src/types/blog.ts` - Interfaz Blog con campo slug opcional + función generateSlug()
- `src/app/noticias/[id]/page.tsx` - Busca por slug o ID

### Componentes
- `src/app/noticias/page.tsx` - Lista de noticias con slugs
- `src/components/recent-articles.tsx` - Artículos recientes
- `src/components/blog/similar-articles.tsx` - Artículos similares
- `src/components/blog/blog-sidebar.tsx` - Sidebar de noticias

### SEO
- `src/app/sitemap.ts` - Sitemap con slugs
- `src/lib/structured-data.tsx` - Schema.org con slugs

## Mantenimiento

### Cambiar el título de una noticia

Si cambias el título de una noticia existente, deberías actualizar también el slug manualmente para mantener la coherencia:

```javascript
// Antes
{
  title: "Título Original",
  slug: "titulo-original"
}

// Después de cambiar el título
{
  title: "Nuevo Título Actualizado",
  slug: "nuevo-titulo-actualizado" // ← Actualizar también
}
```

### Verificar slugs duplicados

Asegúrate de que no haya dos noticias con el mismo slug. Si dos noticias tienen títulos muy similares, agrega un identificador único al final:

```javascript
{
  title: "Día Mundial de la Salud",
  slug: "dia-mundial-de-la-salud-2024" // ← Agregar año
}

{
  title: "Día Mundial de la Salud",
  slug: "dia-mundial-de-la-salud-2025" // ← Diferente año
}
```

## Migración de URLs existentes

Las URLs antiguas **siguen funcionando** gracias a la búsqueda dual:

1. El sistema intenta buscar por slug primero
2. Si no encuentra, busca por ID de documento
3. Esto permite que los links antiguos compartidos no se rompan

## Ejemplo completo

```javascript
// Noticia en Firebase
{
  id: "abc123xyz", // ID de documento (generado automáticamente)
  title: "Clínica de la Costa inaugura nueva unidad de cuidados intensivos",
  slug: "clinica-costa-inaugura-nueva-uci", // ← Campo slug
  author: "Dra. María González",
  category: "Infraestructura",
  date: "2025-11-06",
  content: "...",
  image: "https://...",
  lugar: "clinica"
}

// URLs que funcionan:
// ✅ /noticias/clinica-costa-inaugura-nueva-uci (nueva, SEO-friendly)
// ✅ /noticias/abc123xyz (antigua, retrocompatibilidad)
```

## Troubleshooting

### Las URLs no están cambiando

1. Verifica que las noticias tengan el campo `slug` en Firebase
2. Ejecuta el script de migración: `npx tsx scripts/add-slugs-to-blogs.ts`
3. Limpia la caché del navegador
4. Verifica que no haya errores en la consola

### Error 404 en URLs con slug

1. Verifica que el documento en Firebase tenga el campo `slug`
2. Asegúrate de que el slug coincida exactamente con la URL
3. Revisa los logs del servidor para ver qué está buscando

### Slugs con caracteres raros

La función `generateSlug()` elimina automáticamente:
- Acentos y tildes
- Signos de puntuación
- Caracteres especiales
- Espacios extras

Si necesitas un slug específico, agrégalo manualmente al documento de Firebase.

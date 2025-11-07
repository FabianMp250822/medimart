# Metadatos SEO Mejorados para Noticias

## ✅ Implementación Completa

Ahora cuando compartas una URL de noticia en redes sociales o WhatsApp, se mostrará:

- ✅ **Título completo** de la noticia
- ✅ **Imagen destacada** (1200x630px)
- ✅ **Descripción** del contenido (primeros 160 caracteres)
- ✅ **Logo** de Clínica de la Costa
- ✅ **Autor** y fecha de publicación
- ✅ **Categoría** del artículo

## 📱 Plataformas Soportadas

### Facebook / WhatsApp
- Open Graph tags completos
- Imagen: 1200x630px
- Título, descripción y autor

### Twitter / X
- Twitter Cards (summary_large_image)
- Imagen grande con preview
- @ClinicadelaCosta como creador

### LinkedIn
- Open Graph tags
- Vista de artículo profesional

### Google Search
- Schema.org JSON-LD (NewsArticle)
- Breadcrumbs para navegación
- Rich snippets habilitados

## 🔍 Metadatos Incluidos

```typescript
{
  // SEO Básico
  title: "Título | Clínica de la Costa",
  description: "Descripción limpia sin HTML...",
  keywords: ["categoría", "Clínica de la Costa", ...],
  
  // URL Canónica
  canonical: "https://www.clinicadelacosta.com/noticias/slug",
  
  // Open Graph (Facebook, WhatsApp)
  openGraph: {
    title: "Título del artículo",
    description: "Descripción...",
    type: "article",
    url: "URL canónica",
    siteName: "Clínica de la Costa",
    locale: "es_CO",
    images: [
      { url: "imagen-noticia.jpg", 1200x630 },
      { url: "logo-clinica.png", 400x400 }
    ],
    publishedTime: "2025-11-06",
    authors: ["Nombre del autor"],
    section: "Categoría"
  },
  
  // Twitter Cards
  twitter: {
    card: "summary_large_image",
    site: "@ClinicadelaCosta",
    title: "Título",
    description: "Descripción",
    images: ["imagen-noticia.jpg"]
  },
  
  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  }
}
```

## 📊 Schema.org JSON-LD

### NewsArticle Schema
```json
{
  "@context": "https://schema.org",
  "@type": "NewsArticle",
  "headline": "Título de la noticia",
  "image": ["url-imagen"],
  "datePublished": "2025-11-06T...",
  "author": { "@type": "Person", "name": "..." },
  "publisher": {
    "@type": "Organization",
    "name": "Clínica de la Costa",
    "logo": { "@type": "ImageObject", "url": "..." }
  },
  "description": "...",
  "mainEntityOfPage": "URL canónica",
  "articleSection": "Categoría",
  "inLanguage": "es-CO"
}
```

### BreadcrumbList Schema
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "position": 1, "name": "Inicio", "item": "..." },
    { "position": 2, "name": "Noticias", "item": "..." },
    { "position": 3, "name": "Título noticia", "item": "..." }
  ]
}
```

## 🧪 Herramientas de Prueba

### Facebook Sharing Debugger
🔗 https://developers.facebook.com/tools/debug/

1. Pega la URL: `https://www.clinicadelacosta.com/noticias/tu-slug`
2. Click en "Debug"
3. Verás preview de cómo se ve en Facebook/WhatsApp

### Twitter Card Validator
🔗 https://cards-dev.twitter.com/validator

1. Pega la URL
2. Preview de Twitter Card

### Google Rich Results Test
🔗 https://search.google.com/test/rich-results

1. Pega la URL o código HTML
2. Verifica Schema.org y rich snippets

### LinkedIn Post Inspector
🔗 https://www.linkedin.com/post-inspector/

1. Pega la URL
2. Preview para LinkedIn

## 📸 Ejemplo de Vista Previa

### WhatsApp / Facebook
```
┌─────────────────────────────────┐
│ [Imagen destacada 1200x630]     │
├─────────────────────────────────┤
│ Día Mundial de la Enfermedad... │
│ La Clínica de la Costa lidera   │
│ la prevención y atención...     │
│                                 │
│ 🏥 clinicadelacosta.com         │
└─────────────────────────────────┘
```

### Twitter
```
┌─────────────────────────────────┐
│ [Imagen grande]                 │
├─────────────────────────────────┤
│ Día Mundial de la Enfermedad... │
│ La Clínica de la Costa lidera   │
│ la prevención...                │
│                                 │
│ 🔗 clinicadelacosta.com         │
│ 👤 @ClinicadelaCosta            │
└─────────────────────────────────┘
```

## 🎯 URLs Canónicas

Todas las URLs usan el formato:
```
https://www.clinicadelacosta.com/noticias/[slug]
```

Donde `[slug]` es la versión normalizada del título:
- Sin acentos ni caracteres especiales
- Todo en minúsculas
- Espacios reemplazados por guiones
- Máximo 100 caracteres

**Ejemplo:**
- Título: "Día Mundial de la Enfermedad Cerebrovascular: ¡Prevención!"
- Slug: `dia-mundial-de-la-enfermedad-cerebrovascular-prevencion`
- URL: `https://www.clinicadelacosta.com/noticias/dia-mundial-de-la-enfermedad-cerebrovascular-prevencion`

## 🚀 Beneficios SEO

### Google
- ✅ Rich snippets en resultados de búsqueda
- ✅ Breadcrumbs visibles
- ✅ Datos estructurados validados
- ✅ Imagen destacada en búsquedas
- ✅ Fecha de publicación visible
- ✅ Autor reconocido

### Redes Sociales
- ✅ Click-through rate mejorado (CTR)
- ✅ Engagement mayor con imágenes
- ✅ Branding consistente con logo
- ✅ Descripción clara del contenido

### Usuario
- ✅ URLs legibles y compartibles
- ✅ Vista previa profesional
- ✅ Confianza mejorada
- ✅ Mejor experiencia

## 📝 Checklist de Nueva Noticia

Cuando publiques una nueva noticia, asegúrate de:

- [ ] Título claro y descriptivo (50-60 caracteres)
- [ ] Slug personalizado o dejar generar automáticamente
- [ ] Imagen destacada de alta calidad (mínimo 1200x630px)
- [ ] Descripción en los primeros párrafos
- [ ] Categoría apropiada
- [ ] Autor correcto
- [ ] Fecha de publicación
- [ ] Contenido con HTML limpio

## 🔄 Actualizar Noticia Existente

Si editas una noticia y cambias el título:

1. Mantén el mismo `slug` para preservar URLs compartidas
2. O actualiza el `slug` pero crea redirección desde el antiguo
3. Verifica que la imagen siga siendo válida

## 🛠️ Troubleshooting

### La imagen no se muestra en Facebook/WhatsApp
1. Verifica que la URL de la imagen sea pública
2. Imagen debe ser mínimo 200x200px, recomendado 1200x630px
3. Usa Facebook Debugger y haz "Scrape Again"

### Descripción muestra HTML
- El sistema limpia automáticamente etiquetas HTML
- Si hay problemas, revisa el contenido de `blog.content`

### URL no se actualiza
- Limpia caché del navegador
- Usa modo incógnito
- Fuerza re-scraping en Facebook Debugger

### Google no muestra rich snippets
- Puede tomar días o semanas
- Usa Google Search Console para forzar re-indexación
- Verifica que Schema.org sea válido con Rich Results Test

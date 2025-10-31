# Reporte: Imágenes con Placeholders o Sin Mostrar

## Resumen
Se encontraron 5 ubicaciones principales con imágenes placeholder que necesitan URLs reales.

---

## 1. **Team Component** (`src/components/team.tsx`)
**Línea:** 24
**Problema:** Usa placeholder genérico cuando `profileImage` no existe
```tsx
src={member.profileImage || "https://placehold.co/300x400.png"}
```
**Contexto:** Muestra fotos de especialistas en la página principal
**Impacto:** Médicos sin foto muestran placeholder genérico
**Recomendación:** Crear imagen por defecto profesional para especialistas

---

## 2. **Noticias Page Banner** (`src/app/noticias/page.tsx`)
**Línea:** 35
**Problema:** Banner usa placeholder cuando no hay blogs con imágenes
```tsx
const bannerImage = blogsWithImages.length > 0
    ? blogsWithImages[Math.floor(Math.random() * blogsWithImages.length)].image
    : "https://placehold.co/1920x400.png";
```
**Contexto:** Imagen de banner en la página de noticias
**Impacto:** Si no hay blogs con imagen, se muestra placeholder
**Recomendación:** Subir imagen de banner por defecto a Firebase Storage

---

## 3. **Video Gallery** (`src/components/pacientes/video-gallery.tsx`)
**Línea:** 40
**Problema:** Thumbnail de YouTube muestra placeholder si la URL es inválida
```tsx
return "https://placehold.co/480x360.png";
```
**Contexto:** Galería de videos educativos para pacientes
**Impacto:** Videos con URLs incorrectas muestran placeholder
**Recomendación:** Validar URLs de YouTube en Firebase antes de publicar

---

## 4. **Nutrición y Dietética** (`src/app/servicios/consulta-externa/nutricion-y-dietetica/page.tsx`)
**Línea:** 58
**Problema:** Banner del servicio usa placeholder
```tsx
src="https://placehold.co/1200x400.png"
```
**Contexto:** Banner principal de la página de Nutrición
**Impacto:** Usuario ve placeholder en lugar de imagen profesional
**Recomendación:** **URGENTE** - Subir foto real de nutrición/alimentos saludables

---

## 5. **Profile View** (`src/components/pacientes/dashboard/profile-view.tsx`)
**Línea:** 20
**Problema:** Avatar usa `undefined` cuando no hay `photoURL`
```tsx
<AvatarImage src={user.photoURL || undefined} alt={user.displayName || "Usuario"} />
```
**Contexto:** Avatar del paciente en el dashboard
**Impacto:** Pacientes sin foto ven iniciales por defecto (correcto)
**Recomendación:** Implementar avatar por defecto con iniciales de colores

---

## Imágenes Configuradas Correctamente

### ✅ Dominios permitidos en `next.config.ts`:
- `placehold.co` (para desarrollo)
- `firebasestorage.googleapis.com` (producción)
- `contenedor-de-video.firebasestorage.app` (videos)
- `img.youtube.com` (thumbnails)
- `picsum.photos` (testing)

---

## URLs de Firebase Storage Encontradas

### Entidades en Convenio (18 logos) ✅
- ALIANZ, ANAS WAYUU, AXA COLPATRIA, BASE NAVAL, etc.
- Ruta: `contenedor-de-video.firebasestorage.app/o/...`

### Certificaciones (3 logos) ✅
- ISO 9001:2015, BPC, BPE
- Ruta: `contenedor-de-video.firebasestorage.app/o/...`

### Servicios de Hospitalización ✅
- Habitaciones adultos y pediátricas
- Ruta: `clinica-de-la-costa.appspot.com/o/web%20imagen/...`

---

## Prioridades de Acción

### 🔴 ALTA PRIORIDAD
1. **Nutrición y Dietética**: Reemplazar placeholder con imagen real
2. **Banner de Noticias**: Crear imagen de respaldo profesional

### 🟡 MEDIA PRIORIDAD
3. **Team Component**: Diseñar avatar por defecto para médicos sin foto
4. **Video Gallery**: Implementar validación de URLs de YouTube

### 🟢 BAJA PRIORIDAD
5. **Profile View**: Ya funciona correctamente con fallback

---

## Recomendaciones Técnicas

1. **Crear carpeta de imágenes por defecto en Firebase Storage**:
   - `default-images/doctor-placeholder.jpg`
   - `default-images/news-banner.jpg`
   - `default-images/service-default.jpg`

2. **Actualizar constantes en código**:
   ```typescript
   const DEFAULT_DOCTOR_IMAGE = 'https://firebasestorage.googleapis.com/.../doctor-placeholder.jpg';
   const DEFAULT_BANNER_IMAGE = 'https://firebasestorage.googleapis.com/.../news-banner.jpg';
   ```

3. **Implementar función helper**:
   ```typescript
   function getImageWithFallback(url: string | undefined, fallback: string): string {
     return url && url !== '' ? url : fallback;
   }
   ```

---

**Fecha del reporte:** 31 de octubre de 2025
**Generado por:** Análisis de código automatizado

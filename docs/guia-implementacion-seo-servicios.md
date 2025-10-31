# Guía de Implementación SEO para Páginas de Servicios

## Resumen
Esta guía documenta el sistema de metadatos dinámicos implementado para optimizar el posicionamiento SEO individual de cada servicio y especialista en Google.

## Archivos Clave Creados

### 1. `src/lib/services-metadata.ts`
**Propósito**: Configuración centralizada de metadatos SEO para todos los servicios médicos.

**Estructura**:
```typescript
export interface ServiceMetadata {
  slug: string;              // Ruta del servicio (ej: 'servicios/consulta-externa/cardiologia')
  name: string;              // Nombre del servicio
  title: string;             // Título SEO único y optimizado
  description: string;       // Descripción rica 150-200 caracteres
  keywords: string[];        // 6-7 keywords específicas
  specialty: string;         // Para filtrar médicos de Firebase
  category: 'internacion' | 'quirurgico' | 'consulta-externa' | 'apoyo-diagnostico' | 'otros';
  image?: string;            // URL de imagen OpenGraph
  icon?: string;             // Ícono opcional
}
```

**Servicios Configurados (31 totales)**:

#### Internación (3)
- `hospitalizacion`
- `cuidado-critico`
- `atencion-vih`

#### Quirúrgicos (11)
- `cirugia-general`
- `neurocirugia`
- `cirugia-plastica`
- `cirugia-ortopedica`
- `cirugia-cardiovascular`
- `cirugia-urologica`
- `cirugia-ginecologica`
- `cirugia-oftalmologica`
- `cirugia-otorrinolaringologica`
- `cirugia-maxilofacial`
- `cirugia-pediatrica`
- `cirugia-oncologica`
- `cirugia-gastrointestinal`
- `cirugia-de-columna`

#### Consulta Externa (14)
- `nutricion-dietetica`
- `cardiologia`
- `dermatologia`
- `ginecologia-obstetricia`
- `pediatria`
- `medicina-interna`
- `oftalmologia`
- `urologia`
- `ortopedia-traumatologia`
- `neurologia`
- `psiquiatria`
- `gastroenterologia`
- `endocrinologia`
- `neumologia`
- `otorrinolaringologia`
- `oncologia`
- `infectologia`

#### Apoyo Diagnóstico (6)
- `laboratorio-clinico`
- `imagenes-diagnosticas`
- `ecocardiografia`
- `endoscopia`
- `fisioterapia`
- `terapia-respiratoria`

#### Atención Inmediata (1)
- `urgencias`

### 2. `src/lib/metadata-helpers.ts`
**Propósito**: Función helper para generar objetos Metadata completos de Next.js.

**Función Principal**:
```typescript
export function generateServiceMetadata(service: ServiceMetadata): Metadata
```

**Genera**:
- `title` y `description` únicos
- `keywords` array
- `alternates.canonical` para URL canónica
- `openGraph` completo (title, description, url, siteName, locale, type, images)
- `twitter` card con metadata
- `robots` configuración (index, follow, googleBot)

### 3. Structured Data - `src/lib/structured-data.tsx`
Ya existía, pero se usa `generateMedicalServiceSchema` para JSON-LD.

## Patrón de Implementación

### Ejemplo Completo (nutricion-y-dietetica):

```typescript
// 1. Imports
import { getServiceMetadata } from '@/lib/services-metadata';
import { generateServiceMetadata } from '@/lib/metadata-helpers';
import { generateMedicalServiceSchema } from '@/lib/structured-data';
import { safeQuery } from '@/lib/firebase-helpers';

// 2. Obtener configuración del servicio
const serviceData = getServiceMetadata('nutricion-dietetica')!;

// 3. Generar metadata
export const metadata: Metadata = generateServiceMetadata(serviceData);

// 4. Función para obtener especialistas (reemplazar adminDb con safeQuery)
async function getSpecialists(): Promise<Medico[]> {
    return safeQuery(async (db) => {
        const snapshot = await db.collection('medicos')
            .where('especialidad', '==', serviceData.specialty) // Usar serviceData.specialty
            .get();
        if (snapshot.empty) {
            return [];
        }
        return snapshot.docs.map(doc => ({ 
            id: doc.id, 
            ...(doc.data() as Omit<Medico, 'id'>) 
        }));
    }, []);
}

// 5. En el componente, agregar Schema.org JSON-LD
export default async function ServicePage() {
    const specialists = await getSpecialists();
    
    const serviceSchema = generateMedicalServiceSchema({
        name: serviceData.name,
        description: serviceData.description,
        url: `https://clinica-de-la-costa.app/${serviceData.slug}`
    });
    
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
            />
            <div className="space-y-12">
                {/* Contenido del servicio */}
            </div>
        </>
    );
}
```

## Lista de Archivos a Actualizar

### ✅ Completados
1. `src/app/servicios/consulta-externa/nutricion-y-dietetica/page.tsx`
2. `src/app/servicios/quirurgicos/cirugia-general/page.tsx`

### ⏳ Pendientes de Actualizar

#### Internación
- [ ] `src/app/servicios/internacion/hospitalizacion/page.tsx`
- [ ] `src/app/servicios/internacion/cuidado-critico/page.tsx`
- [ ] `src/app/servicios/internacion/atencion-vih/page.tsx`

#### Quirúrgicos
- [ ] `src/app/servicios/quirurgicos/neurocirugia/page.tsx`
- [ ] `src/app/servicios/quirurgicos/cirugia-plastica-y-estetica/page.tsx` → Verificar slug
- [ ] `src/app/servicios/quirurgicos/cirugia-ortopedica/page.tsx`
- [ ] `src/app/servicios/quirurgicos/cirugia-vascular-y-angiologica/page.tsx` → `cirugia-cardiovascular`
- [ ] `src/app/servicios/quirurgicos/cirugia-urologica/page.tsx`
- [ ] `src/app/servicios/quirurgicos/cirugia-ginecologica/page.tsx`
- [ ] `src/app/servicios/quirurgicos/cirugia-oftalmologica/page.tsx`
- [ ] `src/app/servicios/quirurgicos/cirugia-otorrinolaringologia/page.tsx`
- [ ] `src/app/servicios/quirurgicos/cirugia-maxilofacial/page.tsx`
- [ ] `src/app/servicios/quirurgicos/cirugia-pediatrica/page.tsx`
- [ ] `src/app/servicios/quirurgicos/cirugia-oncologica/page.tsx`
- [ ] `src/app/servicios/quirurgicos/cirugia-gastrointestinal/page.tsx`
- [ ] Verificar si existe `cirugia-de-columna/page.tsx`

#### Consulta Externa
- [ ] `src/app/servicios/consulta-externa/cardiologia/page.tsx`
- [ ] `src/app/servicios/consulta-externa/dermatologia/page.tsx`
- [ ] Verificar rutas existentes y crear si faltan

#### Apoyo Diagnóstico
- [ ] `src/app/servicios/apoyo-diagnostico/laboratorio-clinico/page.tsx`
- [ ] `src/app/servicios/apoyo-diagnostico/imagenes-diagnosticas/page.tsx`
- [ ] Verificar otras rutas

#### Atención Inmediata
- [ ] `src/app/servicios/atencion-inmediata/urgencias/page.tsx`

## Checklist de Implementación por Archivo

Para cada servicio:

1. **[ ] Agregar imports**:
   ```typescript
   import { getServiceMetadata } from '@/lib/services-metadata';
   import { generateServiceMetadata } from '@/lib/metadata-helpers';
   import { generateMedicalServiceSchema } from '@/lib/structured-data';
   import { safeQuery } from '@/lib/firebase-helpers';
   ```

2. **[ ] Obtener configuración**:
   ```typescript
   const serviceData = getServiceMetadata('KEY_DEL_SERVICIO')!;
   ```
   ⚠️ Verificar que `KEY_DEL_SERVICIO` exista en `services-metadata.ts`

3. **[ ] Reemplazar metadata hardcoded**:
   ```typescript
   export const metadata: Metadata = generateServiceMetadata(serviceData);
   ```

4. **[ ] Actualizar función de especialistas**:
   - Reemplazar `adminDb` con `safeQuery`
   - Usar `serviceData.specialty` en el where query
   - Agregar manejo de `snapshot.empty`
   - Retornar array vacío en el segundo parámetro de safeQuery: `, [])`

5. **[ ] Agregar Schema.org JSON-LD**:
   - Generar `serviceSchema` con `generateMedicalServiceSchema`
   - Agregar `<script type="application/ld+json">` al inicio del JSX
   - Envolver todo en `<>...</>` fragment

6. **[ ] Verificar errores**:
   - Compilar TypeScript sin errores
   - Verificar que specialty en Firebase coincida con `serviceData.specialty`

## Mapeo de Especialidades Firebase

⚠️ **IMPORTANTE**: El campo `serviceData.specialty` debe coincidir EXACTAMENTE con el valor en Firebase `medicos.especialidad`.

Ejemplos de especialidades en Firebase:
- "Nutrición y Dietética"
- "Cirugía General"
- "Cardiología"
- "Dermatología"
- "Ginecología y Obstetricia"
- "Pediatría"
- "Medicina Interna"
- "Oftalmología"
- "Urología"
- "Ortopedia y Traumatología"
- "Neurología"
- "Psiquiatría"
- "Gastroenterología"
- "Endocrinología"
- "Neumología"
- "Otorrinolaringología"
- "Oncología"
- "Neurocirugía"
- "Cirugía Plástica y Estética"
- "Angiología"
- "Cirugía Pediátrica"
- "Cirugía Maxilofacial"

## Beneficios SEO de esta Implementación

1. **Metadatos Únicos**: Cada servicio tiene title, description y keywords únicos optimizados para búsqueda.

2. **Schema.org JSON-LD**: Google entiende mejor el tipo de contenido (MedicalProcedure) y puede generar Rich Results.

3. **Open Graph Completo**: Mejores previews en redes sociales (Facebook, LinkedIn, WhatsApp).

4. **Twitter Cards**: Previews enriquecidas en Twitter/X.

5. **URLs Canónicas**: Evita contenido duplicado en indexación.

6. **Robots Meta Optimizado**: Control granular de cómo Google indexa cada página.

7. **Keywords Array**: Lista específica de términos de búsqueda relevantes por servicio.

8. **Descripción Rica**: 150-200 caracteres optimizados que aparecen en SERPs de Google.

## Testing

### 1. Verificar Metadata en Dev
```bash
npm run dev
```
- Abrir DevTools → Elements → `<head>`
- Verificar `<title>`, `<meta name="description">`, `<meta property="og:*">`

### 2. Verificar Schema.org
- Ir a [Google Rich Results Test](https://search.google.com/test/rich-results)
- Pegar URL del servicio
- Verificar que detecte `MedicalProcedure` o `MedicalBusiness`

### 3. Verificar Open Graph
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)

### 4. Verificar Sitemap
```bash
npm run build
npm start
# Visitar http://localhost:3000/sitemap.xml
```

## Mantenimiento Futuro

### Agregar Nuevo Servicio

1. **Agregar en `services-metadata.ts`**:
   ```typescript
   'nuevo-servicio': {
       slug: 'servicios/categoria/nuevo-servicio',
       name: 'Nombre del Servicio',
       title: 'Título SEO Único - 50-60 caracteres',
       description: 'Descripción rica optimizada 150-200 caracteres...',
       keywords: ['keyword1', 'keyword2', 'keyword3', 'ciudad'],
       specialty: 'Especialidad Exacta en Firebase',
       category: 'consulta-externa',
       image: 'https://url-imagen.jpg'
   }
   ```

2. **Crear página del servicio**:
   - `src/app/servicios/[categoria]/[nuevo-servicio]/page.tsx`
   - Seguir patrón de implementación descrito arriba

3. **Verificar**:
   - Metadata generada correctamente
   - Query de especialistas funciona
   - Schema.org JSON-LD presente
   - Sin errores de compilación

## Próximos Pasos

1. **Aplicar patrón a todos los servicios pendientes** (~27 archivos)
2. **Verificar que slugs coincidan con rutas reales**
3. **Ajustar especialidades si no coinciden con Firebase**
4. **Probar sitemap.xml generación** después de actualizar todos
5. **Ejecutar Google Rich Results Test** en 5-10 servicios
6. **Actualizar imágenes placeholder** identificadas en `reporte-imagenes-placeholder.md`

## Comandos Útiles

```bash
# Buscar archivos de servicios
Get-ChildItem -Recurse -Filter "page.tsx" -Path "src/app/servicios"

# Buscar uso de adminDb (pendiente migrar a safeQuery)
git grep "adminDb" "src/app/servicios"

# Verificar errores TypeScript
npm run build

# Ejecutar en desarrollo
npm run dev
```

## Notas Importantes

- **No eliminar metadata anterior** hasta confirmar que nueva funciona
- **Siempre usar `safeQuery`** en lugar de `adminDb` directo
- **Verificar specialty exacta** en Firebase antes de deployar
- **Imágenes**: Actualizar URLs cuando se suban a Firebase Storage
- **Fragment JSX**: Recordar cerrar `</>` al final del return

---

**Última actualización**: Implementados 2 servicios de ejemplo (nutrición, cirugía general)
**Estado**: Sistema base completo, pendiente aplicar a ~27 servicios restantes

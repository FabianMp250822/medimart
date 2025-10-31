# 📋 PLAN DE TRABAJO: SEO Optimizado para Posicionamiento Individual de Servicios

## 🎯 Objetivo Principal
Implementar metadata dinámica y términos de búsqueda alternativos en **TODOS los servicios** para que cuando usuarios busquen términos coloquiales como:
- "cirugía de corazón" → Posicione página de Cirugía Cardiovascular
- "operación de vesícula" → Posicione página de Cirugía General
- "sacar la vesícula" → Posicione página de Cirugía General
- "UCI niños" → Posicione página de Cuidado Crítico

Google mostrará **exactamente la página específica** de ese servicio.

---

## ✅ FASE 1: Sistema Base (COMPLETADO)

### Archivos Creados
- ✅ `src/lib/services-metadata.ts` - 31 servicios configurados
- ✅ `src/lib/metadata-helpers.ts` - Generador de metadata
- ✅ `src/lib/structured-data.tsx` - Actualizado con alternateName
- ✅ `docs/guia-implementacion-seo-servicios.md` - Guía completa

### Mejoras Implementadas
- ✅ Campo `searchTerms` agregado a ServiceMetadata
- ✅ Función `generateServiceMetadata` combina keywords + searchTerms
- ✅ Schema.org `generateMedicalServiceSchema` acepta alternateName
- ✅ Ejemplos implementados: cirugía general, nutrición

---

## 🔄 FASE 2: Agregar Search Terms a TODOS los Servicios

### Estado Actual de searchTerms
| Servicio | searchTerms | Estado |
|----------|-------------|--------|
| hospitalizacion | ✅ 7 términos | Completado |
| cuidado-critico | ✅ 7 términos | Completado |
| cirugia-cardiovascular | ✅ 7 términos | Completado |
| **Resto (28 servicios)** | ❌ Sin searchTerms | **Pendiente** |

### 📝 Tareas Específicas

#### Tarea 2.1: Internación (1 pendiente)
**Archivo**: `src/lib/services-metadata.ts`

- [ ] `atencion-vih` - Agregar searchTerms:
  ```typescript
  searchTerms: ['tratamiento VIH', 'SIDA tratamiento', 'terapia antirretroviral', 'control de VIH', 'medicación para VIH', 'atención de SIDA']
  ```

#### Tarea 2.2: Quirúrgicos (13 pendientes)
**Archivo**: `src/lib/services-metadata.ts`

- [ ] `cirugia-general` - Agregar:
  ```typescript
  searchTerms: ['operación de vesícula', 'cirugía de la vesícula', 'operación de hernia', 'cirugía de apéndice', 'apendicectomía', 'sacar la vesícula', 'operación de hernias inguinales', 'laparoscopia abdominal']
  ```

- [ ] `neurocirugia` - Agregar:
  ```typescript
  searchTerms: ['cirugía de cerebro', 'operación de columna vertebral', 'cirugía de tumor cerebral', 'operación de hernia discal', 'neurocirugía', 'cirugía de nervios']
  ```

- [ ] `cirugia-plastica` - Agregar:
  ```typescript
  searchTerms: ['cirugía estética', 'aumento de senos', 'liposucción', 'abdominoplastia', 'rinoplastia', 'cirugía de nariz', 'levantamiento facial', 'cirugía reconstructiva']
  ```

- [ ] `cirugia-ortopedica` - Agregar:
  ```typescript
  searchTerms: ['operación de cadera', 'cirugía de rodilla', 'reemplazo de cadera', 'prótesis de rodilla', 'operación de meniscos', 'cirugía de huesos', 'fracturas', 'artroscopia']
  ```

- [ ] `cirugia-urologica` - Agregar:
  ```typescript
  searchTerms: ['operación de próstata', 'cirugía de riñón', 'cálculos renales', 'piedras en el riñón', 'operación de vejiga', 'litotripsia', 'cirugía urológica']
  ```

- [ ] `cirugia-ginecologica` - Agregar:
  ```typescript
  searchTerms: ['operación de útero', 'histerectomía', 'cirugía de ovarios', 'miomas uterinos', 'quistes de ovario', 'operación ginecológica', 'cirugía de matriz']
  ```

- [ ] `cirugia-oftalmologica` - Agregar:
  ```typescript
  searchTerms: ['operación de cataratas', 'cirugía de ojos', 'LASIK', 'cirugía de vista', 'operación láser de ojos', 'cirugía refractiva', 'operación de retina']
  ```

- [ ] `cirugia-otorrinolaringologica` - Agregar:
  ```typescript
  searchTerms: ['operación de amígdalas', 'cirugía de senos paranasales', 'operación de nariz', 'septoplastia', 'cirugía de oído', 'adenoides', 'cirugía de garganta']
  ```

- [ ] `cirugia-maxilofacial` - Agregar:
  ```typescript
  searchTerms: ['cirugía de mandíbula', 'operación de cara', 'cirugía facial', 'trauma facial', 'cirugía ortognática', 'operación de maxilar']
  ```

- [ ] `cirugia-pediatrica` - Agregar:
  ```typescript
  searchTerms: ['cirugía infantil', 'operación de niños', 'cirugía en bebés', 'hernias en niños', 'apendicitis infantil', 'cirugía pediátrica']
  ```

- [ ] `cirugia-oncologica` - Agregar:
  ```typescript
  searchTerms: ['cirugía de cáncer', 'operación de tumor', 'resección de tumor', 'cirugía oncológica', 'extirpación de cáncer', 'mastectomía']
  ```

- [ ] `cirugia-gastrointestinal` - Agregar:
  ```typescript
  searchTerms: ['cirugía de estómago', 'operación de intestino', 'bypass gástrico', 'manga gástrica', 'cirugía bariátrica', 'operación de obesidad', 'cirugía de colon']
  ```

- [ ] `cirugia-de-columna` - Agregar:
  ```typescript
  searchTerms: ['operación de columna', 'cirugía de espalda', 'hernia de disco', 'cirugía de hernias discales', 'escoliosis', 'operación de vértebras']
  ```

#### Tarea 2.3: Consulta Externa (14 pendientes)
**Archivo**: `src/lib/services-metadata.ts`

- [ ] `nutricion-dietetica` - Agregar:
  ```typescript
  searchTerms: ['nutricionista', 'bajar de peso', 'dieta personalizada', 'plan alimenticio', 'adelgazar', 'control de diabetes', 'nutrición clínica']
  ```

- [ ] `cardiologia` - Agregar:
  ```typescript
  searchTerms: ['cardiólogo', 'doctor del corazón', 'ecocardiograma', 'presión alta', 'hipertensión', 'problemas del corazón', 'arritmias']
  ```

- [ ] `dermatologia` - Agregar:
  ```typescript
  searchTerms: ['dermatólogo', 'doctor de la piel', 'tratamiento de acné', 'manchas en la piel', 'lunares', 'enfermedades de la piel', 'tratamiento capilar']
  ```

- [ ] `ginecologia-obstetricia` - Agregar:
  ```typescript
  searchTerms: ['ginecólogo', 'obstetra', 'control de embarazo', 'planificación familiar', 'papanicolau', 'ecografía obstétrica', 'médico de mujeres']
  ```

- [ ] `pediatria` - Agregar:
  ```typescript
  searchTerms: ['pediatra', 'doctor de niños', 'médico infantil', 'control de niño sano', 'vacunación', 'enfermedades infantiles']
  ```

- [ ] `medicina-interna` - Agregar:
  ```typescript
  searchTerms: ['internista', 'médico general', 'chequeo médico', 'enfermedades crónicas', 'control de diabetes', 'control de hipertensión']
  ```

- [ ] `oftalmologia` - Agregar:
  ```typescript
  searchTerms: ['oftalmólogo', 'doctor de los ojos', 'examen de vista', 'cataratas', 'glaucoma', 'problemas de visión', 'lentes']
  ```

- [ ] `urologia` - Agregar:
  ```typescript
  searchTerms: ['urólogo', 'doctor de próstata', 'infección urinaria', 'cálculos renales', 'piedras en el riñón', 'problemas de vejiga']
  ```

- [ ] `ortopedia-traumatologia` - Agregar:
  ```typescript
  searchTerms: ['ortopedista', 'traumatólogo', 'doctor de huesos', 'lesiones deportivas', 'dolor de rodilla', 'dolor de espalda', 'fracturas']
  ```

- [ ] `neurologia` - Agregar:
  ```typescript
  searchTerms: ['neurólogo', 'doctor del cerebro', 'migraña', 'dolor de cabeza', 'epilepsia', 'Parkinson', 'derrame cerebral']
  ```

- [ ] `psiquiatria` - Agregar:
  ```typescript
  searchTerms: ['psiquiatra', 'doctor de salud mental', 'depresión', 'ansiedad', 'tratamiento psiquiátrico', 'trastorno bipolar']
  ```

- [ ] `gastroenterologia` - Agregar:
  ```typescript
  searchTerms: ['gastroenterólogo', 'doctor del estómago', 'endoscopia', 'colonoscopia', 'gastritis', 'reflujo', 'problemas digestivos']
  ```

- [ ] `endocrinologia` - Agregar:
  ```typescript
  searchTerms: ['endocrinólogo', 'doctor de diabetes', 'tiroides', 'problemas hormonales', 'control de diabetes', 'obesidad']
  ```

- [ ] `neumologia` - Agregar:
  ```typescript
  searchTerms: ['neumólogo', 'doctor de pulmones', 'asma', 'EPOC', 'problemas respiratorios', 'falta de aire', 'neumonía']
  ```

- [ ] `otorrinolaringologia` - Agregar:
  ```typescript
  searchTerms: ['otorrino', 'doctor de oído nariz y garganta', 'sinusitis', 'otitis', 'problemas de oído', 'pérdida de audición', 'vértigo']
  ```

- [ ] `oncologia` - Agregar:
  ```typescript
  searchTerms: ['oncólogo', 'doctor de cáncer', 'quimioterapia', 'tratamiento de cáncer', 'tumores', 'oncología clínica']
  ```

- [ ] `infectologia` - Agregar:
  ```typescript
  searchTerms: ['infectólogo', 'doctor de VIH', 'enfermedades infecciosas', 'hepatitis', 'tuberculosis', 'infecciones']
  ```

#### Tarea 2.4: Apoyo Diagnóstico (6 pendientes)
**Archivo**: `src/lib/services-metadata.ts`

- [ ] `laboratorio-clinico` - Agregar:
  ```typescript
  searchTerms: ['exámenes de sangre', 'laboratorio', 'análisis clínicos', 'hemograma', 'glicemia', 'pruebas de laboratorio']
  ```

- [ ] `imagenes-diagnosticas` - Agregar:
  ```typescript
  searchTerms: ['rayos x', 'radiografías', 'TAC', 'tomografía', 'resonancia', 'ecografía', 'imágenes médicas']
  ```

- [ ] `ecocardiografia` - Agregar:
  ```typescript
  searchTerms: ['eco del corazón', 'ultrasonido cardíaco', 'ecocardiograma', 'examen del corazón']
  ```

- [ ] `endoscopia` - Agregar:
  ```typescript
  searchTerms: ['endoscopia digestiva', 'colonoscopia', 'gastroscopia', 'examen de estómago', 'examen de colon']
  ```

- [ ] `fisioterapia` - Agregar:
  ```typescript
  searchTerms: ['rehabilitación', 'terapia física', 'fisioterapeuta', 'recuperación post cirugía', 'terapia de rehabilitación']
  ```

- [ ] `terapia-respiratoria` - Agregar:
  ```typescript
  searchTerms: ['terapia pulmonar', 'rehabilitación respiratoria', 'nebulizaciones', 'oxígeno terapia']
  ```

#### Tarea 2.5: Atención Inmediata (1 pendiente)
**Archivo**: `src/lib/services-metadata.ts`

- [ ] `urgencias` - Agregar:
  ```typescript
  searchTerms: ['emergencias', 'urgencias 24 horas', 'sala de emergencias', 'atención de urgencia', 'urgencias médicas', 'emergencia médica']
  ```

---

## 🚀 FASE 3: Implementar en Páginas de Servicios (34 archivos)

### Patrón de Implementación

Para cada archivo `page.tsx`:

```typescript
// 1. IMPORTS
import { getServiceMetadata } from '@/lib/services-metadata';
import { generateServiceMetadata } from '@/lib/metadata-helpers';
import { generateMedicalServiceSchema } from '@/lib/structured-data';
import { safeQuery } from '@/lib/firebase-helpers';

// 2. OBTENER CONFIGURACIÓN
const serviceData = getServiceMetadata('KEY_DEL_SERVICIO')!;

// 3. GENERAR METADATA (incluye keywords + searchTerms automáticamente)
export const metadata: Metadata = generateServiceMetadata(serviceData);

// 4. ACTUALIZAR FUNCIÓN DE ESPECIALISTAS
async function getSpecialists(): Promise<Medico[]> {
    return safeQuery(async (db) => {
        const snapshot = await db.collection('medicos')
            .where('especialidad', '==', serviceData.specialty)
            .get();
        if (snapshot.empty) return [];
        return snapshot.docs.map(doc => ({ 
            id: doc.id, 
            ...(doc.data() as Omit<Medico, 'id'>) 
        }));
    }, []);
}

// 5. AGREGAR SCHEMA.ORG EN COMPONENTE
export default async function ServicePage() {
    const specialists = await getSpecialists();
    
    const serviceSchema = generateMedicalServiceSchema({
        name: serviceData.name,
        description: serviceData.description,
        url: `https://clinica-de-la-costa.app/${serviceData.slug}`,
        alternateName: serviceData.searchTerms // ⭐ CLAVE PARA SEO
    });
    
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
            />
            <div className="space-y-12">
                {/* Contenido */}
            </div>
        </>
    );
}
```

### Lista de Archivos a Actualizar

#### ✅ Completados (2)
1. ✅ `src/app/servicios/consulta-externa/nutricion-y-dietetica/page.tsx`
2. ✅ `src/app/servicios/quirurgicos/cirugia-general/page.tsx`

#### 📋 Internación (3 archivos)
- [ ] `src/app/servicios/internacion/hospitalizacion/page.tsx`
- [ ] `src/app/servicios/internacion/cuidado-critico/page.tsx`
- [ ] `src/app/servicios/internacion/atencion-vih/page.tsx`

#### 📋 Quirúrgicos (12 archivos)
- [ ] `src/app/servicios/quirurgicos/neurocirugia/page.tsx`
- [ ] `src/app/servicios/quirurgicos/cirugia-plastica-y-estetica/page.tsx`
- [ ] `src/app/servicios/quirurgicos/cirugia-ortopedica/page.tsx`
- [ ] `src/app/servicios/quirurgicos/cirugia-vascular-y-angiologica/page.tsx`
- [ ] `src/app/servicios/quirurgicos/cirugia-urologica/page.tsx`
- [ ] `src/app/servicios/quirurgicos/cirugia-ginecologica/page.tsx`
- [ ] `src/app/servicios/quirurgicos/cirugia-oftalmologica/page.tsx`
- [ ] `src/app/servicios/quirurgicos/cirugia-otorrinolaringologia/page.tsx`
- [ ] `src/app/servicios/quirurgicos/cirugia-maxilofacial/page.tsx`
- [ ] `src/app/servicios/quirurgicos/cirugia-pediatrica/page.tsx`
- [ ] `src/app/servicios/quirurgicos/cirugia-oncologica/page.tsx`
- [ ] `src/app/servicios/quirurgicos/cirugia-gastrointestinal/page.tsx`

#### 📋 Consulta Externa (12 archivos)
- [ ] `src/app/servicios/consulta-externa/cardiologia/page.tsx`
- [ ] `src/app/servicios/consulta-externa/dermatologia/page.tsx`
- [ ] `src/app/servicios/consulta-externa/ginecologia-y-obstetricia/page.tsx`
- [ ] `src/app/servicios/consulta-externa/pediatria/page.tsx`
- [ ] `src/app/servicios/consulta-externa/medicina-interna/page.tsx`
- [ ] `src/app/servicios/consulta-externa/oftalmologia/page.tsx`
- [ ] `src/app/servicios/consulta-externa/urologia/page.tsx`
- [ ] `src/app/servicios/consulta-externa/ortopedia-y-traumatologia/page.tsx`
- [ ] `src/app/servicios/consulta-externa/neurologia/page.tsx`
- [ ] `src/app/servicios/consulta-externa/psiquiatria/page.tsx`
- [ ] `src/app/servicios/consulta-externa/gastroenterologia/page.tsx`
- [ ] `src/app/servicios/consulta-externa/endocrinologia/page.tsx`

#### 📋 Apoyo Diagnóstico (6 archivos)
- [ ] `src/app/servicios/apoyo-diagnostico/laboratorio-clinico/page.tsx`
- [ ] `src/app/servicios/apoyo-diagnostico/imagenes-diagnosticas/page.tsx`
- [ ] `src/app/servicios/apoyo-diagnostico/ecocardiografia/page.tsx`
- [ ] `src/app/servicios/apoyo-diagnostico/endoscopia/page.tsx`
- [ ] `src/app/servicios/apoyo-diagnostico/fisioterapia/page.tsx`
- [ ] `src/app/servicios/apoyo-diagnostico/terapia-respiratoria/page.tsx`

#### 📋 Atención Inmediata (1 archivo)
- [ ] `src/app/servicios/atencion-inmediata/urgencias/page.tsx`

---

## 📊 FASE 4: Testing y Validación

### Checklist de Testing

#### 4.1 Verificar Metadata
```bash
npm run dev
```
Para cada servicio:
- [ ] Abrir DevTools → Elements → `<head>`
- [ ] Verificar `<meta name="keywords">` contiene keywords + searchTerms
- [ ] Verificar `<meta name="description">` es única
- [ ] Verificar `<meta property="og:*">` está presente

#### 4.2 Verificar Schema.org
- [ ] Ir a [Google Rich Results Test](https://search.google.com/test/rich-results)
- [ ] Pegar URL de 5 servicios diferentes
- [ ] Verificar que detecte `MedicalProcedure`
- [ ] Verificar que `alternateName` aparezca con los searchTerms

#### 4.3 Verificar Sitemap
```bash
npm run build
npm start
```
- [ ] Visitar `http://localhost:3000/sitemap.xml`
- [ ] Verificar que incluya TODOS los servicios (31 URLs de servicios)

#### 4.4 Testing en Google Search Console
Después de deploy:
- [ ] Solicitar indexación de 5 páginas de servicios
- [ ] Revisar "Rendimiento" después de 7 días
- [ ] Verificar queries de búsqueda que activan cada página
- [ ] Confirmar que términos coloquiales posicionan la página correcta

---

## 🎯 Métricas de Éxito

### KPIs a Monitorear (Google Search Console)

1. **Impresiones por Servicio**
   - Métrica: Número de veces que cada servicio aparece en resultados
   - Objetivo: Aumento del 50% en 30 días

2. **Clicks por Servicio**
   - Métrica: CTR de cada página de servicio
   - Objetivo: CTR > 3% promedio

3. **Queries de Búsqueda**
   - Métrica: Variedad de términos que posicionan cada servicio
   - Objetivo: Mínimo 10 queries diferentes por servicio

4. **Posición Promedio**
   - Métrica: Ranking en Google para términos objetivo
   - Objetivo: Top 3 para términos locales (ej: "cirugía general barranquilla")

### Ejemplo de Métricas Esperadas

| Servicio | Query Ejemplo | Posición Objetivo | Estado |
|----------|---------------|-------------------|--------|
| Cirugía General | "operación de vesícula barranquilla" | Top 3 | Pendiente |
| Cardiología | "cardiólogo barranquilla" | Top 5 | Pendiente |
| UCI | "cuidados intensivos barranquilla" | Top 3 | Pendiente |

---

## 📅 Cronograma Sugerido

### Semana 1: Setup y Primeros Servicios
- **Día 1-2**: Agregar searchTerms a todos los servicios en `services-metadata.ts` (Fase 2)
- **Día 3-4**: Implementar 10 servicios prioritarios (quirúrgicos más buscados)
- **Día 5**: Testing inicial con Google Rich Results Test

### Semana 2: Implementación Masiva
- **Día 1-2**: Implementar 12 servicios de consulta externa
- **Día 3**: Implementar 6 servicios de apoyo diagnóstico
- **Día 4**: Implementar 3 servicios de internación + urgencias
- **Día 5**: Testing completo y corrección de errores

### Semana 3: Deploy y Monitoreo
- **Día 1**: Deploy a producción
- **Día 2**: Solicitar indexación en Google Search Console
- **Día 3-7**: Monitorear errores y ajustar

---

## 🛠️ Comandos Útiles

```bash
# Buscar todos los archivos de servicios
Get-ChildItem -Recurse -Filter "page.tsx" -Path "src/app/servicios" | Select-Object FullName

# Contar servicios pendientes
(Get-ChildItem -Recurse -Filter "page.tsx" -Path "src/app/servicios").Count

# Buscar uso de adminDb (migrar a safeQuery)
git grep "adminDb" "src/app/servicios"

# Verificar errores TypeScript
npm run build

# Desarrollo local
npm run dev

# Build y preview producción
npm run build
npm start
```

---

## ⚠️ Puntos Críticos

### 1. Especialidades en Firebase
⚠️ El campo `serviceData.specialty` DEBE coincidir EXACTAMENTE con `medicos.especialidad` en Firebase.

Ejemplos:
- ✅ "Cirugía General" (correcto)
- ❌ "Cirugia General" (error - sin tilde)
- ❌ "cirugia general" (error - minúsculas)

### 2. Slugs vs Rutas Reales
Verificar que cada slug en `services-metadata.ts` coincida con la ruta del archivo:
- Slug: `'servicios/quirurgicos/cirugia-general'`
- Archivo: `src/app/servicios/quirurgicos/cirugia-general/page.tsx` ✅

### 3. SearchTerms Únicos
Cada servicio debe tener searchTerms ÚNICOS. Evitar duplicados que confundan a Google:
- ❌ "cirugía" en todos los servicios
- ✅ "cirugía de corazón" solo en cardiovascular
- ✅ "operación de vesícula" solo en cirugía general

---

## 📚 Recursos Adicionales

- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Schema.org MedicalProcedure](https://schema.org/MedicalProcedure)
- [Schema.org alternateName](https://schema.org/alternateName)
- [Google Search Console](https://search.google.com/search-console)
- [Next.js Metadata API](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)

---

## 📞 Soporte

Para dudas durante implementación, consultar:
1. `docs/guia-implementacion-seo-servicios.md` - Guía técnica detallada
2. `src/app/servicios/quirurgicos/cirugia-general/page.tsx` - Ejemplo completo implementado
3. `src/app/servicios/consulta-externa/nutricion-y-dietetica/page.tsx` - Otro ejemplo

---

**Última actualización**: Sistema base completado, searchTerms agregados a 3 servicios.
**Pendiente**: Agregar searchTerms a 28 servicios restantes e implementar en 32 archivos page.tsx.

**Estimación de tiempo total**: 40-60 horas
**Prioridad**: ALTA - Impacto directo en posicionamiento orgánico

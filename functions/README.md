# API de Postulaciones - Firebase Cloud Functions

## 🚀 Cloud Functions Implementadas

### 1. **obtenerUsuariosContratados**
Obtiene todas las postulaciones con filtros opcionales

**URL:** `https://obtenerusuarioscontratados-pexytr6ada-uc.a.run.app`

**Método:** `GET`

**Parámetros de Query:**
- `numeroDocumento` (opcional): Filtra por número de documento específico
- `ofertaId` (opcional): Filtra por ID de oferta específica
- `estado` (opcional): Filtra por estado (Pendiente, Revisado, Contratado, Rechazado)
- `limit` (opcional, default: 100): Límite de resultados
- `offset` (opcional, default: 0): Offset para paginación

**Ejemplos de Uso:**

```bash
# Obtener todos los postulantes
curl "https://obtenerusuarioscontratados-pexytr6ada-uc.a.run.app"

# Buscar por número de documento
curl "https://obtenerusuarioscontratados-pexytr6ada-uc.a.run.app?numeroDocumento=1234567890"

# Filtrar por oferta
curl "https://obtenerusuarioscontratados-pexytr6ada-uc.a.run.app?ofertaId=abc123"

# Filtrar por estado
curl "https://obtenerusuarioscontratados-pexytr6ada-uc.a.run.app?estado=Pendiente"

# Paginación
curl "https://obtenerusuarioscontratados-pexytr6ada-uc.a.run.app?limit=20&offset=40"

# Combinación de filtros
curl "https://obtenerusuarioscontratados-pexytr6ada-uc.a.run.app?estado=Pendiente&limit=50"
```

**Respuesta:**

```json
{
  "success": true,
  "count": 2,
  "total": 150,
  "limit": 100,
  "offset": 0,
  "data": [
    {
      "id": "abc123",
      "nombresApellidos": "Juan Pérez García",
      "tipoDocumento": "Cédula de Ciudadanía",
      "numeroDocumento": "1234567890",
      "fechaNacimiento": "1990-05-15",
      "lugarNacimiento": "Barranquilla",
      "genero": "Masculino",
      "estadoCivil": "Soltero",
      "direccionResidencia": "Calle 123 #45-67",
      "telefonoFijo": "3001234",
      "telefonoCelular": "3001234567",
      "correoElectronico": "juan.perez@email.com",
      "tituloObtenido": "Médico General",
      "universidad": "Universidad del Norte",
      "fechaGrado": "2015-12-10",
      "paisTitulo": "Colombia",
      "tituloConvalidado": "No",
      "numeroResolucion": "",
      "especializacion": "Cardiología",
      "universidadEspecializacion": "Universidad de los Andes",
      "fechaInicioEspecializacion": "2016-01-15",
      "fechaFinEspecializacion": "2019-12-20",
      "otraInfoAcademica": "Diplomado en Ecocardiografía",
      "experiencias": [
        {
          "entidad": "Hospital San José",
          "cargo": "Médico General",
          "fechaInicio": "2016-01-15",
          "fechaFin": "2020-12-31",
          "funciones": "Atención de urgencias, consulta externa"
        }
      ],
      "certificaciones": [
        {
          "nombre": "ACLS",
          "entidad": "American Heart Association",
          "fechaExpedicion": "2021-03-15"
        }
      ],
      "tieneTarjetaProfesional": "Sí",
      "numeroTarjetaProfesional": "TP12345",
      "tieneRethus": "Sí",
      "cursosAdicionales": "Manejo de ventiladores mecánicos",
      "idiomas": "Inglés B2",
      "habilidadesInformaticas": "Microsoft Office, SAP",
      "tieneDiscapacidad": "No",
      "perteneceMinoria": "No",
      "aspiracionSalarial": "8000000",
      "disponibilidadViajar": "Sí",
      "referencias": [
        {
          "nombre": "Dr. Carlos Martínez",
          "telefono": "3001112222",
          "relacion": "Jefe Directo"
        }
      ],
      "cvURL": "https://storage.googleapis.com/...?signed_url_token",
      "certificadosURLs": [
        "https://storage.googleapis.com/...?signed_url_token"
      ],
      "ofertaId": "xyz789",
      "ofertaTitulo": "Médico General - Urgencias",
      "fechaPostulacion": "2025-11-11T10:30:00.000Z",
      "estado": "Pendiente"
    }
  ]
}
```

### 2. **obtenerPostulacionPorDocumento**
Obtiene las postulaciones de un usuario específico por número de documento

**URL:** `https://REGION-PROJECT_ID.cloudfunctions.net/obtenerPostulacionPorDocumento`

**Método:** `GET`

**Parámetros de Query:**
- `numeroDocumento` (requerido): Número de documento del postulante

**Ejemplo:**

```bash
curl "https://REGION-PROJECT_ID.cloudfunctions.net/obtenerPostulacionPorDocumento?numeroDocumento=1234567890"
```

**Respuesta:**

```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "id": "abc123",
      "nombresApellidos": "Juan Pérez García",
      "numeroDocumento": "1234567890",
      // ... todos los campos de la postulación
      "cvURL": "https://storage.googleapis.com/...?signed_url_token",
      "certificadosURLs": ["https://storage.googleapis.com/..."],
      "fechaPostulacion": "2025-11-11T10:30:00.000Z",
      "estado": "Pendiente"
    },
    // ... más postulaciones del mismo documento
  ]
}
```

### 3. **estadisticasPostulaciones**
Obtiene estadísticas generales de las postulaciones

**URL:** `https://REGION-PROJECT_ID.cloudfunctions.net/estadisticasPostulaciones`

**Método:** `GET`

**Ejemplo:**

```bash
curl "https://REGION-PROJECT_ID.cloudfunctions.net/estadisticasPostulaciones"
```

**Respuesta:**

```json
{
  "success": true,
  "data": {
    "total": 150,
    "porEstado": {
      "Pendiente": 45,
      "Revisado": 60,
      "Contratado": 20,
      "Rechazado": 25
    },
    "porOferta": {
      "Médico General - Urgencias": 30,
      "Enfermera Jefe": 25,
      "Postulación Espontánea": 95
    },
    "recientes": 28
  }
}
```

## 📦 Estructura de Datos

### Colección: `postulaciones`

```typescript
interface Postulacion {
  // Información Personal
  nombresApellidos: string;
  tipoDocumento: string;
  numeroDocumento: string;
  fechaNacimiento: string;
  lugarNacimiento: string;
  genero: string;
  estadoCivil: string;
  direccionResidencia: string;
  telefonoFijo: string;
  telefonoCelular: string;
  correoElectronico: string;
  
  // Información Académica
  tituloObtenido: string;
  universidad: string;
  fechaGrado: string;
  paisTitulo: string;
  tituloConvalidado: string;
  numeroResolucion: string;
  especializacion: string;
  universidadEspecializacion: string;
  fechaInicioEspecializacion: string;
  fechaFinEspecializacion: string;
  otraInfoAcademica: string;
  
  // Experiencia Laboral
  experiencias: Array<{
    entidad: string;
    cargo: string;
    fechaInicio: string;
    fechaFin: string;
    funciones: string;
  }>;
  
  // Certificaciones
  certificaciones: Array<{
    nombre: string;
    entidad: string;
    fechaExpedicion: string;
  }>;
  
  // Habilidades
  tieneTarjetaProfesional: string;
  numeroTarjetaProfesional: string;
  tieneRethus: string;
  cursosAdicionales: string;
  idiomas: string;
  habilidadesInformaticas: string;
  
  // Información Adicional
  tieneDiscapacidad: string;
  perteneceMinoria: string;
  aspiracionSalarial: string;
  disponibilidadViajar: string;
  
  // Referencias
  referencias: Array<{
    nombre: string;
    telefono: string;
    relacion: string;
  }>;
  
  // Archivos (Storage)
  cvURL: string; // URL firmada válida por 7 días
  certificadosURLs: string[]; // URLs firmadas válidas por 7 días
  
  // Metadata
  ofertaId: string | null;
  ofertaTitulo: string;
  fechaPostulacion: Timestamp;
  estado: 'Pendiente' | 'Revisado' | 'Contratado' | 'Rechazado';
}
```

### Storage

**Estructura de archivos:**
```
postulaciones/
  └── [numeroDocumento]/
      ├── cv_[timestamp]_[nombre_archivo]
      └── certificados/
          ├── [timestamp]_[nombre_certificado1]
          └── [timestamp]_[nombre_certificado2]
```

## 🔐 Seguridad

### URLs Firmadas
- Los archivos en Storage se devuelven con **URLs firmadas** válidas por **7 días**
- No requieren autenticación para acceder durante ese período
- Después de 7 días, las URLs expiran automáticamente

### CORS
- Las funciones tienen **CORS habilitado** (`Access-Control-Allow-Origin: *`)
- Pueden ser consumidas desde cualquier dominio
- No requieren autenticación (son públicas)

### Datos Sensibles
- ⚠️ Las funciones son **públicas** y devuelven **todos los datos**
- Considera implementar autenticación si necesitas restringir acceso
- Para producción, se recomienda agregar API keys o tokens

## 🚀 Despliegue

### 1. Instalar dependencias
```bash
cd functions
npm install
```

### 2. Compilar TypeScript
```bash
npm run build
```

### 3. Desplegar a Firebase
```bash
firebase deploy --only functions
```

### 4. Desplegar una función específica
```bash
firebase deploy --only functions:obtenerUsuariosContratados
```

## 🧪 Testing Local

### Ejecutar emulador
```bash
cd functions
npm run serve
```

Las funciones estarán disponibles en:
- `http://localhost:5001/PROJECT_ID/REGION/obtenerUsuariosContratados`
- `http://localhost:5001/PROJECT_ID/REGION/obtenerPostulacionPorDocumento`
- `http://localhost:5001/PROJECT_ID/REGION/estadisticasPostulaciones`

## 📊 Ejemplos de Integración

### JavaScript/TypeScript

```typescript
// Obtener todas las postulaciones
const response = await fetch('https://obtenerusuarioscontratados-pexytr6ada-uc.a.run.app');
const data = await response.json();

console.log(`Total postulaciones: ${data.total}`);
data.data.forEach(postulacion => {
  console.log(`${postulacion.nombresApellidos} - ${postulacion.estado}`);
});

// Buscar por documento
const doc = '1234567890';
const response2 = await fetch(`https://obtenerusuarioscontratados-pexytr6ada-uc.a.run.app?numeroDocumento=${doc}`);
const data2 = await response2.json();

if (data2.count > 0) {
  console.log(`CV URL: ${data2.data[0].cvURL}`);
}
```

### Python

```python
import requests

# Obtener postulaciones pendientes
url = "https://obtenerusuarioscontratados-pexytr6ada-uc.a.run.app"
params = {"estado": "Pendiente", "limit": 50}

response = requests.get(url, params=params)
data = response.json()

for postulacion in data['data']:
    print(f"{postulacion['nombresApellidos']} - {postulacion['correoElectronico']}")
```

### Excel/Power BI

Puedes conectar directamente la API a Power BI o Excel:
1. Datos → Obtener datos → Desde Web
2. Pegar URL: `https://obtenerusuarioscontratados-pexytr6ada-uc.a.run.app`
3. Power BI parseará automáticamente el JSON

## 🔄 Actualizar Estado de Postulación

Para actualizar el estado de una postulación, necesitas crear una función adicional o usar Firebase Console:

```typescript
// Ejemplo de función para actualizar estado (agregar a index.ts)
export const actualizarEstadoPostulacion = functions.https.onRequest(async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).send('Método no permitido');
    return;
  }

  const { postulacionId, nuevoEstado } = req.body;

  try {
    await db.collection('postulaciones').doc(postulacionId).update({
      estado: nuevoEstado,
      fechaActualizacion: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Error actualizando estado' });
  }
});
```

## 📝 Notas Importantes

1. **Límites de Firebase**
   - Cloud Functions tienen límites de ejecución (60s para HTTP functions)
   - Firestore tiene límites de lectura/escritura
   - Storage tiene límites de almacenamiento y transferencia

2. **Costos**
   - Las funciones HTTP se cobran por invocación
   - Storage se cobra por almacenamiento y transferencia
   - Firestore se cobra por lectura/escritura

3. **Performance**
   - Usa paginación para grandes cantidades de datos
   - Considera agregar índices en Firestore para filtros complejos
   - Las URLs firmadas se generan en cada request (puede ser lento)

4. **Mejoras Futuras**
   - Agregar autenticación/API keys
   - Implementar cache para URLs firmadas
   - Agregar webhook para notificaciones
   - Implementar búsqueda full-text

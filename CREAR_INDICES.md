# Enlaces para Crear Índices en Firestore

Haz clic en estos enlaces para crear los índices necesarios en Firebase Console:

## 1. Índice para búsqueda por número de documento

**Colección:** `postulaciones`
**Campos:**
- `informacionPersonal.numeroDocumento` (Ascending)
- `fechaPostulacion` (Descending)

**Enlace directo:**
```
https://console.firebase.google.com/project/pensionados-d82b2/firestore/indexes?create_composite=Cldwcm9qZWN0cy9wZW5zaW9uYWRvcy1kODJiMi9kYXRhYmFzZXMvKGRlZmF1bHQpL2NvbGxlY3Rpb25Hcm91cHMvcG9zdHVsYWNpb25lcy9pbmRleGVzL18QARoqCiZpbmZvcm1hY2lvblBlcnNvbmFsLm51bWVyb0RvY3VtZW50bxABGhQKEGZlY2hhUG9zdHVsYWNpb24QAhoMCghfX25hbWVfXxAC
```

## 2. Índice para filtrar por oferta

**Colección:** `postulaciones`
**Campos:**
- `ofertaId` (Ascending)
- `fechaPostulacion` (Descending)

**Enlace directo:**
```
https://console.firebase.google.com/project/pensionados-d82b2/firestore/indexes?create_composite=Cldwcm9qZWN0cy9wZW5zaW9uYWRvcy1kODJiMi9kYXRhYmFzZXMvKGRlZmF1bHQpL2NvbGxlY3Rpb25Hcm91cHMvcG9zdHVsYWNpb25lcy9pbmRleGVzL18QARoKCgZvZmVydGFJZBABGhQKEGZlY2hhUG9zdHVsYWNpb24QAhoMCghfX25hbWVfXxAC
```

## 3. Índice para filtrar por estado

**Colección:** `postulaciones`
**Campos:**
- `estado` (Ascending)
- `fechaPostulacion` (Descending)

**Enlace directo:**
```
https://console.firebase.google.com/project/pensionados-d82b2/firestore/indexes?create_composite=Cldwcm9qZWN0cy9wZW5zaW9uYWRvcy1kODJiMi9kYXRhYmFzZXMvKGRlZmF1bHQpL2NvbGxlY3Rpb25Hcm91cHMvcG9zdHVsYWNpb25lcy9pbmRleGVzL18QARoJCgVlc3RhZG8QARoUChBmZWNoYVBvc3R1bGFjaW9uEAIaDAoIX19uYW1lX18QAg
```

## Instrucciones:

1. Copia cada enlace en tu navegador
2. Haz clic en "Crear índice"
3. Espera 2-3 minutos a que se construya
4. Verifica que el estado cambie a "Habilitado"

## Verificar índices creados:

Ve a: https://console.firebase.google.com/project/pensionados-d82b2/firestore/indexes

Los índices deben aparecer con estado "Habilitado" (verde).

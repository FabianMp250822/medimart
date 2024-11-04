// utils.js
export function formatServiceNameForFirebase(name) {
    return name
        .toLowerCase()                // Convertir a minúsculas
        .replace(/ /g, '-')           // Reemplazar espacios con guiones
        .normalize('NFD')             // Eliminar acentos
        .replace(/[\u0300-\u036f]/g, '');
}

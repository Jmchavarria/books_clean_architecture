export function CustomSlugify(text: string): string {
  if (!text) return '';

  return text
    .toLowerCase() // 1. Convertir todo a minúsculas
    .trim() // 2. Limpiar espacios al inicio y al final
    .normalize('NFD') // 3. Descomponer caracteres especiales (ej. 'ó' -> 'o' + '´')
    .replace(/[\u0300-\u036f]/g, '') // 4. Eliminar las tildes y marcas diacríticas
    .replace(/ñ/g, 'n') // 5. Reemplazar la 'ñ' explícitamente (opcional pero recomendado)
    .replace(/[^a-z0-9 -]/g, '') // 6. Remover cualquier carácter que NO sea letra, número, espacio o guion
    .replace(/\s+/g, '-') // 7. Reemplazar uno o más espacios consecutivos por un único guion
    .replace(/-+/g, '-'); // 8. Reemplazar múltiples guiones seguidos por uno solo
}

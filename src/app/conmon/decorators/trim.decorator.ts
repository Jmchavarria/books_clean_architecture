import type { TransformFnParams } from 'class-transformer';
import { Transform } from 'class-transformer';

// Creamos una interfaz intermedia para tipar los parámetros de class-transformer con el genérico
interface TypedTransformFnParams<T> extends TransformFnParams {
  value: T;
}

export function Trim() {
  return Transform(<T>({ value }: TypedTransformFnParams<T>): string | T => {
    if (typeof value === 'string') {
      return value.trim();
    }
    return value;
  });
}

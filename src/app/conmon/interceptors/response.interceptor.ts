import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { Pagination } from '../pagination/pagination';

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T[] | T;
  page?: number;
  limit?: number;
  total?: number;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<unknown, ApiResponse<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<ApiResponse<T>> {
    return next.handle().pipe(
      // 1. Tipamos la respuesta como la interfaz de paginación o el tipo genérico directamente
      map((response: Pagination<T> | T): ApiResponse<T> => {
        const message = 'Request successful';

        // 2. Un simple condicional para verificar si la respuesta contiene paginación
        if (response && typeof response === 'object' && 'page' in response) {
          return {
            success: true,
            message,
            data: response.data, // Extrae tus elementos directamente a 'data'
            page: response.page,
            limit: response.limit,
            total: response.total,
          };
        }

        // 3. Si no es un objeto paginado, se retorna la respuesta única en 'data'
        return {
          success: true,
          message,
          data: response,
        };
      }),
    );
  }
}

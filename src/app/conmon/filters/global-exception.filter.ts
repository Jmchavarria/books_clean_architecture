import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { CustomError } from '../errors/custom.error';
import { ErrorCode } from '../errors/error-code.enum';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    if (exception instanceof CustomError) {
      console.error({
        code: exception.code,
        message: exception.message,
        path: request.url,
      });

      response.status(exception.statusCode).json({
        success: false,
        error: {
          code: exception.code,
          message: exception.code,
        },
        path: request.url,
        timestamp: new Date().toISOString(),
      });
      return;
    }

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      const normalizedResponse =
        typeof exceptionResponse === 'string'
          ? { message: exceptionResponse }
          : (exceptionResponse as Record<string, unknown>);

      response.status(status).json({
        success: false,
        error: {
          code: normalizedResponse.code ?? ErrorCode.internal_server_error,
          message:
            typeof normalizedResponse.message === 'string'
              ? normalizedResponse.message
              : exception.message,
          details: normalizedResponse.errors ?? normalizedResponse.details ?? null,
        },
        path: request.url,
        timestamp: new Date().toISOString(),
      });
      return;
    }

    response.status(500).json({
      success: false,
      error: {
        code: ErrorCode.internal_server_error,
        message: exception.message || 'Internal server error',
        details: null,
      },
      path: request.url,
      timestamp: new Date().toISOString(),
    });
  }
}

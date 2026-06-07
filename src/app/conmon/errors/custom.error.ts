import { HttpStatus } from '@nestjs/common';
import { ErrorCode } from './error-code.enum';

export class CustomError extends Error {
  public readonly statusCode: HttpStatus;
  public readonly instanceName?: string;

  constructor(
    public readonly code: ErrorCode,
    message: string,
    statusCode?: HttpStatus,
    instanceName?: string,
  ) {
    super(message);
    this.name = 'CustomError';
    this.statusCode = statusCode ?? HttpStatus.INTERNAL_SERVER_ERROR;
    this.instanceName = instanceName;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

// asi se deberia enviar el customError
// catch (error) {
//     throw new CustomError(
//         ErrorCode.create_record_failed,
//         'Failed to create category',
//         HttpStatus.INTERNAL_SERVER_ERROR,
//         CategoryRepositoryImpl.name,
//     );
// }

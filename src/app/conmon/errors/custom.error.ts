import { HttpStatus } from "@nestjs/common";
import { ErrorCode } from "./error-code.enum";

const ERROR_STATUS_MAP: Record<ErrorCode, HttpStatus> = {
  [ErrorCode.BOOK_NOT_FOUND]: HttpStatus.NOT_FOUND,
  [ErrorCode.CATEGORY_NOT_FOUND]: HttpStatus.NOT_FOUND,
  [ErrorCode.CATEGORY_ID_UNDEFINED]: HttpStatus.BAD_REQUEST,
  [ErrorCode.VALIDATION_ERROR]: HttpStatus.BAD_REQUEST,
  [ErrorCode.INTERNAL_SERVER_ERROR]: HttpStatus.INTERNAL_SERVER_ERROR,
};

export class CustomError extends Error {
  public readonly statusCode: HttpStatus;
  public readonly instanceName?: string;

  constructor(
    public readonly code: ErrorCode,
    message: string,
    statusCode?: HttpStatus,
    public readonly details?: unknown,
    instanceName?: string,
  ) {
    super(message);
    this.name = "CustomError";
    this.statusCode = statusCode ?? ERROR_STATUS_MAP[code];
    this.instanceName = instanceName;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

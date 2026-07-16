import { PipeTransform, ArgumentMetadata } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import Injectable from '../decorators/injectable';
import { CustomError } from '../errors/custom.error';
import { ErrorCode } from '../errors/error-code.enum';

@Injectable()
export class CustomValidationPipe<T = unknown> implements PipeTransform<
  unknown,
  Promise<T | unknown>
> {
  async transform(value: unknown, { metatype }: ArgumentMetadata): Promise<T | unknown> {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    const object = plainToInstance(metatype, value) as unknown as object;
    const errors = await validate(object);

    if (errors.length > 0) {
      throw new CustomError(ErrorCode.valdiation_error, 'Validation failed');
    }

    return object;
  }

  private toValidate(metatype: new (...args: unknown[]) => unknown): boolean {
    const types: Array<new (...args: unknown[]) => unknown> = [
      String,
      Boolean,
      Number,
      Array,
      Object,
    ];
    return !types.includes(metatype);
  }
}

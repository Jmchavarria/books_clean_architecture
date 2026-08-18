import { IsString } from 'class-validator';

export class UploadBookCoverHttpDto {
  @IsString()
  fileName: string;
}

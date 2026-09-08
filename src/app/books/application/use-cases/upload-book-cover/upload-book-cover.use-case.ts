import Injectable from 'src/app/common/decorators/injectable';
import type { UploadBookCoverDto } from './upload-book-cover.dto';
import { FileUploadResponse } from '@imagekit/nodejs/resources';
import { UploadFileService } from 'src/app/common/infrastructure/services/upload-file.service';

@Injectable()
export class UploadBookCoverUseCase {
  constructor(private readonly uploadFileService: UploadFileService) {}

  async execute(input: UploadBookCoverDto): Promise<FileUploadResponse> {
    return this.uploadFileService.upload({
      file: input.file,
    });
  }
}

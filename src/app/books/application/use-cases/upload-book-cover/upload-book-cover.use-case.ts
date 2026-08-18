import Injectable from 'src/app/conmon/decorators/injectable';
import type { UploadBookCoverDto } from './upload-book-cover.dto';
import { UploadFileService } from 'src/app/conmon/infrastructure/services/upload-file.service';
import { FileUploadResponse } from 'src/app/conmon/interfaces/upload-files-response.interface';

@Injectable()
export class UploadBookCoverUseCase {
  constructor(private readonly uploadFileService: UploadFileService) {}

  async execute(input: UploadBookCoverDto): Promise<FileUploadResponse> {
    return this.uploadFileService.upload({
      file: input.file,
    });
  }
}

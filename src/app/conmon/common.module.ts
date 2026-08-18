import { Module } from '@nestjs/common';
import { UploadFileService } from 'src/app/conmon/infrastructure/services/upload-file.service';

@Module({
  providers: [UploadFileService],
  exports: [UploadFileService],
})
export class CommonModule {}

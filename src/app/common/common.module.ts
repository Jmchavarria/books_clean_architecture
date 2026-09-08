import { Module } from '@nestjs/common';
import { UploadFileService } from './infrastructure/services/upload-file.service';

@Module({
  providers: [UploadFileService],
  exports: [UploadFileService],
})
export class CommonModule {}

import { ImageKit } from '@imagekit/nodejs';
import type { UploadFilesParams } from '../../interfaces/upload-files-params.interface';
import type { FileUploadResponse } from '../../interfaces/upload-files-response.interface';

export class UploadFileService {
  async upload(input: UploadFilesParams): Promise<FileUploadResponse> {
    const client = new ImageKit({
      privateKey: process.env.IK_PRIVATE_KEY,
    });

    return client.files.upload({
      file: input.file.buffer.toString('base64'),
      fileName: input.file.originalname || 'archivo_subido',
    });
  }
}

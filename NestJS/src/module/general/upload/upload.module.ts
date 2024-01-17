import { Module } from '@nestjs/common';

import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { UploadQuery } from './query';
@Module({
  controllers: [UploadController],
  providers: [UploadService, UploadQuery],
  exports: [UploadService],
})
export class UploadModule {}

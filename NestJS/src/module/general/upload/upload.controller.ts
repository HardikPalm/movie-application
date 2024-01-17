'use strict';

import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  HttpException,
  HttpStatus,
  Req,
} from '@nestjs/common';
import { ApiTags, ApiConsumes } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

import {
  filesRoot,
  editFileName,
  imageFileFilter,
  FileValidationErrors,
} from '../../../providers/file-upload.service';
import {
  /*ApiFile, */ ApiFile,
} from '../../../common/swagger.schema';

import { UploadService } from './upload.service';
import { ConfigService } from '../../../shared/services/config.service';
// import { multerOptions } from "../../config/multer.config";

// import { FileUploadDto } from "./dto/FileUploadDto";

@Controller()
@ApiTags('Upload')
export class UploadController {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(
    private readonly uploadService: UploadService,
    private readonly configService: ConfigService,
  ) { }

  @Post('v1/upload')
  @ApiConsumes('multipart/form-data')
  @ApiFile()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: filesRoot() + '/local',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadMultipleFiles(@UploadedFile() file: Express.Multer.File, @Req() req: any) {


    if (
      req?.fileValidationError === FileValidationErrors.UNSUPPORTED_FILE_TYPE
    ) {
      // if so, throw the BadRequestException
      throw new HttpException(
        {
          message: 'Only images are allowed',
          statusCode: HttpStatus.BAD_REQUEST,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const response = [];

    const temp_path = await this.uploadService.getTempPath();
    const temp_files = [];

    const filename = file.filename;
    const size = file.size;
    const originalname = file.originalname;
    const mimetype = file.mimetype;
    const destination = file.destination;
    const path = file.path;

    const bucket_name = this.configService.get('AWS_S3_BUCKET_NAME');

    const fileReponse = {
      originalName: originalname,
      fileName: filename,
      mimeType: mimetype,
      destination: destination,
      path: path,
      size: size,
    };
    response.push(fileReponse);

    const tempUploadInsert = await this.uploadService.addTempUpload(
      fileReponse,
    );
    temp_files.push({
      tokenId: tempUploadInsert.insertId,
      File: filename,
      Size: size,
      OriginalName: originalname,
      MimeType: mimetype,
      Action: 'Add',
    });
    //await this.uploadService.uploadTempFileTopS3(file);

    const Files = temp_files;

    return { status: true, Files };
  }

  // @Get(':imgpath')
  // seeUploadedFile(@Param('imgpath') image: any, @Res() res: any) {
  //   return res.sendFile(image, { root: './files' });
  // }
}

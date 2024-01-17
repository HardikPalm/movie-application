import { APP_FILTER } from '@nestjs/core';
import { Module } from '@nestjs/common';

import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { AuthModule } from './module/auth/auth.module';
import { UserModule } from './module/user/user.module';
import { UploadModule } from './module/general/upload/upload.module';
import { MovieModule } from './module/movie/movie.module';



@Module({
  imports: [
    AuthModule,
    UserModule,
    UploadModule,
    MovieModule
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
  // exports: [IdeaModule, UserModule, CommentModule],
})
export class ApiModule { }


import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { UsersQueries } from '../user/user.query';
import { NodeEmailerService } from '../../shared/services/node-emailer.service';
import { UploadModule } from '../general/upload/upload.module';

@Module({
  imports: [UserModule, forwardRef(() => UploadModule)],
  controllers: [AuthController],
  providers: [AuthService, UserService, UsersQueries, NodeEmailerService],
})
export class AuthModule { }


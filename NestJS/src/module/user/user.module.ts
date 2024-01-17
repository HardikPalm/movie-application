
import { forwardRef, Module, MiddlewareConsumer, NestModule, RequestMethod } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UsersQueries } from './user.query';
import { AuthService } from '../auth/auth.service';
import { NodeEmailerService } from '../../shared/services/node-emailer.service';
import { UploadModule } from '../general/upload/upload.module';
import { AuthMiddleware } from '../../common/middleware/auth.middleware';

@Module({
  imports: [forwardRef(() => UploadModule)],
  controllers: [UserController],
  providers: [UserService, UsersQueries, AuthService, NodeEmailerService],
  // exports:[UserModule]
})
// export class UserModule implements NestModule {
//   public configure(consumer: MiddlewareConsumer) {
//     console.log("Coming here");

//     consumer.apply(AuthMiddleware).forRoutes();
//   }
// }
export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes('User')
  }

}

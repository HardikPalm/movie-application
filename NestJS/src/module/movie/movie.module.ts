import { MiddlewareConsumer, Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { UserService } from '../user/user.service';
import { MovieQueries } from './movie.query';
import { UsersQueries } from '../user/user.query';
import { AuthService } from '../auth/auth.service';
import { NodeEmailerService } from '../../shared/services/node-emailer.service';
import { UploadService } from '../general/upload/upload.service';
import { AuthMiddleware } from '../../common/middleware/auth.middleware';

@Module({
  // imports: [UserModule],
  controllers: [MovieController],
  providers: [MovieService,UserService,UsersQueries, MovieQueries,AuthService, NodeEmailerService, UploadService]
})
export class MovieModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes('movie')
  }
}

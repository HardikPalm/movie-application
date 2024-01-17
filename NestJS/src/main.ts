import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ClassSerializerInterceptor, HttpException, Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from './shared/services/config.service';
import { SharedModule } from './shared/shared.module';
import { BadRequestExceptionFilter } from './common/filters/bad-request.filter';
import { SQLService } from './shared/services/sql.service';
import { QueryFailedFilter } from './common/filters/query-failed.filter';
import { randomString } from './common/helper/env.helper';
import { setupSwagger } from './swagger';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('/api');
  app.useGlobalPipes(
    new ValidationPipe({
      // disableErrorMessages: true,
      whitelist: true,
      transform: true,
      dismissDefaultMessages: false,
      validationError: {
        target: false,
      },
      exceptionFactory: (errors) => new BadRequestException(errors),
    }),
  );

  const configService = app.select(SharedModule).get(ConfigService);
  const sqlService = app.select(SharedModule).get(SQLService);

  const reflector = app.get(Reflector);

  app.useGlobalFilters(new HttpExceptionFilter(sqlService), new QueryFailedFilter(reflector, sqlService));

  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));

  const config: ConfigService = app.get(ConfigService);
  const port: number = config.getNumber('PORT');

  let swaggerPath: string = 'api/doc';
  if (['production'].includes(configService.nodeEnv)) {
    swaggerPath = 'api/doc-' + randomString(10, null);
    setupSwagger(app, swaggerPath);
  } else {
    setupSwagger(app, swaggerPath);
  }

  await app.listen(port, () => {
    Logger.debug(config.get('BASE_URL') + ':' + port + '/' + swaggerPath, 'WEB');
  });
}
bootstrap();

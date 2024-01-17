import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication, path: string): void {
    const options = new DocumentBuilder()
        .setTitle('Palm BoilerPlate')
        .setDescription('Palm BoilerPlate api description')
        .setVersion('1.0')
        .addBearerAuth()
        .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup(path, app, document);
}

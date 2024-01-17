import { Module } from '@nestjs/common';
import { SharedModule } from './shared/shared.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmAsyncOptions } from './shared/typeorm/typeorm.config';
import { ConfigService } from './shared/services/config.service';
import { ApiModule } from './api.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
  imports: [SharedModule, ApiModule, TypeOrmModule.forRootAsync(TypeOrmAsyncOptions),
    MailerModule.forRootAsync({
      imports: [SharedModule],
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.get('NODE_EMAILER_HOST'),
          port: configService.get('NODE_EMAILER_PORT'),
          secure: 'STARTTLS', // upgrade later with STARTTLS
          auth: {
            user: configService.get('NODE_EMAILER_USER'),
            pass: configService.get('NODE_EMAILER_PASSWORD'),
          },
        },
        defaults: {
          from: configService.get('NODE_EMAILER_FROM_EMAIL'),
        },
        template: {
          dir: process.cwd() + '/template/emails/',
          adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }

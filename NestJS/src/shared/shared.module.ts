import { Global, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { SQLService } from './services/sql.service';
import { ConfigService } from './services/config.service';

const providers = [SQLService, ConfigService];

@Global()
@Module({
    providers,
    imports: [
        HttpModule,
        // JwtModule.registerAsync({
        //   useFactory: (configService: ConfigService) => ({
        //     secretOrPrivateKey: configService.get("JWT_SECRET_KEY"),
        //     // if you want to use token with expiration date
        //     signOptions: {
        //       expiresIn: configService.getNumber("JWT_EXPIRATION_TIME"),
        //     },
        //   }),
        //   inject: [ConfigService],
        // }),
    ],
    exports: [...providers, HttpModule], // , JwtModule
})
export class SharedModule { }

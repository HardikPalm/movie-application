import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { SharedModule } from "../shared.module";
import { ConfigService } from "../services/config.service";

export default class TypeOrmConfig {
    static getOrmConfig(configService: ConfigService): TypeOrmModuleOptions {
        return {
            type: 'mysql',
            host: configService.get('DATABASE_HOST') || 'localhost',
            port: configService.getNumber('DATABASE_PORT') || 3306,
            username: configService.get('DATABASE_USER'),
            password: configService.get('DATABASE_PASSWORD'),
            database: configService.get('DATABASE_NAME'),
            synchronize: false,
            logging: false,
            multipleStatements: true,
            bigNumberStrings: false,
        };
    }
}

export const TypeOrmAsyncOptions: TypeOrmModuleAsyncOptions = {
    imports: [SharedModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService): TypeOrmModuleOptions => {
        return TypeOrmConfig.getOrmConfig(configService)
    }
}
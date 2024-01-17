import * as dotenv from 'dotenv'
import { IUploadFileConfig } from '../../common/interface/IUploadFileConfig';
import { IAwsConfig } from '../../common/interface/IAwsConfig';

export class ConfigService {
    constructor() {
        const nodeEnv = this.nodeEnv
        dotenv.config({
            path: nodeEnv === 'production' ? '.env.production' : nodeEnv === 'staging' ? '.env.staging' : '.env.development'
        })

    }

    public get(key: string): string {
        return process.env[key] || 'undefined';
    }

    public getNumber(key: string): number {
        return Number(this.get(key));
    }

    get nodeEnv(): string {
        return this.get('NODE_ENV') || 'development';
    }

    get awsS3Config(): IAwsConfig {
        return {
          AWS_S3_ACCESS_KEY_ID: this.get('AWS_S3_ACCESS_KEY_ID'),
          AWS_S3_SECRET_ACCESS_KEY: this.get('AWS_S3_SECRET_ACCESS_KEY'),
          AWS_S3_BUCKET_NAME: this.get('AWS_S3_BUCKET_NAME'),
          AWS_S3_DEFAULT_REGION: this.get('AWS_S3_DEFAULT_REGION'),
          AWS_S3_TEMP_DIRECTORY: this.get('AWS_S3_TEMP_DIRECTORY'),
          AWS_S3_ENDPOINT: this.get('AWS_S3_ENDPOINT'),
          AWS_S3_SERVER_HOST: this.get('AWS_S3_SERVER_HOST'),
          AWS_S3_COMPANION_SECRET: this.get('AWS_S3_COMPANION_SECRET'),
          TUS_STORAGE_DRIVER: this.get('TUS_STORAGE_DRIVER'),
        };
      }
      get uploadFileConfig(): IUploadFileConfig {
        return {
          TEMP_FILE_UPLOAD_URL: this.get('TEMP_FILE_UPLOAD_URL'),
          FILE_UPLOAD_DESTINATION: this.get('FILE_UPLOAD_DESTINATION'),
          MAX_UPLOAD_FILE_SIZE: this.getNumber('MAX_UPLOAD_FILE_SIZE'),
          PROFILE_PIC_FILE_PATH: this.get('PROFILE_PIC_FILE_PATH'),
          MULTIPLE_FILE_PATH: this.get('MULTIPLE_FILE_PATH'),
        };
      }
}
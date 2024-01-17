'use strict';

export interface IAwsConfig {
  AWS_S3_ACCESS_KEY_ID: string;
  AWS_S3_SECRET_ACCESS_KEY: string;
  AWS_S3_BUCKET_NAME: string;
  AWS_S3_DEFAULT_REGION: string;
  AWS_S3_TEMP_DIRECTORY: string;
  AWS_S3_ENDPOINT: string;

  AWS_S3_SERVER_HOST: string;
  AWS_S3_COMPANION_SECRET: string;
  TUS_STORAGE_DRIVER: string;
}

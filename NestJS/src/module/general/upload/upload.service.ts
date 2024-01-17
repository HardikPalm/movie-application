import { Injectable, Logger } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import * as fs from 'fs';
import { SQLService } from '../../../shared/services/sql.service';
import { ConfigService } from '../../../shared/services/config.service';

import { UploadQuery } from './query';
import { IAwsConfig } from '../../../common/interface/IAwsConfig';
import * as _ from 'lodash';
import { TableName } from '../../../common/constants/app.constants';

@Injectable()
export class UploadService {
  private readonly uploadQuery: UploadQuery;

  constructor(
    private readonly configService: ConfigService,
    private readonly sqlService: SQLService,
  ) {
    this.uploadQuery = new UploadQuery();
  }

  async getTempPath(): Promise<any> {
    const temp_path = this.configService.uploadFileConfig.TEMP_FILE_UPLOAD_URL;
    return temp_path;
  }


  async addTempUpload(item: any) {
    const insertUserArr = ['originalName', 'fileName', 'mimeType', 'destination', 'path', 'size']
    const userKeys = _.pick(item, insertUserArr)
    const keysUser = Object.keys(userKeys)
    let valueUser = Object.values(userKeys)

    valueUser = valueUser.map(i => "'" + i + "'");

    return await this.sqlService.run(this.uploadQuery.addTempFile(TableName.Table_Temp_Upload, keysUser.join(','), valueUser.join(',')))
    // return await this.sqlService.run(this.uploadQuery.addTempFile(), item);
  }

  async getTempUpload(item: any) {
    return await this.sqlService.run(this.uploadQuery.getTempFile(item.tokenId));
  }

  /** Delete from tempupload */
  async deleteTempUpload(data: any) {
    return await this.sqlService.run(
      this.uploadQuery.deleteFromTempUpload(data),
    );
  }

  async uploadTempFileTopS3(file: any): Promise<any> {
    if (!file || !file.FilePath || !file.tokenId) {
      return 'No file provided';
    }
    const tempfileResult = await this.getTempUpload(file);


    const aws = this.configService.awsS3Config;



    const d = await this.uploadS3({ ...tempfileResult, ...file }, aws);
    // });

    return d;
  }

  async uploadS3(file: any, aws: IAwsConfig) {
    // console.log('File:', file);
    // console.log("AWS:",aws);




    let bucketS3 = aws.AWS_S3_BUCKET_NAME;
    let filename = String(file.fileName);

    switch (file.Type) {
      case 'ProfileImage':
        {
          bucketS3 = bucketS3 + '/profile';
          filename = filename;
        }
        break;
      case 'MenuImage':
        {
          bucketS3 = bucketS3 + '/menu/';
          filename = file.idUser + '_' + filename;
        }
        break;
      case 'RestaurantImage':
        {
          bucketS3 = bucketS3 + '/restaurant/';
          filename = file.idUser + '_' + filename;
        }
        break;
      default: {
        bucketS3 = bucketS3 + '/other';
        filename = 'other' + '_' + filename;
      }
    }

    const filecontent = fs.readFileSync(file['path']);

    const s3 = new S3({
      accessKeyId: aws.AWS_S3_ACCESS_KEY_ID,
      secretAccessKey: aws.AWS_S3_SECRET_ACCESS_KEY,
    });
    // console.log('s3:', s3);

    const params = {
      Bucket: bucketS3,
      Key: String(filename),
      Body: filecontent,
      ACL: 'public-read',
    };
    ////
    return new Promise((resolve, reject) => {
      s3.putObject(params, async (err: { message: any }, data: any) => {
        if (err) {
          Logger.error(err);

          reject(err.message);
        }
        const path = await this.getTempPath();
        resolve(path + bucketS3 + '/' + filename);
      });
    });
  }
}

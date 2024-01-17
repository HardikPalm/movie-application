import * as _ from 'lodash';
import { TableName } from '../../../common/constants/app.constants';
import { DBQuery } from '../../../common/interface/dbquery.interface';
export class UploadQuery {

  addTempFile(tableName: string, key: string, value: string) {

    const query = `INSERT INTO ${tableName} (${key}) values (${value})`
    return {
      name: 'addTempFile',
      type: 'INSERT',
      query: query

    };
  }

  getTempFile(tokenId: number): DBQuery {
    const query = `SELECT * FROM ${TableName.Table_Temp_Upload} WHERE idTempUpload =${tokenId}`
    return {
      name: 'getTempFile',
      type: 'SELECT_ONE',
      query: query

    };
  }


  deleteFromTempUpload(tokenId: number): DBQuery {

    const query = `DELETE FROM ${TableName.Table_Temp_Upload} WHERE idTempUpload =${tokenId}`
    console.log("DeelteQuery:", query);

    return {
      name: 'deleteFromTempUpload',
      type: 'DELETE',
      query: query

    };
  }
}

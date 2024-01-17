import * as _ from 'lodash';
import { TableName } from 'src/common/constants/app.constants';
import { DBQuery } from '../../../common/interface/dbquery.interface';

export class PushQuery {


  //  // TEST Send Push
  getAllTokenByUser(idUser: number): DBQuery {
    const query = `SELECT d.os,d.brand,d.modelNo,d.deviceId from ${TableName.Table_Devices_Info} d left join ${TableName.Table_User_Session} s on s.deviceId = d.deviceId where s.userId =${idUser}`
    return {
      name: 'getAllTokenByUser',
      type: 'SELECT',
      query: query

    };
  }

}

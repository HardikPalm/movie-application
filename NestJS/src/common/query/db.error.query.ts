import * as _ from 'lodash';
import { DBQuery } from '../interface/dbquery.interface';

export class DBErrorQuery {
  addQueryError(module: any, method: any, url: any, reqdata: string, resdata: string): DBQuery {
    const query = `insert into user_error (request_path,request_object,error,error_message,method) 
        values ("${url}",'${reqdata}','${resdata}',"${module}","${method}")`
    return {
      name: `addQueryError`,
      type: `INSERT`,
      query: query

    }
  }
}

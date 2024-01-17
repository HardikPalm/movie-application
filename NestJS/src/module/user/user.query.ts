import { Injectable, Query } from '@nestjs/common';
import { DBQuery } from 'src/common/interface/dbquery.interface';
import { TableName, selectWithWhereClause } from '../../common/constants/app.constants';



@Injectable()
export class UsersQueries {


  findAll(): string {
    return `SELECT * FROM  ${TableName.Table_Users}`
  }

  findOne(id: number): DBQuery {

    const query = `SELECT * FROM ${TableName.Table_Users} where userId = ${id}`
    return {
      name: "findOne",
      type: "SELECT_ONE",
      query: query
    }

  }

  findOneByEmail(email: string): DBQuery {
    const query = `SELECT * FROM ${TableName.Table_Users} where email = "${email}" AND status=1`
    return {
      name: 'findOneByEmail',
      type: 'SELECT_ONE',
      query: query

    };
  }

  findUserByIDQuery(idDevice: number, idUser: number, serialNumber: string): DBQuery {
    const query = `SELECT  u.*,s.accessToken,s.deviceId,s.serialNumber FROM ${TableName.Table_Users} u left join ${TableName.Table_User_Session} s on u.userId = s.userId where s.userId = ${idUser} and s.deviceId = ${idDevice} and s.serialNumber = "${serialNumber}"`
    console.log("Query:", query);

    return {
      name: 'findUserByIDQuery',
      type: 'SELECT_ONE',
      query: query

    };
  }


  findUserLoggedIn(): DBQuery {

    const query = `SELECT u.*,p.value FROM ${TableName.Table_Users} u  LEFT JOIN  ${TableName.Table_Passport} p ON p.userId = u.userId AND p.authType =? AND p.identifier =? WHERE u.email=? AND u.status=1`
    return {
      name: 'findUserLoggedIn',
      type: 'SELECT_ONE',
      query: query

    };

  };


  checkUserEmail(params: string): DBQuery {



    const query = `SELECT * FROM ${TableName.Table_Users} u
         WHERE u.email=?`
    return {
      name: 'checkUserEmail',
      type: 'SELECT_ONE',
      query: query

    };
  };

  checkUserDevice(params) {
    let result = ''
    params.forEach((element, index) => {
      result = result + element + '=? ' + (Number(index) != Number(params.length - 1) ? 'AND ' : '')
    });
    const query = `SELECT deviceId FROM  ${TableName.Table_Devices_Info}  
        WHERE ${result}`
    return {
      name: 'checkUserDevice',
      type: 'SELECT_ONE',
      query: query

    };
  };

  insertData(tableName: string, key: string, value: string) {

    const query = `INSERT INTO ${tableName} (${key}) values (${value})`
    return {
      name: 'insertData',
      type: 'INSERT',
      query: query

    };
  }


  insertUpdateSessionInfo(key: string, value: any, versionNumber: any, refreshToken: string, accessToken: string, lat: number, long: number) {
    let val = value.map(i => "'" + i + "'");
    const query = `INSERT INTO  ${TableName.Table_User_Session} (${key}) VALUES (${val.join(',')},ST_PointFromText('POINT(${long} ${lat})')) ON DUPLICATE KEY UPDATE versionNumber=${versionNumber}, refreshToken="${refreshToken}" , accessToken="${accessToken}", latitude=${lat}, longitude=${long}, geoPoint=ST_PointFromText('POINT(${long} ${lat})')`
    return {
      name: 'insertUpdateSessionInfo',
      type: 'INSERT',
      query: query

    };
  }

  insertUpdatePassword(key: string) {
    const query = `INSERT INTO  ${TableName.Table_Passport} (${key}) values (?,?,?,?,?) ON DUPLICATE KEY UPDATE value =?`
    return {
      name: 'insertUpdatePassword',
      type: 'INSERT',
      query: query

    };
  };

  insertUpdateAddVerificationCode(key: string): DBQuery {

    const query = `INSERT INTO ${TableName.Table_Otp_Verification} (${key}) VALUES (?,?,?,?) ON DUPLICATE KEY UPDATE otp=?, expiryTime=?, retryCount=?`
    return {
      name: 'insertUpdateAddVerificationCode',
      type: 'INSERT',
      query: query

    };
  };

  updateOtpCountQuery(count: number, email: string): DBQuery {

    const query = `UPDATE ${TableName.Table_Otp_Verification} SET retryCount=${count} where email="${email}";`
    return {
      name: 'updateOtpCountQuery',
      type: 'UPDATE',
      query: query

    };

  }

  fetchOtpQuery(email: string): DBQuery {

    const query = `SELECT * FROM ${TableName.Table_Otp_Verification} WHERE email="${email}"`
    return {
      name: 'fetchOtpQuery',
      type: 'SELECT_ONE',
      query: query

    };
  }

  deleteOtp(email: string): DBQuery {

    const query = `DELETE FROM ${TableName.Table_Otp_Verification} where email="${email}"`
    return {
      name: 'deleteOtp',
      type: 'DELETE',
      query: query

    };
  }


  getRefreshToken(refreshToken: string): DBQuery {
    const query = `select * from ${TableName.Table_User_Session} where refreshToken = '${refreshToken}' `;
    return {
      name: 'getRefreshToken',
      type: 'SELECT_ONE',
      query: query,
    };
  }

  updateTokens(
    refreshToken: string,
    newRefreshToken: string,
    accessToken: string,
  ): DBQuery {
    const query = ` update ${TableName.Table_User_Session} set accessToken = '${accessToken}',refreshToken = '${newRefreshToken}' where refreshToken = '${refreshToken}' `;
    return {
      name: 'updateTokens',
      type: 'UPDATE',
      query: query,
    };
  }


}


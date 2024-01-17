import { Injectable } from '@nestjs/common';
import { DBQuery } from 'src/common/interface/dbquery.interface';
import { TableName } from '../../common/constants/app.constants';

@Injectable()
export class MovieQueries {
  findAll(): DBQuery {
    var query = `SELECT * FROM ${TableName.Table_Movie}`;
    return {
      name: 'find',
      type: 'SELECT',
      query: query,
    };
  }

  findOne(id: number): DBQuery {
    const query = `SELECT * FROM ${TableName.Table_Movie} where id = ${id}`;
    return {
      name: 'findOne',
      type: 'SELECT_ONE',
      query: query,
    };
  }

  insertData(tableName: string, key: string, value: string) {
    const query = `INSERT INTO ${tableName} (${key}) values (${value})`;
    return {
      name: 'insertData',
      type: 'INSERT',
      query: query,
    };
  }

  update(
    id: number,
    publishingYear: number,
    title: string,
    poster: string,
  ): DBQuery {
    var query = '';
    if (poster) {
      query = `update ${TableName.Table_Movie} set title = '${title}',publishingYear = '${publishingYear}', poster='${poster}' where id = '${id}' `;
    } else {
      query = `update ${TableName.Table_Movie} set title = '${title}',publishingYear = '${publishingYear}' where id = '${id}' `;
    }
    return {
      name: 'updateTokens',
      type: 'UPDATE',
      query: query,
    };
  }
}

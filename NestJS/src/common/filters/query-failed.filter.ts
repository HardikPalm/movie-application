import { STATUS_CODES } from 'http';

import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Response } from 'express';
import { QueryFailedError } from 'typeorm';

import { constraintErrors } from './constraint-errors';
import { DBErrorQuery } from '../query/db.error.query';
import * as _ from 'lodash';
import { SQLService } from '../../shared/services/sql.service';

@Catch(QueryFailedError)
export class QueryFailedFilter implements ExceptionFilter {
  constructor(public reflector: Reflector, public sqlService: SQLService) { }

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const errorMessage = constraintErrors[exception.constraint];

    const status =
      exception.constraint && exception.constraint.startsWith('UQ') ? HttpStatus.CONFLICT : HttpStatus.INTERNAL_SERVER_ERROR;

    const errorResponse = {
      message: exception.sqlMessage,
      query: exception.query,
    };

    try {
      Logger.error(`${request.method} ${request.url}`, JSON.stringify(errorResponse), 'ExceptionFilter');

      var sqlService = this.sqlService;
      var query = new DBErrorQuery();
      var reqstr = JSON.stringify(_.clone(request.body));
      var resstr = JSON.stringify(_.clone(errorResponse));
      if (request?.method == 'GET' || request?.method == 'PUT' || request?.method == 'POST' || request?.method == 'DELETE') {
        sqlService.run(query.addQueryError('DBQuery', request.method, request.url, reqstr, resstr));
      }
    } catch (error) {
      Logger.error(`${request.method} ${request.url}`, JSON.stringify(errorResponse), 'ExceptionFilter');
    }
    response.status(status).json({
      statusCode: status,
      error: STATUS_CODES[status],
      message: errorMessage,
    });
  }
}

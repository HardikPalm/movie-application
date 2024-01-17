import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Inject } from '@nestjs/common';
import { Request, Response } from 'express';
import { SQLService } from '../../shared/services/sql.service';
import { DBQuery } from '../interface/dbquery.interface';
import * as _ from 'lodash';
import { ValidationError } from 'class-validator';

@Catch(HttpException)

export class HttpExceptionFilter implements ExceptionFilter {

    constructor(readonly sqlService: SQLService) {

    }

    async catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        // console.log(response, 'response');

        const request = ctx.getRequest();
        const r = <any>exception.getResponse();

        if (_.isArray(r.message) && r.message[0] instanceof ValidationError) {
            const validationErrors = <ValidationError[]>r.message;

            r.error = this._validationFilter(validationErrors);
        }
        const status = exception.getStatus();

        const queryString = `insert into user_error (requestPath,requestObject,error,errorMessage,method) 
        values ("${request.url}",'${JSON.stringify(request.body)}','${JSON.stringify(exception)}',"${exception.message}","${request.method}")`
        const query: DBQuery = {
            name: 'DBERROR',
            type: 'INSERT',
            query: queryString
        }
        await this.sqlService.run(query)
        response
            .status(status)
            .json({
                statusCode: status,
                message: r?.error ? r.error : exception.message,
                path: request.url,
                timestamp: new Date().toISOString(),
            });
    }
    private _validationFilter(validationErrors: ValidationError[]) {
        const errorMessages = {};

        for (const validationError of validationErrors) {

            if (validationError.children && validationError.children.length > 0) {
                const nestedErrorMessage = {};
                for (let i = 0; i < validationError.children[0].children.length; i++) {
                    nestedErrorMessage[validationError.children[0].children[i].property] = Object.values(
                        validationError.children[0].children[i].constraints,
                    );
                }
                errorMessages[validationError.property] = nestedErrorMessage;
            } else {
                errorMessages[validationError.property] = Object.values(validationError.constraints);
            }
        }
        return errorMessages;
    }
}
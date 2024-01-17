import { DataSource, QueryRunner } from 'typeorm';

import { Inject, Injectable, Logger } from '@nestjs/common';
import * as _ from 'lodash';
import { InjectDataSource } from '@nestjs/typeorm';

@Injectable()
export class SQLService {
    constructor(@InjectDataSource() private dataSource: DataSource) { }

    executeQueries(queryRunner: QueryRunner, runable: Function): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                resolve(runable(queryRunner));
            } catch (error) {
                reject(runable(queryRunner));
            }
        });
    }

    async runTranscation(param: any, fn: Function) {
        const queryRunner = this.dataSource.createQueryRunner();
        try {
            // establish real database connection using our new query runner
            await queryRunner.connect();
            await queryRunner.startTransaction();
            await this.executeQueries(queryRunner, fn)
                .then(async () => {

                    await queryRunner.commitTransaction();
                    await queryRunner.release();

                })
                .catch(async (e) => {



                    await queryRunner.rollbackTransaction();
                    await queryRunner.release();
                });
        } catch (error) {



            await queryRunner.rollbackTransaction();
            await queryRunner.release();
        }
    }

    async run(queryObj: any = null, data: any = null) {

        // if (typeof data == 'object' && data instanceof Object && !(data instanceof Array)) {
        //     for (const [key, value] of Object.entries(newObj)) {
        //         const found = fields.includes(key);
        //         if (found) {
        //             const escValue = value as any;
        //             if (escValue == null || escValue == undefined) {
        //                 Logger.error('Found Null' + escValue);
        //                 newObj[key] = null;
        //             } else {
        //                 newObj[key] = escValue.replace(/'/g, "\\'");
        //             }
        //         }
        //     }
        // }

        // const query = queryObj.syntax(typeof data == 'object' && data instanceof Object && !(data instanceof Array) ? newObj : data);

        const queryRunner = this.dataSource.createQueryRunner();

        // establish real database connection using our new query runner
        await queryRunner.connect();

        let result: any;



        // console.log('data', data);
        // console.log(queryObj.query);

        // now we can execute any queries on a query runner, for example:
        const rows = await queryRunner.query(queryObj.query, data);


        await queryRunner.release();


        if (queryObj.type == 'SELECT_ONE') {
            result = !_.isEmpty(rows) ? rows[0] : null; //do not change null to balnk object
        } else {
            result = rows;
        }

        return result;
    }
    async runTemplate(queryObj: any = null, data: any = null) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        let result: any;
        this.dataSource.query(queryObj.syntax, [data], queryRunner);
        return result;
    }
}

const fields = [
    'Name',
    'Password',
    'FirstName',
    'LastName',
    'UserCode',
    'Position',
    'Search',
    'CompanyCode',
    'Addr1',
    'Addr2',
    'GST',
    'AccountNumber',
    'BankName',
    'IFSCCode',
    'Variant',
    'Dimension',
    // "Size",
    'SubItemName',
    'ShortCode',
    'AdditionalUOM',
    'Description',
    'Comment',
    'Headline',
    'Url',
    'Navigate',
    'Subject',
    'Body',
    'Device',
];

// output string la\'
// mysql.escape(value); ///\'
//   if (key === "Name") {
//     const escValue = value as any;
//     newObj[key] = escValue.replace(/'/g, "\\'"); // mysql.escape(value); ///\'
//   }

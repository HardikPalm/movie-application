import { Get, HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken'
import { SQLService } from '../../shared/services/sql.service';
import { ConfigService } from '../../shared/services/config.service';
import { UsersQueries } from '../../module/user/user.query';
@Injectable()

export class AuthMiddleware implements NestMiddleware {
    constructor(readonly sqlservice: SQLService, readonly userquery: UsersQueries, readonly configService: ConfigService) { }

    async use(req: Request, res: Response, next: NextFunction,) {
        // console.log("Request:",req.headers.authorization.length);

        if (req?.headers?.authorization?.length > 0) {
            try {
                let accesstoken = req.headers.authorization.split(' ')[1]
                let decoded: any = await jwt.verify(accesstoken, this.configService.get('JWT_SECRET_KEY'))
                // console.log("Decoded value:",decoded);
                // console.log("Type of:",typeof decoded);
                let user = await this.sqlservice.run(this.userquery.findUserByIDQuery(Number(decoded.deviceId), Number(decoded.userId), decoded.serialNumber))
                // let user = await this.sqlservice.queryRunner({ query: userExistsQuery, queryType: 'SELECT_ONE' })
                if (user) {
                    if (user.accessToken != accesstoken) {
                        throw new HttpException('Invalid token', 401)
                    }
                    if (user.status != 1) {
                        throw new HttpException('User is not active', 401)
                    }
                    // res.locals.user = user
                    req['user'] = user
                    next();
                }
                else {
                    throw new HttpException('User not found', 405)
                }
            } catch (error) {

                throw new HttpException(error.message, HttpStatus.UNAUTHORIZED)
            }
        }
        else {
            throw new HttpException('Authentication required', HttpStatus.UNAUTHORIZED)
        }

    }
}

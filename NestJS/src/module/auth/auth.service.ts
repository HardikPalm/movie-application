
import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import * as jwt from 'jsonwebtoken'
import { SQLService } from '../../shared/services/sql.service';
import { ConfigService } from '../../shared/services/config.service';

@Injectable()
export class AuthService {
  constructor(public sqlservice: SQLService, private readonly configService: ConfigService) { }

  generateAccessToken(payload: Object) {
    return jwt.sign(payload, this.configService.get('JWT_SECRET_KEY'),
      { expiresIn: this.configService.getNumber('JWT_EXPIRATION_TIME') }
    )
  }


  findAll() {
    // this.sqlservice.run(CommonQuery)
    return `This action returns all Auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} Auth`;
  }

  update(id: number, updateauthDto: UpdateAuthDto) {
    return `This action updates a #${id} Auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} Auth`;
  }
}

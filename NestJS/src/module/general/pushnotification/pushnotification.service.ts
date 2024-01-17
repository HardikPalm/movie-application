import { Injectable, HttpStatus, Logger } from '@nestjs/common';
import { SQLService } from '../../../shared/services/sql.service';
import { FireBase } from './core/firebase';
import { PushQuery } from './query';
import * as _ from 'lodash';
import { ConfigService } from '../../../shared/services/config.service';

@Injectable()
export class PushService {
  private readonly MODULE: string;
  constructor(
    public configService: ConfigService,
    private readonly fireBase: FireBase,
    private readonly sqlService: SQLService,
    private readonly query: PushQuery,
  ) {
    this.MODULE = 'PUSHNOTIFICATION';
  }
  /**
   * Send Push
   */

  async sendPush(idUser: number): Promise<any> {
    const tokens = await this.sqlService.run(this.query.getAllTokenByUser(idUser));

    if (tokens && tokens.length > 0) {
      for (let i = 0; i < tokens.length; i++) {
        const _alert =
          '💟 Sticker ' +
          'Hello Message Body Platform modelNo : ' +
          tokens[i].modelNo +
          ' , OS : ' +
          tokens[i].os +
          ' and Brand : ' +
          tokens[i].brand;

        const data = {
          testid: tokens[i].deviceId.toString(),
          shortcode: 'post-shortcode',
          ftype: '6',
          fid: idUser.toString(),
          atype: '3',
          title: 'Your post is ready to share.',
          body: _alert,
        };
        const notification = {
          title: 'Your post is ready to share.',
          body: _alert,
        };
        const params = {
          contentAvailable: true,
          mutableContent: true,
          category: true,
          collapse_key: 'talk-post',
          ttl: false,
          notification,
          data,
        };

        const [
          webPushPayload,
          AndroidPayload,
          iOSPayload,
        ] = await this.fireBase.payload(params);

        const pushtoken = tokens[i].PushToken;

        if (pushtoken && pushtoken.length > 0) {
          this.fireBase.sendToDeviceToken(
            pushtoken,
            webPushPayload,
            AndroidPayload,
            iOSPayload,
          );
        }
      }
    }

    return 'Test Push Sent';
  }

}

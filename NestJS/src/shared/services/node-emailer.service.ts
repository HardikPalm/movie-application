import { HttpException, Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class NodeEmailerService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmail(
    from: string,
    to: string,
    subject: any,
    template: string,
    context: any,
    counter: number = undefined,
  ): Promise<any> {
    Logger.log('counter ' + counter);

    const msg = {
      from,
      to,
      subject,
      template,
      context,
      //   text: "Hey there, it’s our first message sent with Nodemailer ;) ",
      //   html: "<b>Hey there! </b><br> This is our first message sent with Nodemailer",
    };

    return new Promise((resolve, reject) => {
      try {
        this.mailerService
          .sendMail(msg)
          .then((r) => {
            console.info('r');
            resolve(r);
          })
          .catch((error) => {
            //Log friendly error
            console.error(error);

            // if (!counter) counter = 0;

            // counter++;
            // if (counter < 5) this.sendEmail(from, to, subject, template, context, counter);

            // //Extract error msg
            // const {message, code, response} = error
            //
            // //Extract response msg
            // const {headers, body} = response
            return reject(error);
          });
      } catch (e) {
        reject(e);
      }
    });
  }
}

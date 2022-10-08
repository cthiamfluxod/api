import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { UserEntity } from '../user/user.entity';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user) {
    const url = `http://localhost:3000/user/verify-email?verification=${user.verification}`;
    var html = '<p>Hey ' +user.name+',</p><p>Please click below to confirm your email</p><p><a href="'+url+'">Confirm</a></p><p>If you did not request this email you can safely ignore it.</p>';
    await this.mailerService.sendMail({
      to: user.email,
      from: 'cheikhthiam95g@gmail.com', // override default from
      subject: 'Bienvenue au jeu de thétiptop. Confirmer votre email',
      html: html, // `.hbs` extension is appended automatically
      // context: { // ✏️ filling curly brackets with content
      //   name: user.name,
      //   url,
      // },
    });
  }
}

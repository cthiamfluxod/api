import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { HabitatModule } from './habitat/habitat.module';
import { MailModule } from './mail/mail.module';
import { ReservationModule } from './reservation/reservation.module';
// import { SessionModule } from './session/session.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.sendgrid.net',
        auth: {
          user: 'apikey',
          pass: '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',
        },
      },
    }),
    UserModule,
    AuthModule,
    HabitatModule,
    ReservationModule,
    // SessionModule,
    MailModule,
    ConfigModule.forRoot({
      isGlobal: true, // no need to import into other modules
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

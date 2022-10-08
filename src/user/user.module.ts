import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthModule } from 'src/auth/auth.module';
import { ForgotPasswordSchema } from './schemas/forgot-password.schema';
import { HabitatSchema } from '../habitat/schemas/habitat.schema';
import { HabitatModule } from '../habitat/habitat.module';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([
      { name: 'ForgotPassword', schema: ForgotPasswordSchema },
    ]),
    MongooseModule.forFeature([{ name: 'Habitat', schema: HabitatSchema }]),
    HabitatModule,
    AuthModule,
    MailModule,
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}

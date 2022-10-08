import { Module } from '@nestjs/common';
import { ReservationController } from './reservation.controller';
import { ReservationService } from './reservation.service';

import { MongooseModule } from '@nestjs/mongoose';
import { ReservationSchema } from './schemas/reservation.schema';
// import { SessionModule } from 'src/session/session.module';
// import { SessionSchema } from 'src/session/schemas/session.schema';
// import { SessionService } from 'src/session/session.service'; 
   

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Reservation', schema: ReservationSchema }]),
    // MongooseModule.forFeature([{ name: 'Session', schema: SessionSchema}]),

    // SessionModule
  ],
  controllers: [ReservationController],
  providers: [ReservationService
    // ,
    // SessionService
  
  ],
})
export class ReservationModule {}

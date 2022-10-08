import { Module } from '@nestjs/common';
import { HabitatController } from './habitat.controller';
import { HabitatService } from './habitat.service';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { HabitatSchema } from './schemas/habitat.schema';
import { ReservationSchema } from 'src/reservation/schemas/reservation.schema';
// import { ReservationService } from 'src/reservation/reservation.service';
// import { ReservationModule } from 'src/reservation/reservation.module';
// import { SessionSchema } from 'src/session/schemas/session.schema';
// import { SessionModule } from 'src/session/session.module';
// import { SessionService } from 'src/session/session.service';

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'Habitat', schema: HabitatSchema}]),
    // MongooseModule.forFeature([{ name: 'Reservation', schema: ReservationSchema}]),ReservationModule,
    // MongooseModule.forFeature([{ name: 'Session', schema: SessionSchema}]),SessionModule,
    
    AuthModule
  ],
  controllers: [HabitatController],
  providers: [HabitatService,
    
    // ReservationService,SessionService
  
  ]
})
export class HabitatModule {}

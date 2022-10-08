import {
  BadRequestException,
  Injectable,
  ServiceUnavailableException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Reservation } from './interfaces/reservation.interface';
import { CreateReservationDto } from './dto/create-reservation.dto';
// import { SessionService } from 'src/session/session.service';

@Injectable()
export class ReservationService {
  constructor(
    @InjectModel('Reservation') private readonly ReservationModel: Model<Reservation>, 
    // private readonly sessionService: SessionService,
  ) {}

  /*****************
   * CREATE GROUP *
   *****************/

  async createReservation(createReservationDto: CreateReservationDto): Promise<Reservation> {

  
    let totalProbabilities = await this.sumProbabilities().then((t) =>
      t && t[0] ? t[0].percentage : 0,
    ); 
    console.table('Total probabilities: ' + totalProbabilities);

    // console.log(createReservationDto.ReservationNumber);

    if (totalProbabilities + createReservationDto.percentage <= 100) {
  
      createReservationDto.limitHabitat = 100*createReservationDto.percentage/100;
      await this.isDescriptionUniq(createReservationDto.description);
      const Reservation = new this.ReservationModel(createReservationDto);
      await Reservation.save();
      return Reservation;
    } else {
      throw new BadRequestException(
        'there is an inconsistency with the percentages',
      );
    }
  }

  /******************
   * GET ALL Reservation *
   ******************/

  async getAllReservations(): Promise<any> {
    return await this.ReservationModel.find({});
  }

  /******************
   * GET ONE Reservation *
   ******************/

  async getOneReservation(id: string): Promise<Reservation> {
    console.log('getOneReservation', id);
    return await this.ReservationModel.findById(id);
  }

  /***************************
   * GET Reservation WHITH PARAMS *
   ***************************/

  async getReservation(id: number): Promise<Reservation> {
    return await this.ReservationModel.findOne({ id: id });
  }

  /***************************
   * COUNT NUMBER OF RECORDS *
   ***************************/

  async geCount(): Promise<any> {
    return await this.ReservationModel.count();
  }

  /************************
   * UPDATE Reservation PARAMS *
   ************************/

  async updateReservationPut(
    id: string,
    createReservationDto: CreateReservationDto,
  ): Promise<Reservation> {
    // return await this.ReservationModel.updateOne({_id: id}, createReservationDto);
    return null;
  }

  /*****************
   * DELETE Reservation *
   *****************/

  async deleteReservation(id: string): Promise<Reservation> {
    return await this.ReservationModel.findByIdAndDelete(id);
  }

  /*******************
   * PRIVATE METHODS *
   *******************/

  /*****************************
   * GET SUM OF PROBABILITIES *
   *****************************/

  private async sumProbabilities(): Promise<Object> {
    return this.ReservationModel.aggregate([
      { $reservation: { _id: null, percentage: { $sum: '$percentage' } } },
    ]);
  }

  /**************************************************
   * CHECK IF THE GROUP DESCRIPTION IS ALREADY USED *
   **************************************************/
  private async isDescriptionUniq(description: string) {
    const user = await this.ReservationModel.findOne({ description });
    if (user) {
      throw new BadRequestException('Description most be unique.');
    } 
  }


  private getLimitHabitat(id: String, percentage: number) : Promise<number> {
    return null;
      // try {
      //   return this.sessionService.getOneSession(id).then((session) => {
      //     console.log('Session: ', session, percentage);
      //     return (session?.limitHabitat*percentage)/100;
          
      //   });
      // } catch (error) {
      //   throw new BadRequestException("Not session found for this id: " + id );
      // }
  }

}

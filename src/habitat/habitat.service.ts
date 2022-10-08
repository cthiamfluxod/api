import {
  ConflictException,
  ImATeapotException,
  Injectable,
  NotAcceptableException,
  ServiceUnavailableException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Habitat } from './interfaces/habitat.interface';
import { ReservationService } from '../reservation/reservation.service';
import { CreateHabitatDto } from './dto/create-habitat.dto';
import { AssignHabitatDto } from './dto/assign-habitat.dto';
import { AuthService } from 'src/auth/auth.service';
// import { SessionService } from 'src/session/session.service';

@Injectable()
export class HabitatService {
  constructor(
    @InjectModel('Habitat') private readonly habitatModel: Model<Habitat>,
    private readonly reservationService: ReservationService,
    private readonly authService: AuthService,
    // private readonly sessionService: SessionService,
  ) {}

  /*****************
   * CREATE TICKET *
   *****************/

  async createHabitat(createHabitatDto: CreateHabitatDto): Promise<Habitat> {
    const numberOfCreatedHabitats = await this.getNumberOfCreatedHabitats();
    const maxHabitatForSession = await this.getMaxHabitatFoSession(
      createHabitatDto?.idSession,
    );

    if (numberOfCreatedHabitats < maxHabitatForSession) {
      createHabitatDto.habitatNumber = this.getRandomInt();

      // console.log(maxHabitatForSession, 'Maximum number for session');
      // console.log(numberOfCreatedHabitats, 'Number of created habitats');
      let habitatFound = await this.getHabitatByNumber(
        createHabitatDto.habitatNumber,
      );
      let randReservation = await this.getRandomReservation();

      // console.log(randReservation, 'Le rendom');
      var trying = maxHabitatForSession;

      // console.log(createHabitatDto.habitatNumber);
      createHabitatDto.idReservation = randReservation;
      while (
        habitatFound?.habitatNumber?.toString() ==
          createHabitatDto?.habitatNumber?.toString() &&
        trying > 0
      ) {
        createHabitatDto.habitatNumber = this.getRandomInt();
        habitatFound = await this.getHabitatByNumber(
          createHabitatDto.habitatNumber,
        );
        trying--;
        // console.log(trying, 'Essai');
      }

      if (trying == 0) {
        throw new ServiceUnavailableException('Limit of numbers exceeded');
      } else {
        // console.log('Savaing ...');

        const habitat = new this.habitatModel(createHabitatDto);
        await habitat.save();
        return habitat;
      }
    } else {
      throw new ServiceUnavailableException('Limit of habitats atempted');
    }
  }

  /******************
   * GET ALL TICKET *
   ******************/

  async getAllHabitats(): Promise<any> {
    return await this.habitatModel.find({});
  }

  /******************
   * GET ONE TICKET *
   ******************/

  async getOneHabitat(id: string): Promise<Habitat> {
    return await this.habitatModel.findById(id);
  }

  /***************************
   * GET TICKET WHITH PARAMS *
   ***************************/

  async getHabitatByNumber(habitatNumber: String): Promise<Habitat> {
    return await this.habitatModel.findOne({ habitatNumber: habitatNumber });
  }

  /*************************
   * GET TICKET BY GROUPID *
   *************************/
  

  async getAllHabitatForReservation(idReservation: string): Promise<number> {
    return await this.habitatModel.find({ idReservation: { $eq: idReservation } }).count();
  }

  /***************************************
   * COUNT THE NUMBER OF CREATED TICKETS *
   ***************************************/

  async getNumberOfCreatedHabitats(): Promise<any> {
    return await this.habitatModel.count();
  }

  /*************************************************
   * THE MAXIMUM NUMBER OF TICKETS FOR THE SESSION *
   *************************************************/

  async getMaxHabitatFoSession(idSession: string): Promise<number> {

    return 1;
    // try {
    //   return await this.sessionService
    //     .getOneSession(idSession)
    //     .then((session) => session.limitHabitat);
    // } catch (error) {
    //   throw new UnauthorizedException(
    //     'Something went wrong when trying to get the max habitat session',
    //     error,
    //   );
    // }
  }

  /************************
   * UPDATE TICKET PARAMS *
   ************************/

  async updateHabitatPut(
    id: string,
    createHabitatDto: CreateHabitatDto,
  ): Promise<Habitat> {
    // return await this.habitatModel.updateOne({_id: id}, createHabitatDto);
    return null;
  }

  /*****************
   * DELETE TICKET *
   *****************/

  async deleteHabitat(id: string): Promise<Habitat> {
    return await this.habitatModel.findByIdAndDelete(id);
  }

  /******************
   * ASSIGN TICKETS *
   ******************/

  async assignHabitat(
    refreshToken: string,
    assignHabitatDto: AssignHabitatDto,
  ): Promise<any> {
    let userId = await this.authService.findRefreshToken(refreshToken);
    assignHabitatDto.idClient = userId.valueOf().toString();
    await this.isHabitatClaimed(assignHabitatDto.habitatNumber);
    let habitat;
    try {
      habitat = await this.habitatModel.findOneAndUpdate(
        { habitatNumber: assignHabitatDto?.habitatNumber },
        { idClient: assignHabitatDto?.idClient },
      );
    } catch (error) {
      throw new UnauthorizedException('Sorry the HabitatNumber is Wrong', error);
    }

    let reservation = await this.reservationService.getOneReservation(habitat.idReservation);
    // console.log(reservation, 'RRRRRRRRRRRRRRRRRRRRRRR');
    return reservation;
    // return null;
  }

  /***********************
   * VERIFY TICKETNUMBER *
   ***********************/

  async verifyHabitat(habitatNumber: String): Promise<any> {
    let habitat = await this.getHabitatByNumber(habitatNumber);

    if (habitat?.idReservation) {
      let reservation = await this.reservationService.getOneReservation(habitat.idReservation);
      return {
        lot: reservation.description,
      };
    } else {
      throw new ImATeapotException('Sorry, this habitat number is invalid.');
    }
  }

  /*****************************
   * GET TICKETS BY SESSION_ID *
   *****************************/

  async getHabitatBySession(idSession: string): Promise<Array<Habitat>> {
    return await this.habitatModel.find({ idSession: { $eq: idSession } });
  }

  /***********************************
   * GET CLAIMBED TICKETS BY SESSION *
   ***********************************/

  //  async getClaimbedHabitatsBySession(idSession: string): Promise<Array<Habitat>> {
  //   return await this.habitatModel.find({ idSession: { $eq: idSession } });
  // }

  async getClaimbedHabitatsBySession(idSession: string): Promise<Array<Habitat>> {

    // return await this.habitatModel.find({ idSession: { $eq: idSession } });

    return await this.habitatModel.find({
      idSession: { $eq: idSession },
      $and: [
        {
          $or: [{ idClient: { $exists: true } }, { idClient: { $ne: null } }]},

      ],
    });
  }

// },
// { idSession: { $eq: idSession } },

  /***********************************
   * GET CLAIMBED NOT TICKETS BY SESSION *
   ***********************************/

  async getNotClaimbedHabitatsBySession(
    idSession: string,
  ): Promise<Array<Habitat>> {
    return await this.habitatModel.find({
      $and: [
        {
          $or: [{ idClient: { $exists: false } }, { idClient: { $eq: null } }],
        },    
        { idSession: { $eq: idSession } }
      ],
    });
  }

  /******************
   * CLAIMED TICKETS *
   ******************/

  async getClaimbedHabitats(): Promise<Array<Habitat>> {
    return await this.habitatModel.find({
      $and: [{ idClient: { $exists: true } }, { idClient: { $ne: null } }],
    });
  }

  /************************
   * NOT CLAIMBED TICKETS *
   ************************/

  async getNotClaimedHabitats(): Promise<Array<Habitat>> {
    return await this.habitatModel.find({
      $or: [{ idClient: { $exists: false } }, { idClient: { $eq: null } }],
    });
  }

  /********************
   * PRIVATES METHODS *
   ********************/

  /*****************************************
   * GENERATE RANDOM NUMBER OF 10 CARATERS *
   *****************************************/

  private getRandomInt(): String {
    var str = '';
    for (let i = 0; i++ < 10; ) {
      var r = Math.floor(Math.random() * 9);

      str += r.toString();
    }
    // console.log('Generated Code', str, 'Parsed Code: ', parseInt(str));
    return str;
  }

  /******************************************************
   * GET RANDOM GROUP IN ORDER TO AFFECT IT TO A TICKET *
   ******************************************************/

  private async getRandomReservation(i = 0): Promise<string> {
    // return await this.ReservationModel.aggregate([{ $sample: { size: 1 } }]);
    // console.log('Start at ' + i); //

    return await this.reservationService.getAllReservations().then(async (reservations) => {
      let num = Math.random() * 100,
        s = 0;
      i = i == reservations.length ? 0 : i;

      for (; i < reservations.length; ++i) {
        s += reservations[i]?.percentage;
        let habitatsForReservation = await this.getAllHabitatForReservation(
          reservations[i]._id.valueOf(),
        );
        // console.log(habitatsForReservation, ' FOR the reservation', reservations[i]?.description);
        if (habitatsForReservation < reservations[i]?.limitHabitat) {
          if (num < s) {
            return reservations[i]._id.valueOf();
          } else {
            // console.log('Send to the last reservation');
            return this.getAllHabitatForReservation(reservations.pop()._id.valueOf()) <
              reservations.pop()?.limitHabitat
              ? reservations.pop()._id.valueOf()
              : this.getRandomReservation(0);
          }
        } else {
          // console.log(reservations[i]?.description + 'is FULL');
          return this.getAllHabitatForReservation(reservations.pop()._id.valueOf()) <
            reservations.pop()?.limitHabitat
            ? reservations.pop()._id.valueOf()
            : this.getRandomReservation(i + 1);
        }
      }
    });
  }

  /*********************
   * IS TIKET CLAIMBED *
   *********************/
  private async isHabitatClaimed(habitatNumber: String): Promise<any> {
    let habitat = await this.getHabitatByNumber(habitatNumber);
    // console.log(habitat, 'FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF');

    if (habitat != null) {
      if (habitat.idClient) {
        throw new  ConflictException (
          'the number is already used by the a client',
        );
      } else {
        return habitat;
      }
    } else {
      throw new NotAcceptableException('the habitat number is not correct');
    }
  }
}

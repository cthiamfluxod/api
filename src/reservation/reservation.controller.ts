import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import {
    ApiCreatedResponse,
    ApiOkResponse,
    ApiTags,
    ApiBearerAuth,
    ApiHeader,
    ApiOperation,
    ApiParam,
    ApiHeaders
    
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('Reservation')
@Controller('Reservation')
@UseGuards(RolesGuard)
export class ReservationController {
    constructor(
        private readonly ReservationService: ReservationService,
    ) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({summary: 'Get All Reservation',})
    @ApiOkResponse({})
    async getAllReservation() {
        return await this.ReservationService.getAllReservations();
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({summary: 'Get One Reservation',})
    @ApiParam({name: 'id', description: 'id of Reservation'})
    @ApiOkResponse({})
    async getOneReservations(@Param() params) {
        return await this.ReservationService.getOneReservation(params.id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @UseGuards(AuthGuard('jwt'))
    @Roles('admin')
    @ApiOperation({summary: 'Create one Reservation',})
    @ApiBearerAuth()
    @ApiHeader({
        name: 'Bearer',
        description: 'the token we need for auth.'
    })
    @ApiCreatedResponse({})
    
    async createReservation(@Body() createReservationDto: CreateReservationDto) {

        console.log(ApiHeaders.name,"Hello chiekh depuis");
        return await this.ReservationService.createReservation(createReservationDto);
    }


    @Put(':id')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard('jwt'))
    @Roles('admin')
    @ApiOperation({summary: 'Update one Reservation by id ( all params )',})
    @ApiBearerAuth()
    @ApiParam({name: 'id', description: 'id of Reservation'})
    @ApiHeader({
        name: 'Bearer',
        description: 'the token we need for auth.'
    })
    @ApiOkResponse({})
    async updateWithAllParams(@Param() params, @Body() createReservationDto: CreateReservationDto) {
        return await this.ReservationService.updateReservationPut(params.id, createReservationDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard('jwt'))
    @Roles('admin')
    @ApiOperation({summary: 'Delete one Reservation',})
    @ApiBearerAuth()
    @ApiHeader({
        name: 'Bearer',
        description: 'the token we need for auth.'
    })
    @ApiParam({name: 'id', description: 'id of Reservation we want to delete.'})
    @ApiOkResponse({})
    async deleteOneReservation(@Param() params) {
        return await this.ReservationService.deleteReservation(params.id);
    }

    

}

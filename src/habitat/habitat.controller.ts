import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  UseGuards,
  ServiceUnavailableException,
  Patch,
  Headers,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiBearerAuth,
  ApiHeader,
  ApiOperation,
  ApiParam,
  ApiHeaders,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { HabitatService } from './habitat.service';
import { CreateHabitatDto } from './dto/create-habitat.dto';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { AssignHabitatDto } from './dto/assign-habitat.dto';
import { VerifyHabitatDto } from './dto/verify-habitat.dto';
import { GetHabitatBySessionDto } from './dto/get-habitats-by-session.dto';

@ApiTags('Habitat')
@Controller('habitat')
@UseGuards(RolesGuard)
export class HabitatController {
  constructor(private readonly habitatService: HabitatService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get All habitat' })
  @ApiOkResponse({})
  async getAllHabitat() {
    return await this.habitatService.getAllHabitats();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get One habitat' })
  @ApiParam({ name: 'id', description: 'id of habitat' })
  @ApiOkResponse({})
  async getOneHabitats(@Param() params) {
    return await this.habitatService.getOneHabitat(params.id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard('jwt'))
  @Roles('admin')
  @ApiOperation({ summary: 'Create one habitat' })
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Bearer',
    description: 'the token we need for auth.',
  })
  @ApiCreatedResponse({})
  async createHabitat(@Body() createHabitatDto: CreateHabitatDto) {
    console.log(ApiHeaders.name, 'Hello chiekh depuis');
    return await this.habitatService.createHabitat(createHabitatDto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  @Roles('admin')
  @ApiOperation({ summary: 'Update one habitat by id ( all params )' })
  @ApiBearerAuth()
  @ApiParam({ name: 'id', description: 'id of habitat' })
  @ApiHeader({
    name: 'Bearer',
    description: 'the token we need for auth.',
  })
  @ApiOkResponse({})
  async updateWithAllParams(
    @Param() params,
    @Body() createHabitatDto: CreateHabitatDto,
  ) {
    return await this.habitatService.updateHabitatPut(params.id, createHabitatDto);
  }

  @Patch('assign-habitat')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  @Roles('admin')
  @ApiOperation({ summary: 'Update one habitat by id ( all params )' })
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Bearer',
    description: 'the token we need for auth.',
  })
  @ApiOkResponse({})
  async assignHabitat(
    @Headers() headers,
    @Body() assignHabitatDto: AssignHabitatDto,
  ) {
    console.log(headers);

    return await this.habitatService.assignHabitat(
      assignHabitatDto?.idClient,
      assignHabitatDto,
    );
  }

  @Post('/verify-habitat')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  @Roles('admin')
  @ApiOperation({ summary: 'Update one habitat by id ( all params )' })
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Bearer',
    description: 'the token we need for auth.',
  })
  @ApiOkResponse({})
  async verifyHabitat(@Body() verifyHabitatDto: VerifyHabitatDto) {
    console.log(verifyHabitatDto);

    return await this.habitatService.verifyHabitat(verifyHabitatDto?.habitatNumber);
  }

  @Post('/claimbed-habitats')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  @Roles('admin')
  @ApiOperation({ summary: 'Update one habitat by id ( all params )' })
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Bearer',
    description: 'the token we need for auth.',
  })
  @ApiOkResponse({})
  async getClaimbedHabitats() {
    return await this.habitatService.getClaimbedHabitats();
  }

  @Post('/not-claimbed-habitats')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  @Roles('admin')
  @ApiOperation({ summary: 'Update one habitat by id ( all params )' })
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Bearer',
    description: 'the token we need for auth.',
  })
  @ApiOkResponse({})
  async getNotClaimedHabitats() {
    return await this.habitatService.getNotClaimedHabitats();
  }
  @Post('/habitats-by-session')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  @Roles('admin')
  @ApiOperation({ summary: 'Update one habitat by id ( all params )' })
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Bearer',
    description: 'the token we need for auth.',
  })
  @ApiOkResponse({})
  async getHabitatBySession(
    @Body() getHabitatBySessionDto: GetHabitatBySessionDto,
  ) {

    console.log('getHabitatBySession', getHabitatBySessionDto);
    return await this.habitatService.getHabitatBySession(
      getHabitatBySessionDto.idSession,
    );
  }



  @Post('/claimbed-habitats-by-session')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  @Roles('admin')
  @ApiOperation({ summary: 'Update one habitat by id ( all params )' })
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Bearer',
    description: 'the token we need for auth.',
  })
  @ApiOkResponse({})
  async getClaimbedHabitatsBySession(
    @Body() getHabitatBySessionDto: GetHabitatBySessionDto,
  ) {

    console.log('getClaimbedHabitatsBySession', getHabitatBySessionDto);
    return await this.habitatService.getClaimbedHabitatsBySession(
      getHabitatBySessionDto.idSession,
    );
  } 
  
  @Post('/habitats-not-claimbed-by-session')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  @Roles('admin')
  @ApiOperation({ summary: 'Update one habitat by id ( all params )' })
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Bearer',
    description: 'the token we need for auth.',
  })
  @ApiOkResponse({})
  async getNotClaimbedHabitatsBySession(
    @Body() getHabitatBySessionDto: GetHabitatBySessionDto,
  ) {

    console.log('getNotClaimbedHabitatsBySession', getHabitatBySessionDto);
    return await this.habitatService.getNotClaimbedHabitatsBySession(
      getHabitatBySessionDto.idSession,
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  @Roles('admin')
  @ApiOperation({ summary: 'Delete one habitat' })
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Bearer',
    description: 'the token we need for auth.',
  })
  @ApiParam({ name: 'id', description: 'id of habitat we want to delete.' })
  @ApiOkResponse({})
  async deleteOneHabitat(@Param() params) {
    return await this.habitatService.deleteHabitat(params.id);
  }
}

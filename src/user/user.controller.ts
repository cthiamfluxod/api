import { Roles } from './../auth/decorators/roles.decorator';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { CreateForgotPasswordDto } from './dto/create-forgot-password.dto';
import { Request } from 'express';
import { LoginUserDto } from './dto/login-user.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Req,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { VerifyUuidDto } from './dto/verify-uuid.dto';
import { UserService } from './user.service';
import { AuthGuard, PassportModule } from '@nestjs/passport';
import { RefreshAccessTokenDto } from './dto/refresh-access-token.dto';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiBearerAuth,
  ApiHeader,
  ApiOperation,
} from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { GetHabitatBySessionDto } from 'src/habitat/dto/get-habitats-by-session.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { UserEntity } from './user.entity';

@ApiTags('User')
@Controller('user')
@UseGuards(RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService,private mailService: MailerService) {}

  // ╔═╗╦ ╦╔╦╗╦ ╦╔═╗╔╗╔╔╦╗╦╔═╗╔═╗╔╦╗╔═╗
  // ╠═╣║ ║ ║ ╠═╣║╣ ║║║ ║ ║║  ╠═╣ ║ ║╣
  // ╩ ╩╚═╝ ╩ ╩ ╩╚═╝╝╚╝ ╩ ╩╚═╝╩ ╩ ╩ ╚═╝
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Register user' })
  @ApiCreatedResponse({})
  async register(@Body() createUserDto: CreateUserDto) {
    // console.log('one here',CreateUserDto)
    var user = await this.userService.create(createUserDto);
    
    return user;
  }

  @Get('verify-email')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Verify Email' })
  @ApiOkResponse({})
  // async verifyEmail(@Req() req: Request, @Body() verifyUuidDto: VerifyUuidDto) {
// 
  async verifyEmail(@Req() req: Request,  @Query('verification') verification) {
    return await this.userService.verifyEmail(req, verification);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login User' })
  @ApiOkResponse({})
  async login(@Req() req: Request, @Body() loginUserDto: LoginUserDto) {
    // console.log('Two here',loginUserDto)

    return await this.userService.login(req, loginUserDto);
  }

  // @Post('send-email')
  // @HttpCode(HttpStatus.OK)
  // @ApiOperation({ summary: 'Login User' })
  // @ApiOkResponse({})
  // async send(@Req() req: Request, @Body() user: UserEntity) {
  //   // console.log('Email sender form user controller',loginUserDto)

  //   return await this.userService.sendEmail(user);
  // }

  @Post('refresh-access-token')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Refresh Access Token with refresh token' })
  @ApiCreatedResponse({})
  async refreshAccessToken(
    @Body() refreshAccessTokenDto: RefreshAccessTokenDto,
  ) {
    return await this.userService.refreshAccessToken(refreshAccessTokenDto);
  }

  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Forgot password' })
  @ApiOkResponse({})
  async forgotPassword(
    @Req() req: Request,
    @Body() createForgotPasswordDto: CreateForgotPasswordDto,
  ) {
    return await this.userService.forgotPassword(req, createForgotPasswordDto);
  }

  @Post('forgot-password-verify')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Verfiy forget password code' })
  @ApiOkResponse({})
  async forgotPasswordVerify(
    @Req() req: Request,
    @Body() verifyUuidDto: VerifyUuidDto,
  ) {
    return await this.userService.forgotPasswordVerify(req, verifyUuidDto);
  }

  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Reset password after verify reset password' })
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Bearer',
    description: 'the token we need for auth.',
  })
  @ApiOkResponse({})
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return await this.userService.resetPassword(resetPasswordDto);
  }

 



  @Get('/users-by-session')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  @Roles('admin')
  @ApiOperation({ summary: 'Get all users by sessionId ' })
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Bearer',
    description: 'the token we need for auth.',
  })
  @ApiOkResponse({})
  async getHabitatBySession(
    @Body() getHabitatBySessionDto: GetHabitatBySessionDto,
  ) {

    console.log("getHabitatBySessionDto.description");
    return await this.userService.getUsersBySession(
      getHabitatBySessionDto.idSession,
    );
  }




  @Get('/getUsersInfos')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  @Roles('admin')
  @ApiOperation({ summary: 'Get all users by sessionId ' })
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Bearer',
    description: 'the token we need for auth.',
  })
  @ApiOkResponse({})
  async getUsersInfos(
    @Body() getHabitatBySessionDto: GetHabitatBySessionDto,
  ) {

     
    return await this.userService.getUsersBySession(
      getHabitatBySessionDto.idSession,
    );
  }




  @Get()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  @Roles('admin')
  @ApiOperation({ summary: 'Get all users by sessionId ' })
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Bearer',
    description: 'the token we need for auth.',
  })
  @ApiOkResponse({})
  findAll() {
    return this.userService.findAll();
  }
}

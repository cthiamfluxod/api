import {
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsEmail,
  IsString,
  IsDate,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  // fullName
  @ApiProperty({
    example: 'cheikh THIAM',
    description: 'The name of the User',
    format: 'string',
    minLength: 6,
    maxLength: 255,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(255)
  readonly fullName: string;

  // Email
  @ApiProperty({
    example: 'cheikh@gmail.com',
    description: 'The email of the User',
    format: 'email',
    uniqueItems: true,
    minLength: 5,
    maxLength: 255,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(255)
  @IsEmail()
  readonly email: string;

  // Password
  @ApiProperty({
    example: 'secret password change me!',
    description: 'The password of the User',
    format: 'string',
    minLength: 5,
    maxLength: 1024,
  }) 
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(1024)
  readonly password: string;

  // Date of birth
  @ApiProperty({
    example: 'I was born !',
    description: 'Date of birth of the User',
    format: 'date',
  }) 
  @IsNotEmpty()
  @IsString()
  readonly birthday: string; 
}

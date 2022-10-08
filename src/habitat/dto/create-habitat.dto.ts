import {
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsString, 
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateHabitatDto {
  @ApiProperty({
    example: 'Example Title',
    description: 'Title of habitat',
    format: 'string',
    minLength: 6,
    maxLength: 255,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(255)
  readonly title: string;

  @ApiProperty({
    example: 'Body exmaple ...',
    description: 'Main part of habitat',
    format: 'string',
  })
  @IsNotEmpty()
  @IsString()
  readonly body: string;

  @ApiProperty({
    example: 'habitatNumber exmaple ... 032752375705450273450723047',
    description: 'habitatNumber of the habitat',
    format: 'string',
  })
  habitatNumber: String;

  @ApiProperty({
    example: 'InReservation exmaple ... 032752375705450273450723047',
    description: 'Indentifier of the reservatione where the habitat wille be hosted',
    format: 'string',
  })
  idReservation: string;

  @ApiProperty({
    example: 'idSession exmaple ... 032752375705450273450723047',
    description: 'Indentifier of the session where the habitat is part of',
    format: 'string',
  })
  @IsNotEmpty()
  @IsString()
  idSession: string;
}

import {
  IsNotEmpty, 
  IsNumber, 
  IsString, 
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AssignHabitatDto {
 
  @ApiProperty({
    example: '6546h4e4h6df65h46tu5',
    description: 'Id of the client who owns the habitat',
    format: 'string',
  })
  @IsNotEmpty()
  @IsString() 
  idClient: string;

  @ApiProperty({
    example: '6546h4e4h6df65h46tu5',
    description: 'habitatNumber of the habitat which will be assigned to the client',
    format: 'String',
  })
  @IsNotEmpty()
  @IsString() 
  readonly habitatNumber: String;

}

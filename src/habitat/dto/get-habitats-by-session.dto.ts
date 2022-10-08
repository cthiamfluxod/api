import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetHabitatBySessionDto {
  @ApiProperty({
    example: 'idSession exmaple ... 032752375705450273450723047',
    description: 'Indentifier of the session where the habitat is part of',
    format: 'string',
  })
  @IsNotEmpty()
  @IsString()
  idSession: string;
}

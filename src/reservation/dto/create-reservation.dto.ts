import { IsNotEmpty, MinLength, MaxLength, IsEmail, IsString,IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReservationDto {
    @ApiProperty({
        example: 'Thé à infusion',
        description: 'Description of Reservation',
        format: 'string',
        minLength: 6,
        uniqueItems: true,
        maxLength: 255,
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(255)
    readonly description: string;


    @ApiProperty({
        example: '0.5',
        description: 'Percentage of Reservation',
        format: 'number',
    })
    @IsNotEmpty()
    @IsNumber()
    readonly percentage:number;  

    @ApiProperty({
        example: '1654665',
        description: 'limitHabitat which can hosted in this reservation according to the limitHabitat of the session',
        format: 'number',
    })
     limitHabitat:number;  
 
}
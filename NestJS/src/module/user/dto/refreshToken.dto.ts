import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RefreshTokenDto {
    @IsNotEmpty()
    @ApiProperty({ example: '123456' })
    refreshToken: string;
}
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class ConfirmOtpDto {

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({ example: 'test@test.com' })
    email: string = 'test@test.com';

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: '4596' })
    otp: string = '4596';


}
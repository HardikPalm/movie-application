import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class ForgotPasswordDto {

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({ example: 'test@test.com' })
    email: string = 'test@test.com';



}
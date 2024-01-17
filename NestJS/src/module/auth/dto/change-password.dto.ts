import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class ChangePasswordDto {

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'Palm@2022' })
    password: string = 'Palm@2022';

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'Palm@2022' })
    confirm_password: string = 'Palm@2022';

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({ example: 'test@test.com' })
    email: string = 'test@test.com';

}
import { ApiProperty } from "@nestjs/swagger";
import { IsArray } from "class-validator";


export class AppResponseDto<T>  {

    constructor(statusCode: Number, message: string, data: T) {

        this.statusCode = statusCode
        this.message = message
        this.data = data

    }
    @ApiProperty({ example: 200, description: 'The Status code of response' })
    statusCode: Number;

    @ApiProperty({ example: "Successfully performed task", description: 'The message of API response status' })
    message: string = "";

    @IsArray()
    data: T;
}
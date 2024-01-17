import { ApiProperty } from "@nestjs/swagger";

export class ResponseType<T> {

    @ApiProperty()
    statusCode: number;

    @ApiProperty()
    message: string;

    @ApiProperty({

    })
    data: T;
}
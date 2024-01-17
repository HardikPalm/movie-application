import { ApiProperty } from "@nestjs/swagger";
import { PageMetaDto } from "../dto/PageMetaDto";
import { ResponseType } from "./responseType.dto";


export class PageResponseType {


    @ApiProperty()
    statusCode: number;

    @ApiProperty()
    message: string;

    @ApiProperty()
    data: any;

    @ApiProperty()
    meta: PageMetaDto;

}
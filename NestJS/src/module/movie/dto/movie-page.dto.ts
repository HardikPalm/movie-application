import { ApiProperty } from "@nestjs/swagger";
import { PageMetaDto } from "../../../common/dto/PageMetaDto";
import { PageResponseType } from "../../../common/middleware/pageResponseType.dto";
import { MovieResponse } from "./movie-response.dto";

export class MoviePageDto extends PageResponseType {
    @ApiProperty({
        type: MovieResponse,
        isArray: true,
    })
    readonly data: MovieResponse[];

    @ApiProperty()
    readonly meta: PageMetaDto;

    constructor(data: any, meta: PageMetaDto) {
        super();
        this.data = data;
        this.meta = meta;

    }
}
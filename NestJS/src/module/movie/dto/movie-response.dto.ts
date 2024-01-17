import { ApiProperty } from '@nestjs/swagger';
import { ResponseInterceptor } from '../../../common/middleware/response.middleware';

export class MoviePageDataClass extends ResponseInterceptor<MovieResponse> {}

export class MovieResponse {
  @ApiProperty()
  title: string;

  @ApiProperty()
  publishingYear: string;
  
}

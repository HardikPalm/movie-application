import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, Query, ValidationPipe } from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from '../user/user.service';
import { MoviePaginationExtDto } from './dto/movie-pagination.dto';

@Controller('movie')
@ApiTags('Movie')
export class MovieController {
  constructor(private readonly movieService: MovieService, private readonly userService: UserService) {}

  @Post()
  async create(@Body() createMovieDto: CreateMovieDto) {
    var imageArr = await this.userService.createUrl(createMovieDto.poster);
    console.log("image ARR : ", imageArr)
    if(imageArr?.ImageUrl) {
      return this.movieService.create(createMovieDto, imageArr?.ImageUrl);
    } else {
      throw new HttpException({
        message: 'Please upload a movie poster',
        statusCode: 405,
      }, 405)
    }
  }

  @Get()
  findAll(@Query(new ValidationPipe({ transform: true }))
    optionsData: MoviePaginationExtDto) {
    return this.movieService.findAll(optionsData);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.movieService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
    var imageArr = await this.userService.createUrl(updateMovieDto.poster);
    return this.movieService.update(+id, updateMovieDto, imageArr?.ImageUrl);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.movieService.remove(+id);
  }
}

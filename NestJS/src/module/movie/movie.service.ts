import { HttpException, Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { SQLService } from '../../shared/services/sql.service';
import { MovieQueries } from './movie.query';
import { TableName } from '../../common/constants/app.constants';
import { MoviePaginationExtDto } from './dto/movie-pagination.dto';
import { PageMetaDto } from '../../common/dto/PageMetaDto';
import { MoviePageDto } from './dto/movie-page.dto';
import { MoviePagination } from './movie.pagination';

@Injectable()
export class MovieService {

  constructor(
    private SqlService: SQLService, private movieQueries: MovieQueries
  ) {}

  async create(createMovieDto: CreateMovieDto, imageURL) {
    var keyArr = ['title', 'publishingYear', 'poster', 'userId']; 
    var valueArr = [createMovieDto.title, createMovieDto.publishingYear, imageURL, 1]
    valueArr = valueArr.map(i => "'" + i + "'");
    await this.SqlService.run(this.movieQueries.insertData(TableName.Table_Movie, keyArr.join(','), valueArr.join(',')))
    return { message: 'Movie added successfully', result: createMovieDto, statusCode: 201 }
  }

  async findAll(optionsData: MoviePaginationExtDto) {

    const {
      pagination_query,
      count_query,
    } = await MoviePagination.getOrders(optionsData)

    const pagination =
    optionsData.pagination && optionsData.pagination === 'yes';

    const gets =
      await this.SqlService.run(
        pagination_query
      )
    const totals =
      await this.SqlService.run(
        count_query
      );


    const pageMetaDto = new PageMetaDto({
      pageOptionsDto: optionsData,
      totalItems: totals?.total ? parseInt(totals.total) : 0,
    });
    return new MoviePageDto(gets, pagination && pageMetaDto);

    // var data = await this.SqlService.run(this.movieQueries.findAll());
    // return { message: 'Movie added successfully', result: data, statusCode: 201 }
  }

  async findOne(id: number) {
    var data = await this.SqlService.run(this.movieQueries.findOne(id));
    return { message: 'Movie added successfully', result: data, statusCode: 201 }
  }

  async update(id: number, updateMovieDto: UpdateMovieDto, imageURL) {
    var data = await this.SqlService.run(this.movieQueries.findOne(id));
    if(data) {
      await this.SqlService.run(this.movieQueries.update(id, updateMovieDto.publishingYear, updateMovieDto.title, imageURL))
      return { message: 'Movie updated successfully', result: updateMovieDto, statusCode: 201 }
    } else {
      throw new HttpException({
        message: 'Movie data is not available',
        statusCode: 405,
      }, 405)
    }
  }

  remove(id: number) {
    return `This action removes a #${id} movie`;
  }
}

import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { CreateImageUrlDto } from "../../user/dto/create-imageurl.dto";

export class CreateMovieDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(2, {
        message: 'title is too short. Minimal length is $constraint1 characters.'
    })
    @MaxLength(50, { message: 'title is too long. Maximal length is $constraint1 characters.' })
    @ApiProperty({ example: 'Movie title', description: 'Movie title' })
    title: string = 'Movie title';

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ example: 2000, description: 'Movie publishing year!!' })
    publishingYear: number = 2000;
    
    @IsOptional()
    @ApiProperty({ example: {
        FilePath: '',
        tokenId: 1
    }, description: 'Movie poster image!!' })
    poster: CreateImageUrlDto = {
        FilePath: '',
        tokenId: 1
    }
}


import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateImageUrlDto {

  @IsNotEmpty()
  @MaxLength(400)
  @ApiProperty({
    description: 'Filepath which we get from Upload API',
    maxLength: 400,
  })
  FilePath?: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'Generated Temp Token Number',
  })
  tokenId?: number;

}


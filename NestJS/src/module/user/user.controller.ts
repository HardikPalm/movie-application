
import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateImageUrlDto } from './dto/create-imageurl.dto';
import { User } from '../../common/decorators/user.decorator';

@Controller('User')
@ApiTags('User')
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('ImageUrl')
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  @ApiResponse({
    status: 200,
    description: 'User registered successfully',
    // type: User,

  })
  @ApiResponse({
    status: 403,
    description: 'User already exists',
  })
  CreateImageUrl(@Body() ImageUrlDto: CreateImageUrlDto, @User() auth_user: any) {
    console.log("====", auth_user);

    return this.userService.createUrl(ImageUrlDto)
  }
}


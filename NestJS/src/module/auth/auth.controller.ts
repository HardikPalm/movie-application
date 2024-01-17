
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { User, UserResponseClass } from '../user/entities/user.entity';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { LoginUserDto } from './dto/login.dto';
import { ForgotPasswordDto } from './dto/forget-password.dto';
import { ConfirmOtpDto } from './dto/confirm-otp.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { RefreshTokenDto } from '../user/dto/refreshToken.dto';

@Controller('auth/v1')
@ApiTags('Auth')

export class AuthController {
  constructor(private readonly authService: AuthService, private readonly userService: UserService) { }

  @Post('register')
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  @ApiResponse({
    status: 200,
    description: 'User registered successfully',
    type: User,

  })
  @ApiResponse({
    status: 403,
    description: 'User already exists',
  })
  createUser(@Body() createuserDto: CreateUserDto) {
    return this.userService.createUser(createuserDto)
  }

  @Post('login')
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  @ApiResponse({
    status: 200,
    description: 'User registered successfully',
    type: User,

  })
  @ApiResponse({
    status: 403,
    description: 'User already exists',
  })
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.userService.loginUser(loginUserDto);
  }

  @Post('forgotpassword')
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  @ApiResponse({
    status: 200,
    description: 'OTP has been sent to given email'
  })
  @ApiResponse({
    status: 405,
    description: 'User does not exists',
  })
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    let res = await this.userService.forgotPassword(forgotPasswordDto)
    return res
  }

  @Post('comfirmotp')
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  @ApiResponse({
    status: 200,
    description: 'Success'
  })
  @ApiResponse({
    status: 405,
    description: 'User does not exists',
  })
  async comfirmOtp(@Body() comfirmOtpDto: ConfirmOtpDto) {
    let otpdata = await this.userService.confirmOtp(comfirmOtpDto)
    return otpdata
  }

  @Post('resetpassword')
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  @ApiResponse({
    status: 200,
    description: 'Your password is changed successfully'
  })
  @ApiResponse({
    status: 405,
    description: 'User does not exists',
  })
  async resetPassword(@Body() changePasswordDto: ChangePasswordDto) {
    let success = await this.userService.resetPassword(changePasswordDto)
    if (success) {
      return { message: 'Your password is changed successfully' }
    }

  }

  @Post('refreshtoken')
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  @ApiResponse({
    status: 200,
    description: 'Accesstoken generated successfully',
  })
  RefreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.userService.RefreshToken(refreshTokenDto);
  }



}


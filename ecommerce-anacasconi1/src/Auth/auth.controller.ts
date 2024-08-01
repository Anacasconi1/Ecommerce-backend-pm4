import { Body, Controller, HttpCode, Post, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/loginUser.dto';
import { UserDto } from '../Users/dto/user.dto';
import { TransformUsers } from '../interceptors/separatePassword';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @HttpCode(201)
  @Post('signin')
  Signin(@Body() Credentials: LoginUserDto) {
    return this.authService.SignIn(Credentials);
  }

  @HttpCode(201)
  @Post('/signup')
  @UseInterceptors(TransformUsers)
  CreateUser(@Body() UserDto: UserDto) {
    const newUserId = this.authService.createUser(UserDto);
    return newUserId;
  }
}

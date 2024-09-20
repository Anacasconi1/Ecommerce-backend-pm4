import { Body, Controller, HttpCode, Post, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/loginUser.dto';
import { UserDto } from '../Users/dto/user.dto';
import { ApiTags, ApiBody } from '@nestjs/swagger';


@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @HttpCode(201)
  @ApiBody({type: LoginUserDto})
  @Post('/signin')
  Signin(@Body() Credentials: LoginUserDto) {
    return this.authService.SignIn(Credentials);
  }

  @HttpCode(201)
  @ApiBody({type: UserDto})
  @Post('/signup')
  CreateUser(@Body() UserDto: UserDto) {
    const newUserId = this.authService.createUser(UserDto);
    return newUserId;
  }
}

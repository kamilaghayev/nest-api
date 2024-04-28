import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('/login')
  login(@Body() UserDto: CreateUserDto) {
    return this.authService.login(UserDto);
  }

  @Post('/registration')
  registration(@Body() UserDto: CreateUserDto) {
    return this.authService.registration(UserDto);
  }
}

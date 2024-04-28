import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/users.model';

@Injectable()
export class AuthService {

  constructor( 
    private userService: UsersService,
    private jwtService: JwtService
  ) {}

  async login(UserDto: CreateUserDto) {
    const user = await this.validateUser(UserDto);
    return this.generateToken(user); 
  }

  async registration(UserDto: CreateUserDto) {
    const candidate = await this.userService.getUserByEmail(UserDto.email);

    if (candidate) {
      throw new HttpException('User with this email already exists', HttpStatus.BAD_REQUEST);
    }

    const hashPassword = await bcrypt.hash(UserDto.password, 5);

    const user = await this.userService.createUser({...UserDto, password: hashPassword})

    return this.generateToken(user)
  }

  private generateToken(user: User) {
    const payload = {email: user.email, id: user.id, roles: user.roles}

    return {
      token: this.jwtService.sign(payload)
    }
  }
  
  private async validateUser(UserDto: CreateUserDto) {
    
    const user = await this.userService.getUserByEmail(UserDto.email);
    const passwordEquals = await bcrypt.compare(UserDto.password, user.password)

    if (user && passwordEquals) {
      return user;
    }

    throw new UnauthorizedException({message: 'Wrong email or password'})
  }
}

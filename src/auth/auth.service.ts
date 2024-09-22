import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from 'bcryptjs';
import { UserActiveInterface } from '../common/interfaces/user-active.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register({ name, email, password }: RegisterDto) {
    const user = await this.userService.findOneByEmail(email);

    if (user) {
      throw new BadRequestException('User already exists');
    }

    await this.userService.create({
      name,
      email,
      password: await bcryptjs.hash(password, 10),
    });

    return {
      name,
      email,
    };
  }

  async login({ email, password }: LoginDto) {
    const response = "email or password incorrect";

    const user = await this.userService.findByEmailWithPassword(email);
    if (!user) {
      throw new UnauthorizedException(response);
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException(response);
    }

    const payload = { email: user.email, roles: user.roles };
    const token = await this.jwtService.signAsync(payload);

    return {
      token,
      email,
    };
  }

  async profile({ email }: UserActiveInterface) {
    return await this.userService.findOneByEmail(email);
  }
}

import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { UserActiveInterface } from '../common/interfaces/user-active.interface';
import { UserPayload, LoginResponse } from './interfaces/auth.interfaces';
import { UserResponse } from '../common/interfaces/user-response.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register({ name, email, password }: RegisterDto): Promise<LoginResponse> {
    const user = await this.userService.create({
      name,
      email,
      password
    });
    return this.generateTokens(user);
  }

  async login(loginDto: LoginDto): Promise<LoginResponse> {
    const user = await this.userService.validateUser(loginDto.email, loginDto.password);
    return this.generateTokens(user);
  }

  async profile(userActive: UserActiveInterface) {
    return await this.userService.findOneByEmail(userActive.email);
  }

  private generateTokens(user: UserResponse): LoginResponse {
    const token = this.generateToken(user);
    const refreshToken = this.generateRefreshToken(user);

    return {
      token,
      refreshToken,
      data: user,
    };
  }

  private generateToken(user: UserResponse): string {
    const payload: UserPayload = { email: user.email, roles: user.roles };
    return this.jwtService.sign(payload);
  }

  private generateRefreshToken(user: UserResponse): string {
    const payload = { email: user.email };
    return this.jwtService.sign(payload, { expiresIn: '7d' });
  }
}

import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UserActiveInterface } from '../common/interfaces/user-active.interface';
import { LoginResponse } from './interfaces/auth.interfaces';
import { UserResponse } from '../common/interfaces/user-response.interface';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

  async register({ name, email, password }: RegisterDto): Promise<LoginResponse> {
    const user = await this.userService.create({ // Modificar esto
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

  async refreshToken(refreshToken: string): Promise<LoginResponse> {
    const decoded = this.tokenService.verifyRefreshToken(refreshToken);
    const user = await this.userService.findOneByEmail(decoded?.email);
    return this.generateTokens(user);
  }

  private generateTokens(user: UserResponse): LoginResponse {
    const accesToken = this.tokenService.generateAccessToken(user);
    const refreshToken = this.tokenService.generateRefreshToken(user);
    return { accesToken, refreshToken, data: user };
  }
}

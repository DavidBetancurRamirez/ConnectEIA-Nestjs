import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { LoginResponse } from './interfaces/auth.interfaces';
import { UserResponse } from '../common/interfaces/user.interface';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly tokenService: TokenService,
    private readonly userService: UserService,
  ) {}

  async register(registerDto: RegisterDto): Promise<LoginResponse> {
    const user = await this.userService.create(registerDto);
    return this.generateTokens(user);
  }

  async login(loginDto: LoginDto): Promise<LoginResponse> {
    const user = await this.userService.validateUser(loginDto.email, loginDto.password);
    return this.generateTokens(user);
  }

  async refreshToken(refreshToken: string): Promise<LoginResponse> {
    const decoded = this.tokenService.verifyRefreshToken(refreshToken);
    const user = await this.userService.findOneByEmail(decoded?.email);
    if (!user) {
      throw new BadRequestException('Invalid or expired access token');
    }
    return this.generateTokens(user);
  }

  async generateTokens(user: UserResponse): Promise<LoginResponse> {
    const accesToken = this.tokenService.generateAccessToken(user);
    const refreshToken = this.tokenService.generateRefreshToken(user);
    return { accesToken, refreshToken, data: user };
  }
}

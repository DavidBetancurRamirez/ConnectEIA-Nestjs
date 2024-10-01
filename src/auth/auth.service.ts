import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { TokenService } from './token.service';
import { LoginResponse } from 'src/common/interfaces/user.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly tokenService: TokenService,
    private readonly userService: UserService,
  ) {}

  async register(registerDto: RegisterDto): Promise<LoginResponse> {
    const user = await this.userService.create(registerDto);
    return this.tokenService.generateTokens(user);
  }

  async login(loginDto: LoginDto): Promise<LoginResponse> {
    const user = await this.userService.validateUser(loginDto.email, loginDto.password);
    return this.tokenService.generateTokens(user);
  }

  async refreshToken(refreshToken: string): Promise<LoginResponse> {
    const decoded = this.tokenService.verifyRefreshToken(refreshToken);
    const user = await this.userService.findOneByEmail(decoded?.email);
    if (!user) {
      throw new BadRequestException('Invalid or expired access token');
    }
    return this.tokenService.generateTokens(user);
  }
}

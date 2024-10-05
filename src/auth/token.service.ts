import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Payload } from './interfaces/auth.interface';
import { LoginResponse, UserResponse } from '../common/interfaces/user.interface';

@Injectable()
export class TokenService {
  private readonly accessSecret: string;
  private readonly refreshSecret: string;

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.accessSecret = this.configService.get<string>('JWT_SECRET');
    this.refreshSecret = this.configService.get<string>('JWT_REFRESH_SECRET');
  }

  async generateTokens(user: UserResponse): Promise<LoginResponse> {
    const accesToken = this.generateAccessToken(user);
    const refreshToken = this.generateRefreshToken(user);
    return { accesToken, refreshToken, data: user };
  }

  generateAccessToken(user: UserResponse): string {
    const payload: Payload = { email: user.email, roles: user.roles };
    return this.jwtService.sign(payload, { secret: this.accessSecret, expiresIn: '1d' });
  }

  generateRefreshToken(user: UserResponse): string {
    const payload = { email: user.email };
    return this.jwtService.sign(payload, { secret: this.refreshSecret, expiresIn: '7d' });
  }

  verifyAccessToken(token: string): Payload {
    try {
      return this.jwtService.verify(token, { secret: this.accessSecret });
    } catch {
      throw new UnauthorizedException('Invalid or expired access token');
    }
  }

  verifyRefreshToken(token: string): Payload {
    try {
      return this.jwtService.verify(token, { secret: this.refreshSecret });
    } catch {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }
}

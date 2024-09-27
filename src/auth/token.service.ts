import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserPayload } from './interfaces/auth.interfaces';
import { UserResponse } from '../common/interfaces/user-response.interface';

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

  generateAccessToken(user: UserResponse): string {
    const payload: UserPayload = { email: user.email, roles: user.roles };
    return this.jwtService.sign(payload, { secret: this.accessSecret, expiresIn: '1d' });
  }

  generateRefreshToken(user: UserResponse): string {
    const payload = { email: user.email };
    return this.jwtService.sign(payload, { secret: this.refreshSecret, expiresIn: '7d' });
  }

  verifyAccessToken(token: string): UserPayload {
    try {
      return this.jwtService.verify(token, { secret: this.accessSecret });
    } catch {
      throw new UnauthorizedException('Invalid or expired access token');
    }
  }

  verifyRefreshToken(token: string): UserPayload {
    try {
      return this.jwtService.verify(token, { secret: this.refreshSecret });
    } catch {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }
}

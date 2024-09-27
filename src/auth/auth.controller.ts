import { Body, Controller, Get, Post } from '@nestjs/common';
import { ActiveUser } from '../common/decorators/active-user.decorator';
import { UserActiveInterface } from '../common/interfaces/user-active.interface';
import { Role } from '../common/enums/rol.enum';
import { AuthService } from './auth.service';
import { Auth } from './decorators/auth.decorator';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResponsesSecurity } from '../common/decorators/responses-security.decorator';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { LoginResponse } from './interfaces/auth.interfaces';
import { UserResponse } from '../common/interfaces/user-response.interface';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register' })
  @ApiCreatedResponse({
    description: 'The register has been successful.',
  })
  register(@Body() registerDto: RegisterDto): Promise<LoginResponse> {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login' })
  @ApiCreatedResponse({
    description: 'The login has been successful.',
  })
  login(@Body() loginDto: LoginDto): Promise<LoginResponse> {
    return this.authService.login(loginDto);
  }

  @Post('refresh-token')
  @ApiOperation({ summary: 'Refresh Token' })
  @ApiCreatedResponse({
    description: 'The tokens have been refreshed.',
  })
  refreshToken(@Body() refreshTokenDto: RefreshTokenDto): Promise<LoginResponse> {
    return this.authService.refreshToken(refreshTokenDto.refreshToken);
  }

  @Get('profile')
  @ApiOperation({ summary: 'Profile' })
  @ResponsesSecurity()
  @Auth([Role.USER])
  profile(@ActiveUser() user: UserActiveInterface): Promise<UserResponse | null> {
    return this.authService.profile(user);
  }
}

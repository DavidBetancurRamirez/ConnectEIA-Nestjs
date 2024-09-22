import { Body, Controller, Get, Post } from '@nestjs/common';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import { UserActiveInterface } from 'src/common/interfaces/user-active.interface';
import { Role } from '../common/enums/rol.enum';
import { AuthService } from './auth.service';
import { Auth } from '../common/decorators/auth.decorator';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResponsesSecurity } from 'src/common/decorators/responses-security.decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register' })
  @ApiCreatedResponse({
    description: 'The register has been successful.',
  })
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login' })
  @ApiCreatedResponse({
    description: 'The login has been successful.',
  })
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get('profile')
  @ApiOperation({ summary: 'Profile' })
  @ResponsesSecurity()
  @Auth([Role.USER])
  profile(@ActiveUser() user: UserActiveInterface) {
    return this.authService.profile(user);
  }
}

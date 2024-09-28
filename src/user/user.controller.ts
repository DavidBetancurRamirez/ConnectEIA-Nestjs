import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Auth } from '../auth/decorators/auth.decorator';
import { Role } from '../common/enums/rol.enum';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResponsesSecurity } from 'src/common/decorators/responses-security.decorator';
import { UserResponse, UserActiveInterface } from 'src/common/interfaces/user.interface';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import { UpdateMeDto } from './dto/update-me.dto';

@ApiTags('user')
@ResponsesSecurity()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Profile' })
  @Auth([Role.USER])
  profile(@ActiveUser() userActive: UserActiveInterface): Promise<UserResponse | null> {
    return this.userService.profile(userActive.email);
  }

  @Patch()
  @ApiOperation({ summary: 'Update' })
  @ApiBody({ type: CreateUserDto })
  @Auth([Role.USER])
  updateMe(@ActiveUser() userActive: UserActiveInterface, @Body() updateMeDto: UpdateMeDto) {
    return this.userService.updateMe(userActive, updateMeDto);
  }

  @Delete()
  @ApiOperation({ summary: 'Remove' })
  @Auth([Role.USER])
  removeMe(@ActiveUser() userActive: UserActiveInterface) {
    return this.userService.removeMe(userActive);
  }


  @Get('users')
  @ApiOperation({ summary: 'FindAll' })
  @Auth([Role.ADMIN])
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'FindOne' })
  @Auth([Role.ADMIN])
  findOne(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'CreateUser' })
  @Auth([Role.ADMIN])
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'UpdateUser' })
  @ApiBody({ type: CreateUserDto })
  @Auth([Role.ADMIN])
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'RemoveUser' })
  @Auth([Role.ADMIN])
  remove(@Param('id') id: number) {
    return this.userService.remove(id);
  }
}

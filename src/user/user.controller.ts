import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Auth } from '../common/decorators/auth.decorator';
import { Role } from '../common/enums/rol.enum';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { ApiBody, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResponsesSecurity } from 'src/common/decorators/responses-security.decorator';

@ApiTags('user')
@ResponsesSecurity()
@Auth([Role.ADMIN])
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'FindAll' })
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'FindOne' })
  findOne(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'CreateUser' })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'UpdateUser' })
  @ApiBody({
    type: CreateUserDto
  })
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'RemoveUser' })
  remove(@Param('id') id: number) {
    return this.userService.remove(id);
  }
}

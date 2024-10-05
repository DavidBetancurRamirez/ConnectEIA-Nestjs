import { OmitType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class UpdateMeDto extends OmitType(UpdateUserDto, ['roles'] as const) {}

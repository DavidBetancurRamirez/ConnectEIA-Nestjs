import { PartialType, OmitType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateMeBodyDto extends OmitType(CreateUserDto, ['roles'] as const) {}

export class UpdateMeDto extends PartialType(UpdateMeBodyDto) {}

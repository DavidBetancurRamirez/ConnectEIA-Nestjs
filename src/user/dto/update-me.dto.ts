import { PartialType, OmitType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateMeDto extends PartialType(
  OmitType(CreateUserDto, ['roles'] as const)
) {}

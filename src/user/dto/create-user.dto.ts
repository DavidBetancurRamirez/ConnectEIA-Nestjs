import { Transform } from 'class-transformer';
import { IsEmail, IsEnum, IsString, MinLength } from 'class-validator';
import { Role } from '../../common/enums/rol.enum';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(6)
  password: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(1)
  name?: string;

  @Transform(({ value }) => value.map((role: string) => role.trim()))
  @IsEnum(Role, { each: true })
  roles?: Role[];
}

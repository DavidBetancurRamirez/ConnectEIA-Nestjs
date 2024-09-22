import { PartialType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, MinLength } from 'class-validator';
import { LoginDto } from './login.dto';

export class RegisterDto extends PartialType(LoginDto) {
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(1)
  name: string;
}

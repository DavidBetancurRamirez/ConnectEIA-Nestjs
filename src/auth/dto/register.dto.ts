import { IsOptional, IsString, MinLength } from 'class-validator';
import { LoginDto } from './login.dto';
import { Transform } from 'class-transformer';

export class RegisterDto extends LoginDto {
  @IsOptional()
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(1)
  name?: string;
}

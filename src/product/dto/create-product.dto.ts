import { Transform } from "class-transformer";
import { IsBoolean, IsNumber, IsOptional, IsString, MinLength } from "class-validator";

export class CreateProductDto {
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(1)
  name: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(1)
  description: string;

  @IsNumber()
  price: number;

  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(1)
  contact: string;

  @IsBoolean()
  new: boolean;

  @IsBoolean()
  negotiable: boolean;

  @IsOptional()
  @Transform(({ value }) => value?.map((img: string) => img.trim()))
  images?: string[];
}

import { Transform } from "class-transformer";
import { IsArray, IsBoolean, IsNumber, IsOptional, IsString, Min, MinLength } from "class-validator";
import { EachElementLenght } from "src/common/decorators/validate-each.decorator";

export class CreateProductDto {
  @IsString()
  @Transform(({ value }) => value.trim())
  @MinLength(1)
  name: string;

  @IsString()
  @Transform(({ value }) => value.trim())
  @MinLength(1)
  description: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsOptional()
  @IsBoolean()
  new?: boolean;

  @IsOptional()
  @IsBoolean()
  negotiable?: boolean;

  @IsOptional()
  @IsArray()
  // @IsString({ each: true })
  // @Transform(({ value }) => value ? value.map((img: string) => img.trim()) : [])
  @EachElementLenght()
  images?: string[];
}

import { IsString } from "class-validator";

export class DeleteUserDto {
  @IsString()
  message: string;
}

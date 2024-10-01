import { Role } from "../enums/rol.enum";

export interface UserResponse {
  id: number;
  name: string;
  email: string;
  roles: Role[];
}

export interface UserActiveInterface {
  email: string;
  roles: string[];
}

export interface LoginResponse {
  accesToken: string;
  refreshToken: string;
  data: UserResponse;
}

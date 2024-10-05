import { Role } from "../../common/enums/rol.enum";

export interface Payload {
  email: string;
  roles: Role[];
}

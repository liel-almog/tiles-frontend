import { Role } from "./enum.role";

export interface User {
  _id: string;
  name: string;
  email: string;
  role: Role;
}

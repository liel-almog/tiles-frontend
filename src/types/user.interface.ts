import { Role } from "./role.enum";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}

export type userDetails = { id: string; role: Role };
import { Role } from "./role.enum";

export interface User {
  _id: string;
  name: string;
  email: string;
  role: Role;
}

export type userDetails = { _id: string; role: Role };
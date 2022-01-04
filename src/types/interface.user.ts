import { Role } from "./enum.role";

export interface User {
  _id: string;
  name: string;
  email: string;
  role: Role;
}

export type userDetails = { _id: string; role: Role };
import { User, NewUser } from "../../shared/types";
export interface PasswordHash {
  salt: string;
  hash: string;
  iterations: number;
  keylen: number;
  digest: string;
}

export type AuthUser = User & PasswordHash;
export type NewAuthUser = NewUser & PasswordHash;

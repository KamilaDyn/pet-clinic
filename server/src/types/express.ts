import { Request } from 'express';
import { User as UserType } from '../types/user';

export interface tokenRequest extends Request {
  token?: string | null;
  user?: UserType | null;
}

import { Types } from 'mongoose';

type ObjectId = Types.ObjectId[];

export interface User {
  _id: string;
  username: string;
  name: string;
  token: string;
  appointments: ObjectId[] | [];
}

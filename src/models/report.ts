import { IUser } from './user';

export interface IReport {
  _id: string;
  title: string;
  description: string;
  pictures: string[];
  approved: string[];
  disapproved: string[];
  created: string;
  _creator: IUser;
  latitude: number;
  longitude: number;
  place: string;
}

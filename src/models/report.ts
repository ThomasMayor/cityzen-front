export interface IReport {
  title: string;
  description: string;
  pictures: string[];
  approved: string[];
  disapproved: string[];
  created: string;
  user_id: string;
  latitude: number;
  longitude: number;
}

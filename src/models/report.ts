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
  category: ReportCategory;
}

export enum ReportCategory {
  Agriculture = 0,
  GreenSpaces,
  SportAndYouth,
  UrbanFurniture,
  Transports,
  Health,
  Social,
  Security,
  Last = Security
}

export const reportCategoryHelper = {
  get range() : number[] {
    return Array(ReportCategory.Last + 1).fill(0).map((x,i)=>i)
  },
  getColor(cat: ReportCategory): string {
    switch(cat) {
      case ReportCategory.Agriculture :
        return '#00BCD4';
      case ReportCategory.GreenSpaces :
        return '#009688';
      case ReportCategory.SportAndYouth :
        return '#2196F3';
      case ReportCategory.UrbanFurniture :
        return '#3F51B5';
      case ReportCategory.Transports :
        return '#673AB7';
      case ReportCategory.Health :
        return '#9C27B0';
      case ReportCategory.Social :
        return '#CDDC39';
      case ReportCategory.Security :
        return '#4CAF50'

    }
  },
  getName(cat: ReportCategory): string {
    switch(cat) {
      case ReportCategory.Agriculture :
        return 'Agriculture';
      case ReportCategory.GreenSpaces :
        return 'Espaces Verts';
      case ReportCategory.SportAndYouth :
        return 'Jeunesse et Sports';
      case ReportCategory.UrbanFurniture :
        return 'Mobilier urbain';
      case ReportCategory.Transports :
        return 'Transports Publiques';
      case ReportCategory.Health :
        return 'Santé';
      case ReportCategory.Social :
        return 'Social';
      default :
        return 'Sécurité';
    }
  }
}

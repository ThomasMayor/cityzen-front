export interface IUser {
  _id: string,
  email: string;
  admin: boolean;
  verified: boolean;
  name: string;
  profilePicture: string;
  approvals: number;
  disapprovals: number;
  reports: number;
}

export const userScore = {

  compute: (user: IUser):number => {
    if (!user || user.reports == 0)
      return 0;
    let mult = Math.min(0.5, Math.max(10, (user.approvals - user.disapprovals) / user.reports));
    let scoreBase = user.reports * 10 + user.approvals * 20 - user.disapprovals * 5;
    return Math.round(scoreBase * mult);
  }
}

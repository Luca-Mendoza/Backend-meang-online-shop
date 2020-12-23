import { IUser } from './user.interface';

export interface IJwt {
    user: IUser;
    id: string;
    email: string;
}
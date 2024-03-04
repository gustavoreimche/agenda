import { MyDate } from '../utils/MyDate';
import { FormaPag } from './payment.enum';
import { User } from './user.model';

export interface ISchedule {
  id?: string;
  date: string | Date;
  client: string;
  serviceExecuted: string;
  value: number;
  payment?: FormaPag;
  user?: User;
}

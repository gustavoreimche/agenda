import { User } from '@angular/fire/auth';
import { FormaPag } from './payment.enum';

export interface ISchedule {
  id?: string;
  date: string | Date;
  hour: string;
  client: string;
  serviceExecuted: string;
  value: number | null;
  payment?: FormaPag;
  user?: User;
}

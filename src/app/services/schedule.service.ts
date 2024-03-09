import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { ISchedule } from '../models/schedule.model';
import { Observable, from, map, take } from 'rxjs';
import { MyDate } from '../utils/MyDate';
import { AuthService } from './auth.service';

@Injectable()
export class ScheduleService {
  private dbPath = '/schedules-' + this._auth.user.email;

  tutorialsRef: AngularFirestoreCollection<ISchedule>;

  constructor(private db: AngularFirestore, private _auth: AuthService) {
    this.tutorialsRef = db.collection(this.dbPath);
    console.log(this._auth.user.uid)
  }

  getAll(): Observable<ISchedule[]> {
    return this.tutorialsRef.valueChanges({ idField: 'id' }).pipe(
      map((list) =>
        list.map((item) => {
          return {
            ...item,
            date: new Date(item.date),
          };
        })
      )
    );
  }

  create(schedule: ISchedule): Observable<ISchedule> {
    if(typeof schedule.date !== 'string') schedule.date = schedule.date.toISOString();
    return from(this.tutorialsRef.add({ ...schedule })).pipe(
      map((doc) => ({ id: doc.id, ...schedule }))
    );
  }

  update(id: string, schedule: any): Observable<ISchedule> {
    if(typeof schedule.date !== 'string') schedule.date = schedule.date.toISOString();
    return from(this.tutorialsRef.doc(id).update(schedule)).pipe(
      map(() => ({ id, ...schedule }))
    );
  }

  delete(id: string): Promise<void> {
    return this.tutorialsRef.doc(id).delete();
  }

  filterByDate(date: Date): Observable<ISchedule[]> {
    return this.getAll().pipe(
      map((list) =>
        list.filter(
          (item) =>
            new Date(item.date).getDate() === date.getDate() &&
            new Date(item.date).getMonth() === date.getMonth() &&
            new Date(item.date).getFullYear() === date.getFullYear()
        )
      )
    );
  }
}

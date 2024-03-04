import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { ISchedule } from '../models/schedule.model';
import { Observable, from, map } from 'rxjs';
import { MyDate } from '../utils/MyDate';

@Injectable()
export class ScheduleService {

  private dbPath = '/schedules';

  tutorialsRef: AngularFirestoreCollection<ISchedule>;

  constructor(private db: AngularFirestore) {
    this.tutorialsRef = db.collection(this.dbPath);
  }

  getAll(): Observable<ISchedule[]> {
    return this.tutorialsRef.valueChanges().pipe(map(list => list.map(item => {
      return {
        ...item,
        date: new Date(item.date),
      }
    })));
  }

  create(schedule: ISchedule): Observable<ISchedule> {
    return from(this.tutorialsRef.add({ ...schedule })).pipe(map(doc => ({ id: doc.id, ...schedule })));
  }

  update(id: string, data: any): Observable<ISchedule> {
    return from(this.tutorialsRef.doc(id).update(data)).pipe(map(() => ({ id, ...data })));
  }

  delete(id: string): Promise<void> {
    return this.tutorialsRef.doc(id).delete();
  }
}

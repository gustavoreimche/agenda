import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DateService {
  dateChange$: BehaviorSubject<Date> = new BehaviorSubject(new Date());

  constructor() { }

  setDate(date: Date) {
    this.dateChange$.next(date);
  }

  getDate() {
    return this.dateChange$.asObservable();
  }
}

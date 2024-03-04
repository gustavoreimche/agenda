import { Component } from '@angular/core';
import { ISchedule } from '../../models/schedule.model';
import { MyDate } from '../../utils/MyDate';
import { FormaPag } from '../../models/payment.enum';
import { ScheduleService } from '../../services/schedule.service';
import { AsyncPipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AsyncPipe, JsonPipe],
  templateUrl: './home.component.html',
  styles: ``,
  providers: [
    ScheduleService,
  ]
})
export class HomeComponent {

  schedules$ = this._schedule.getAll()

  constructor(private _schedule: ScheduleService) { }
  ngOnInit(): void {
    const exampleSchedule: ISchedule = {
      date: new Date().toISOString(),
      client: 'Nome do Cliente',
      serviceExecuted: 'Serviço realizado',
      value: 100.00,
      payment: FormaPag.CARTAO,
      user: {
        id: 'user123',
        name: 'Nome do Usuário',
        email: 'usuario@email.com',
      },
    };
    this.schedules$.subscribe(console.log)
    this._schedule.create(exampleSchedule).subscribe(console.log);
  }
}

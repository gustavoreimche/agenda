import { Component } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { HeaderComponent } from '../../components/header/header.component';
import { LoadingComponent } from '../../components/loading/loading.component';
import { LoadingService } from '../../components/loading/loading.service';
import { ScheduleTableComponent } from '../../components/schedule-table/schedule-table.component';
import { ISchedule } from '../../models/schedule.model';
import { ScheduleService } from '../../services/schedule.service';
import { GetHours } from '../../utils/utils-hours';
import { DateService } from '../../services/date.service';
import { take, timer } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { bck } from '../../utils/bck';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    ToastModule,
    LoadingComponent,
    ScheduleTableComponent,
    HttpClientModule,
  ],
  templateUrl: './home.component.html',
  styles: ``,
  providers: [],
})
export class HomeComponent {
  date: Date = new Date();
  hours: string[] = [];
  schedulesDate: ISchedule[] = [];
  schedules: ISchedule[] = [];

  constructor(
    private _service: ScheduleService,
    private _loading: LoadingService,
    private _dateService: DateService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this._loading.start();
    this.hours = GetHours();
    this.mountRenderList();
    this._service
      .filterByDate(this.date)
      .pipe(take(1))
      .subscribe((schedules) => {
        this.schedulesDate = schedules;
        this.mountRenderList();
        this._loading.stop();
      });
    this.getSchedulesByDate();
    this._dateService.getDate().subscribe((date) => {
      this.date = date;
      this.getSchedulesByDate();
    });
    // bck.forEach((item) => {
    //   const year = item.year || 0; // Defina um valor padrão se year for nulo ou indefinido
    //   const month = item.month || 1; // Defina um valor padrão se month for nulo ou indefinido
    //   const day = item.day || 1; // Defina um valor padrão se day for nulo ou indefinido

    //   // Verifique se os valores de ano, mês e dia são válidos
    //   if (year >= 2024 && month >= 0 && month <= 12 && day >= 1 && day <= 31) {
    //     const date = new Date(
    //       `${year}-${(month+1).toString().padStart(2, '0')}-${day
    //         .toString()
    //         .padStart(2, '0')}T12:00:00Z`
    //     );
    //     const payload = {
    //       date: date.toISOString(),
    //       hour: item.hora,
    //       client: item.nome,
    //       serviceExecuted: item.servico,
    //       value: item.valor,
    //     };
    //     console.log('=> ', payload.date);
    //     this._service.create(payload).subscribe();
    //   } else {
    //     console.error('Invalid date values:', item);
    //   }
    // });
    // console.log('END');
  }

  getSchedulesByDate() {
    this._service.filterByDate(this.date).subscribe((schedules) => {
      this.schedulesDate = schedules;
      this.mountRenderList();
    });
  }

  mountRenderList(): void {
    this.schedules = [];
    let tempList: ISchedule[] = [];
    this.hours.forEach((hour) => {
      this.schedulesDate.forEach((schedule) => {
        if (schedule.hour === hour) {
          tempList.push(schedule);
          this.schedules.push(schedule);
        }
      });

      if (tempList.length === 0) {
        const schedule: ISchedule = {
          date: this.date,
          hour,
          client: '',
          serviceExecuted: '',
          value: null,
        };
        this.schedules.push(schedule);
      }
      tempList = [];
    });
  }
}

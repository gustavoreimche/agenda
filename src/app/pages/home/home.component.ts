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

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    ToastModule,
    LoadingComponent,
    ScheduleTableComponent,
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
    private _dateService: DateService
  ) {}

  ngOnInit(): void {
    this._loading.start();
    this.hours = GetHours();
    this.mountRenderList();
    this._service.filterByDate(this.date).pipe(take(1)).subscribe((schedules) => {
      this.schedulesDate = schedules;
      this.mountRenderList();
      this._loading.stop();
    });
    this.getSchedulesByDate();
    this._dateService.getDate().subscribe((date) => {
      this.date = date;
      this.getSchedulesByDate();
    })
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

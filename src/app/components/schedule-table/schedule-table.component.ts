import { Component, Input } from '@angular/core';
import { ISchedule } from '../../models/schedule.model';
import { ScheduleLineComponent } from '../schedule-line/schedule-line.component';
import { SeparatorComponent } from '../separator/separator.component';

@Component({
  selector: 'app-schedule-table',
  standalone: true,
  imports: [ScheduleLineComponent, SeparatorComponent],
  templateUrl: './schedule-table.component.html',
  providers: [],
  styles: ``
})
export class ScheduleTableComponent {
  @Input() schedules: ISchedule[] = []
  constructor() {}
}

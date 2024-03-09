import { Component, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { ISchedule } from '../../models/schedule.model';
import { InfoScheduleModalComponent } from '../info-schedule-modal/info-schedule-modal.component';
import { InfoScheduleService } from '../info-schedule-modal/info-schedule.service';
import { SeparatorComponent } from '../separator/separator.component';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-schedule-line',
  standalone: true,
  imports: [SeparatorComponent, ButtonModule, MenuModule, InfoScheduleModalComponent, CurrencyPipe],
  templateUrl: './schedule-line.component.html',
  styles: ``,
})
export class ScheduleLineComponent {
  @Input() schedule!: ISchedule;

  constructor(private _infoService: InfoScheduleService) {}
  openInfo(): void {
    this._infoService.open(this.schedule)
  }
}

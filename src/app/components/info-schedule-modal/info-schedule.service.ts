import { Injectable } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ISchedule } from '../../models/schedule.model';
import { InfoScheduleModalComponent } from './info-schedule-modal.component';

@Injectable({
  providedIn: 'root',
})
export class InfoScheduleService {
  ref: DynamicDialogRef | undefined;

  constructor(public dialogService: DialogService) {}

  open(schedule: ISchedule) {
    this.ref = this.dialogService.open(InfoScheduleModalComponent, {
      header: 'Agendamento: ' + schedule.hour,
      width: '50vw',
      modal: true,
      baseZIndex: 500,
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw',
      },
      data: schedule,
    });
  }
  close() {
    this.ref?.close();
  }
}

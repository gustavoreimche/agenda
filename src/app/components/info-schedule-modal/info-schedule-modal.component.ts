import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import {
  DynamicDialogConfig,
  DynamicDialogModule,
} from 'primeng/dynamicdialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { ISchedule } from '../../models/schedule.model';
import { ScheduleService } from '../../services/schedule.service';
import { ToasterService } from '../../services/toaster.service';
import { LoadingService } from '../loading/loading.service';
import { InfoScheduleService } from './info-schedule.service';

@Component({
  selector: 'app-info-schedule-modal',
  standalone: true,
  imports: [
    DialogModule,
    InputTextModule,
    ButtonModule,
    ReactiveFormsModule,
    InputNumberModule,
    DynamicDialogModule,
  ],
  templateUrl: './info-schedule-modal.component.html',
  styles: ``,
  providers: [],
})
export class InfoScheduleModalComponent {
  schedule: ISchedule;

  form: FormGroup = this._fb.group({
    client: [''],
    serviceExecuted: [''],
    value: [null],
  });
  constructor(
    public service: InfoScheduleService,
    private _schedule: ScheduleService,
    private _toaster: ToasterService,
    private _loading: LoadingService,
    public config: DynamicDialogConfig,
    private _fb: FormBuilder
  ) {
    this.schedule = config.data;
  }

  ngOnInit(): void {
    this.form.patchValue(this.config.data);
  }

  save() {
    this._loading.start();
    this.schedule = { ...this.schedule, ...this.form.value };
    if (this.schedule.id) {
      this._schedule.update(this.schedule.id, this.schedule).subscribe(() => {
        this.service.close();
        this._loading.stop();
        this._toaster.success('Agendamento salvo com sucesso');
      });
    } else {
      this._schedule.create(this.schedule).subscribe(() => {
        this.service.close();
        this._toaster.success('Agendamento salvo com sucesso');
        this._loading.stop();
      });
    }
  }

  delete(): void {
    if (this.schedule.id) {
      this._loading.start();
      this._schedule.delete(this.schedule.id).then(() => {
        this.service.close();
        this._toaster.success('Agendamento excluido com sucesso');
        this._loading.stop();
      });
    } else this.service.close();
  }
}

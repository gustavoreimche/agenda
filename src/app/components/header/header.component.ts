import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule, LocaleSettings } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { BehaviorSubject } from 'rxjs';
import { DateService } from '../../services/date.service';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonModule, FormsModule, DialogModule, MatDatepickerModule, MenuModule],
  templateUrl: './header.component.html',
  styles: ``,
  providers: [provideNativeDateAdapter()],
})
export class HeaderComponent {
  date: Date = new Date();
  visible = false;

  menuList: MenuItem[] = [
    {
      label: 'Sair',
      icon: 'pi pi-power-off',
      command: () => this._auth.logout(),
    }
  ]

  dayNames = [
    'Domingo',
    'Segunda',
    'Terça',
    'Quarta',
    'Quinta',
    'Sexta',
    'Sábado',
  ];
  monthNames = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];

  constructor(private _dateService: DateService, private _auth: AuthService) {}
  dateChange() {
    this._dateService.setDate(this.date)
  }
}

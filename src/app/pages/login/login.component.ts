import { Component } from '@angular/core';
import { PasswordModule } from 'primeng/password'
import { CheckboxModule } from 'primeng/checkbox'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [PasswordModule, CheckboxModule],
  templateUrl: './login.component.html',
  styles: ``
})
export class LoginComponent {

}

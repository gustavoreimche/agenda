import { Component } from '@angular/core';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [PasswordModule, CheckboxModule, InputTextModule, ButtonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styles: ``,
})
export class LoginComponent {
  form = this._fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(private auth: AuthService, private _fb: FormBuilder) {}

  login() {
    const { email, password } = this.form.getRawValue();
    if (email && password) this.auth.login(email, password);
  }
}

import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToasterService } from './toaster.service';
import { Observable, from } from 'rxjs';
import { User } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth, private _router: Router, private _toaster: ToasterService) { }
  signUp(email: string, password: string) {
    this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(() => {
        this._toaster.success('Conta criada com sucesso!')
        this.login(email, password);
      })
      .catch((error) => {
        this._toaster.error(error.message)
      });
  }

  login(email: string, password: string) {
    this.afAuth.signInWithEmailAndPassword(email, password)
      .then(user => {
        localStorage.setItem('user', JSON.stringify(user.user));
        this._router.navigate(['/']);
      })
      .catch((error) => {
        this._toaster.error(error.message)
      });
    }

    logout() {
      this.afAuth.signOut()
      .then(() => {
        this._toaster.warning('Saindo...')
        setTimeout(() => {
          localStorage.clear();
          this._router.navigate(['/login']);
          location.reload();
        }, 2000)
      })
      .catch((error) => {
        this._toaster.error(error.message)
      });
  }

  get isAuthenticated(): boolean {
    return localStorage.getItem('user') ? true : false
  }

  get user(): User {
    return JSON.parse(localStorage.getItem('user')!)
  }
}

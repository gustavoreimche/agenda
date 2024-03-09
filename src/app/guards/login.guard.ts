import { Inject, Injectable, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class LoginGuard {
  constructor(private router: Router, private auth: AuthService) {}
  canActivate(): boolean {
    if(this.auth.isAuthenticated){
      return true
    } else {
      console.log('awda')
      this.router.navigate(['/login']);
      return false
    }
  }
  canMatch(): boolean {
    return true;
  }
}
// export const loginGuard: CanActivateFn = (route, state) => {
//   return inject(PermissionsService).canActivate();
// };

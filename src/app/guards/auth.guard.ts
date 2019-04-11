import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, public authService: AuthService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (!this.authService.isAuthenticated()) {
            this.router.navigate(['']);
            return false;
        }

        // this.router.navigate(['/login'], {queryParams: {returnUrl: state.url }} );
        return true;
    }

}

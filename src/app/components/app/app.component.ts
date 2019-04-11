import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'tenancy-manager-client';

    _isLoggedIn = false;

    get profile() {
        // console.log('profile app comp', this._authService.userProfile);
        return this._authService.userProfile;
    }

    constructor(private _authService: AuthService, private _router: Router) {
        this._authService.handleAuthentication();
    }

    ngOnInit() {
        if (localStorage.getItem('isLoggedIn') === 'true') {
            this._authService.renewTokens();
        }
    }

    get isLoggedIn() {
        return localStorage.getItem('isLoggedIn') === 'true';
    }


}

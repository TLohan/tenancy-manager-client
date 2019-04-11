import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    templateUrl: './login.component.html',
    selector: 'app-login',
    styles: [`
        @media (max-width: 767.98px) {
            .buttons {
                padding-top: 8px;
            }
            .btn-sm {
                font-size: 1rem;
            }
        }
    `]
})
export class LoginComponent implements OnInit {

    @Input() profile: any;

    constructor(private authService: AuthService) {
    }



    ngOnInit(): void {
        // console.log('profile', this.profile);
    }

    get isLoggedIn() {
        return localStorage.getItem('isLoggedIn') === 'true';
    }

    login() {
        this.authService.login();
    }

    logout() {
        this.authService.logout();
    }

    getUsername() {
        if (this.profile) {
            return this.profile.name;
        }
    }

}

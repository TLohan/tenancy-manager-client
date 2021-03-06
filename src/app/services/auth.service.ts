import { Injectable } from '@angular/core';
import * as auth0 from 'auth0-js';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthService {
    _idToken: string;
    _accessToken: string;
    _expiresAt: number;

    baseAppUrl = environment.baseAppUrl;


    auth0 = new auth0.WebAuth({
        clientID: 'tH4WiYLbHuXJOn8Fr6aV3tb0Tga3Cne8',
        domain: 'tlohan.eu.auth0.com',
        responseType: 'token id_token',
        redirectUri:  `${this.baseAppUrl}/callback`,
        scope: 'openid profile'
    });
    userProfile: any;

    constructor(private router: Router) {
        this._idToken = '';
        this._accessToken = '';
        this._expiresAt = 0;
    }

    get accessToken(): string {
        return this._accessToken;
    }

    get idToken(): string {
        return this._idToken;
    }

    get expiresAt(): number {
        return this._expiresAt;
    }

    public login(): void {
        this.auth0.authorize();
    }

    public handleAuthentication(): void {
        this.auth0.parseHash((err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                window.location.hash = '';
                this.localLogin(authResult);
                this.router.navigate(['/']);
            } else if (err) {
                this.router.navigate(['/']);
                console.log(err);
            }
        });
    }

    private localLogin(authResult): void {
        // Set isLoggedIn flag in localstorage
        localStorage.setItem('isLoggedIn', 'true');

        // Set the time that the access tokwn will expire at
        const expiresAt = (authResult.expiresIn * 1000) + new Date().getTime();

        this._accessToken = authResult.accessToken;
        this._idToken = authResult.idToken;
        this._expiresAt = authResult.expiresAt;

        this.getProfile((err, profile) => {
            this.userProfile = profile;
        });
    }

    public renewTokens(): void {
        this.auth0.checkSession({}, (err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                this.localLogin(authResult);
            } else if (err) {
                alert(`Could not get the new token (${err.error}: ${err.errorDescription})`);
                this.logout();
            }
        });
    }

    public logout(): void {
        // remobve tokens and expiry time
        this._accessToken = '';
        this._idToken = '';
        this._expiresAt = 0;

        // Remove isLoggedIn flag from localstorage
        localStorage.removeItem('isLoggedIn');

        // Go back to home route
        this.router.navigate(['/']);
    }

    public isAuthenticated(): boolean {
        // check whether the current time is past the access token's expiry time.
        return new Date().getTime() < this._expiresAt;
    }

    public getProfile(cb): void {
        if (!this._accessToken) {
            throw new Error('Access Token must exist to access this profile.');
        }

        const self = this;
        this.auth0.client.userInfo(this._accessToken, (err, profile) => {
            if (profile) {
                self.userProfile = profile;
            }
            cb(err, profile);
        });
    }
}

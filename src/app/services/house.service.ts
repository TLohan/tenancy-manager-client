import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable()
export class HouseService {

    baseUrl = environment.baseServerURL;

    constructor(private http: HttpClient) { }

    getHouses(): Observable<any> {
        const url = `${this.baseUrl}api/houses`;
        return this.http.get(url);
    }

}


import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Lease } from '../models/lease.model';
import { Observable } from 'rxjs';

@Injectable()
export class FlatService {

    baseUrl = environment.baseServerURL;

    constructor(private http: HttpClient) { }

    getFlat(houseName: string, flatNumber: number): Observable<any> {
        const url = `${this.baseUrl}api/houses/${houseName}/flats/${flatNumber}`;
        return this.http.get(url);
    }

    getCurrentLeaseForFlat(flatId: number): Observable<any> {
        const url = `${this.baseUrl}api/flats/${flatId}/currentLease`;
        return this.http.get(url);
    }

    getPreviousLeasesForFlat(flatId: number): Observable<any> {
        const url = `${this.baseUrl}api/flats/${flatId}/previousLeases`;
        return this.http.get(url);
    }

    saveLease(flatId: number, lease: Lease, autoGenerateRentReview: boolean): Observable<any> {
        const url = `${this.baseUrl}api/flats/${flatId}/leases?autoGenRentReview=true`;
        const body = JSON.stringify(lease);
        const params = {autoGenRentReview: true};
        const requestHeaders = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.post(url, lease, { headers: requestHeaders });
    }
}

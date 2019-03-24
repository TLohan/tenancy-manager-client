import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class LeaseService {

    baseUrl = environment.baseServerURL;

    constructor(private http: HttpClient) {}


    public getLease(leaseId: number): Observable<any> {
        const url = `${this.baseUrl}api/leases/${leaseId}`;
        return this.http.get(url);
    }

    public patchLease(leaseId: number, patchStatement: any[]): Observable<any> {
        const url = `${this.baseUrl}api/leases/${leaseId}`;
        const body = patchStatement;
        const requestHeaders = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.patch(url, body, {headers: requestHeaders});
    }

    public getCurrentLeases(): Observable<any> {
        const url = `${this.baseUrl}api/leases/current`;
        return this.http.get(url);
    }

}

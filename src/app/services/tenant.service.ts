import { Tenant } from '../models/tenant.model';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TenantService {

    baseUrl = environment.baseServerURL;

    constructor(private http: HttpClient) { }

    updateTenant(tenant: Tenant): Observable<any> {
        const url = `${this.baseUrl}api/tenants/${tenant.id}`;
        const body = JSON.stringify(tenant);
        const requestHeaders = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.post(url, body, { headers: requestHeaders });
    }
}

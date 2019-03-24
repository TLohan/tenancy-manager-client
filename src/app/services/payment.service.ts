import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Payment } from '../models/payment.model';
import { Observable } from 'rxjs';

@Injectable()
export class PaymentService {

    baseUrl = environment.baseServerURL;

    constructor(private http: HttpClient) {}

    autoUpdateRentPayments() {
        this.http.get(`${this.baseUrl}api/payments/autoUpdateRentPayments`).subscribe(() => {});
    }

    savePayment(payment: Payment): Observable<any> {
        const url = `${this.baseUrl}api/payments/${payment.id}`;
        const body = JSON.stringify(payment);
        const params = {autoGenRentReview: true};
        const requestHeaders = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.post(url, body, {headers: requestHeaders});
    }


    getPaymentsForLease(leaseId: number): Observable<any> {
        const url = `${this.baseUrl}api/payments/${leaseId}`;
        return this.http.get(url);
    }

    getPaymentsForLastFiveYears(): Observable<any> {
        const url = `${this.baseUrl}api/payments/GetAnnualIncomeForLastFiveYears`;
        return this.http.get(url);
    }

    getIncomeForEachHouseThisYear(): Observable<any> {
        const url = `${this.baseUrl}api/payments/IncomeForEachHouseThisYear`;
        return this.http.get(url);
    }

}

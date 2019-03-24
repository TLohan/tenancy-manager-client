import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { RentReview } from '../models/rent-review.model';


@Injectable()
export class RentReviewService {

    baseUrl = environment.baseServerURL;

    constructor(private http: HttpClient) { }


    getNextRentReviews(): Observable<any> {
        const url = `${this.baseUrl}api/RentReviews`;
        return this.http.get(url);
    }

    createRentReview(leaseId: number, rentReview: RentReview): void {
        const url = `${this.baseUrl}api/leases/${leaseId}/rentReviews`;
        const body = JSON.stringify(rentReview);
        this.http.post(url, body).subscribe();
    }

    executeReview(review: RentReview): Observable<any> {
        const url = `${this.baseUrl}api/RentReviews/${review.id}/execute`;
        return this.http.get(url);
    }

}

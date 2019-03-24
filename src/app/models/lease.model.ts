import { Tenant } from './tenant.model';
import { Flat } from './flat.model';
import { RentReview } from './rent-review.model';
import { Payment } from './payment.model';

export class Lease {

    id: number;
    rent = 0;
    deposit = 0;
    startDate: Date = new Date();
    endDate?: Date;
    isCurrent = false;
    RTB_Number?: string;

    tenants: Tenant[] = [];
    rentReviews: RentReview[] = [];
    nextRentReview: RentReview;
    flat: Flat = new Flat();
    payments: Payment[] = [];
    rentPaidThisYear = 0;
}

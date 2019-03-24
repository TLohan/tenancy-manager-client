import { Lease } from './lease.model';

export class Payment {
    id = 0;
    date: Date = new Date();
    amount = 0;
    month = 0;
    year = 0;
    lease: Lease = new Lease();

}

import { House } from './house.model';
import { Lease } from './lease.model';

export class Flat {
    id: number;
    number: number;
    MPRN_Number: string;

    house: House;
    leases: Lease[];
    currentLease: Lease;
}

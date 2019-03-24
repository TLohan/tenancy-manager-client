import { Lease } from './lease.model';

export class Tenant {

    id: number;
    firstName:  string;
    lastName: string;
    phoneNumber: string;
    email: string;
    dateOfBirth: Date;
    employment: string;

    lease: Lease;

    get fullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }
}

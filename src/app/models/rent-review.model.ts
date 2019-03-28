import { Lease } from './lease.model';

export class RentReview {
    id = 0;
    takesEffectOn: Date = new Date();
    serveNoticeBy: Date = new Date();
    isNext = false;
    noticeHasBeenServed = false;
    isInEffect = false;
    percent = 0;
    previousRent = 0;
    lease: Lease;
}

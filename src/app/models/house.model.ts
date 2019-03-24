import { Flat } from './flat.model';

export class House {
    id = 0;
    name = '';

    flats: Flat[] = [];
    totalRentPerMonth = 0;
    totalRentPaidThisYear = 0;
}

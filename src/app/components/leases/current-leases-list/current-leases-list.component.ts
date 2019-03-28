import { Component, OnInit } from '@angular/core';
import { Lease } from 'src/app/models/lease.model';
import { LeaseService } from 'src/app/services/lease.service';
import { House } from 'src/app/models/house.model';
import { HouseService } from 'src/app/services/house.service';

@Component({
    selector: 'app-current-leases-list',
    templateUrl: './current-leases-list.component.html',
    styleUrls: ['./current-leases-list.component.css']
})
export class CurrentLeasesListComponent implements OnInit {

    currentLeases: Lease[] = [];
    houses: House[] = [];


    constructor(private leasesService: LeaseService, private houseService: HouseService) {

    }

    ngOnInit() {
        this.houseService.getHouses().subscribe(data => {
            this.houses = data;
        });

        this.leasesService.getCurrentLeases().subscribe(leases => {
            this.currentLeases = leases;
        });
    }

    getCurrentLeasesForHouse(name: string): Lease[] {
        return this.currentLeases.filter(lease => lease.flat.house.name === name);
    }

    setStep(index: number): string {
        return index % 2 === 0 ? 'odd' : 'even';
    }
}

interface LeasesByHouse {
    houseName: string;
    leases: Lease[];
}

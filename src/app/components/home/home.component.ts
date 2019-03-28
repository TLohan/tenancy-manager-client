import { Component, OnInit } from '@angular/core';
import { House } from 'src/app/models/house.model';
import { Lease } from 'src/app/models/lease.model';
import { RentReview } from 'src/app/models/rent-review.model';
import { Flat } from 'src/app/models/flat.model';
import { RentReviewService } from 'src/app/services/rent-review.service';
import { HouseService } from 'src/app/services/house.service';
import { LeaseService } from 'src/app/services/lease.service';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    houses: House[] = [];
    currentLeases: Lease[] = [];
    nextRentReviews: RentReview[] = [];
    highlightedRow = 0;

    totalRent = 0;
    totalRentPaid = 0;
    incomesFromEachHouse: {} = {};


    constructor(private housesService: HouseService,
        private leasesService: LeaseService,
        private rentReviewsService: RentReviewService,
        private paymentService: PaymentService) {}

    ngOnInit(): void {
        this.housesService.getHouses().subscribe(data => {
            this.houses = data;
            this.houses.forEach(house => {
                house.flats.sort((flatA, flatB) => flatA.number - flatB.number);
                this.totalRent += house.totalRentPerMonth;
            });
            this.totalRentPaid = this.getTotalRentPaid();
        });

        this.leasesService.getCurrentLeases().subscribe(data => {
            this.currentLeases = data;
        });

        this.rentReviewsService.getNextRentReviews().subscribe(data => {
            this.nextRentReviews = data;
            this.nextRentReviews = this.nextRentReviews.slice(0, 4);
            console.log(this.nextRentReviews);
        });

        this.paymentService.getIncomeForEachHouseThisYear().subscribe(data => {
            this.incomesFromEachHouse = data;
        });
    }

    getTotalRentPaid() {
        let trp = 0;
        this.houses.forEach(house => {
            trp += this.getYTDIncomeForHouse(house.name);
        });
        return trp;
    }

    getYTDIncomeForHouse(houseName: string): number {
        return this.incomesFromEachHouse[houseName];
    }

    highlightRow(flat: Flat) {
        if (flat !== undefined) {
            this.highlightedRow = flat.id;
        } else {
            this.highlightedRow = 0;
        }
    }




}

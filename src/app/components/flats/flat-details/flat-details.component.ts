import { Component, OnInit } from '@angular/core';
import { Lease } from 'src/app/models/lease.model';
import { Flat } from 'src/app/models/flat.model';
import { Tenant } from 'src/app/models/tenant.model';
import { ActivatedRoute, Router } from '@angular/router';
import { LeaseService } from 'src/app/services/lease.service';
import { FlatService } from 'src/app/services/flat.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-flat-details',
  templateUrl: './flat-details.component.html',
  styleUrls: ['./flat-details.component.css']
})
export class FlatDetailsComponent implements OnInit {

    flat: Flat = new Flat();

    previousLeases: Lease[] = [];
    currentLease: Lease = new Lease();

    newLease: Lease = new Lease();
    typeOfNewLease = 'new';
    newLeaseMode = false; // < ------- false
    addTenantsMode = false; // <----- false
    leaseFormMode = false;
    noCurrentLeaseMode = true;
    addAnotherTenant = false; // < ----- false
    nextTenantNumber = 0;
    numTenants = 0; // <----- 0

    validNewLease = false;
    autoGenerateRentReview = false;

    newTenants: Tenant[] = [];

    endLeaseFormGroup: FormGroup;

    constructor(private route: ActivatedRoute,
      private flatsService: FlatService,
      private leasesService: LeaseService,
      private router: Router) {
        this.endLeaseFormGroup = new FormGroup({
            endDate: new FormControl()
        });
    }

    ngOnInit(): void {
        this.route.data.forEach((data) => {
            this.flat = data['flat'];
        });

        this.flatsService.getCurrentLeaseForFlat(this.flat.id).subscribe((lease: any) => {
            this.currentLease = lease;
            this.noCurrentLeaseMode = this.currentLease == null;
        });

        this.flatsService.getPreviousLeasesForFlat(this.flat.id).subscribe((leases: any) => {
            this.previousLeases = leases;
        });

    }


    createNewLease() {
        this.newLeaseMode = true;
        this.leaseFormMode = true;
    }

    createBrandNewLease() {
        this.typeOfNewLease = 'new';
        this.createNewLease();
    }

    createExistingLease() {
        this.createNewLease();
        this.typeOfNewLease = 'existing';
    }

    createHistoricalLease() {
        this.createNewLease();
        this.typeOfNewLease = 'historic';
    }

    endLease(leaseId: number) {
        const endDate = this.endLeaseFormGroup.controls['endDate'].value;
        const patchStatement = [
            {'op': 'replace', 'path': '/endDate', 'value': endDate},
            {'op': 'replace', 'path': '/isCurrent', 'value': 'false'}
        ];
        this.leasesService.patchLease(leaseId, patchStatement).subscribe((leases: any) => {
            this.previousLeases = leases;
            this.noCurrentLeaseMode = true;
        });
    }


    setCurrentLease(lease: Lease) {
        this.currentLease = lease;
        this.noCurrentLeaseMode = false;
        this.newLeaseMode = false;
        this.leaseFormMode = false;
    }

}

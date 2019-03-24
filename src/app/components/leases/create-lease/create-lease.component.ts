import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Lease } from 'src/app/models/lease.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Tenant } from 'src/app/models/tenant.model';
import { FlatService } from 'src/app/services/flat.service';

@Component({
  selector: 'app-create-lease',
  templateUrl: './create-lease.component.html',
  styleUrls: ['./create-lease.component.css']
})
export class CreateLeaseComponent implements OnInit {

  @Input() typeOfLease = '';
  @Input() flatId = 0;

  @Output() newLease = new EventEmitter<Lease>();

  lease: Lease = new Lease();
  leaseFormGroup: FormGroup = new FormGroup({});
  numberOfTenants = 0; // < ---- 0

  addTenantsMode = false; // < --- false
  showValidation = false;
  autoGenRentReview = false;
  leaseFormMode = false;
  nextTenantNumber = 0; // < ---- 0
  newTenants: Tenant[] = [];
  addAnotherTenant = false; // <--- false
  validNewLease = false;

  constructor(private flatsService: FlatService) {

  }

  ngOnInit(): void {
      switch (this.typeOfLease) {
          case 'new': {
              this.leaseFormGroup = this.createNewLeaseFormGroup();
              break;
          }
          case 'existing': {
              this.leaseFormGroup = this.createExistingLeaseFormGroup();
              break;
          }
          case 'historic': {
              this.leaseFormGroup = this.createHistoricLeaseFormGroup();
              break;
          }
          default: {
              console.log('hit default');
              this.leaseFormGroup = new FormGroup({});
          }

      }
  }


  get rent() { return this.leaseFormGroup.get('rent'); }
  get deposit() { return this.leaseFormGroup.get('deposit'); }
  get startDate() { return this.leaseFormGroup.get('startDate'); }
  get numTenants() { return this.leaseFormGroup.get('numberOfTenants'); }
  get endDate() { return this.leaseFormGroup.get('endDate'); }

  private createCommonFormGroup(): FormGroup {
      this.leaseFormMode = true;
      return new FormGroup({
          rent: new FormControl('', [Validators.required, Validators.min(400)]),
          deposit: new FormControl('', [Validators.required, Validators.min(400)]),
          startDate: new FormControl('', Validators.required),
          numberOfTenants: new FormControl('', Validators.required)
      });
  }

  checkValidation() {
      if (this.leaseFormGroup.invalid) {
          this.showValidation = true;
      }
  }

  private createNewLeaseFormGroup(): FormGroup {
      const formGroup = this.createCommonFormGroup();
      formGroup.addControl('autoGenRentReview', new FormControl(Validators.required));
      return formGroup;
  }

  private createExistingLeaseFormGroup(): FormGroup {
      const formGroup = this.createCommonFormGroup();
      return formGroup;
  }

  private createHistoricLeaseFormGroup(): FormGroup {
      const formGroup = this.createCommonFormGroup();
      formGroup.addControl('endDate', new FormControl('', Validators.required));
      return formGroup;
  }

  addTenants(): void {
      this.addTenantsMode = true;
      this.leaseFormMode = false;
      this.lease.rent = this.leaseFormGroup.controls.rent.value;
      this.lease.deposit = this.leaseFormGroup.controls.deposit.value;

      if (this.leaseFormGroup.controls.startDate.value !== '') { this.lease.startDate = this.leaseFormGroup.controls.startDate.value; }

      if (this.typeOfLease === 'new') {
          this.autoGenRentReview = this.leaseFormGroup.controls.autoGenRentReview.value;
      }

      if (this.typeOfLease === 'historic') {
          this.lease.endDate = this.leaseFormGroup.controls.endDate.value;
      }

      this.numberOfTenants = this.leaseFormGroup.controls.numberOfTenants.value;
      if (this.numberOfTenants > 0) { this.addAnotherTenant = true; }
      this.nextTenantNumber = 1;
      for (let x = 0; x < this.numberOfTenants; x++) {
          this.newTenants[x] = new Tenant();
      }
  }

  appendTenant(tenant: Tenant) {
      this.addAnotherTenant = (this.nextTenantNumber < this.numberOfTenants);
      this.validNewLease = (this.nextTenantNumber === this.numberOfTenants);
      this.lease.tenants.push(tenant);
      this.nextTenantNumber++;
      if (this.lease.tenants.length === this.numberOfTenants) { this.validNewLease = true; }
  }

  save(): void {
      this.flatsService.saveLease(this.flatId, this.lease, this.autoGenRentReview).subscribe((lease: any) => {
          this.newLease.emit(lease);

          // this.currentLease = lease;
          // this.noCurrentLeaseMode = this.currentLease == null;
          // this.leaseFormMode = false;
          // this.newLeaseMode = false;
      });
  }
}

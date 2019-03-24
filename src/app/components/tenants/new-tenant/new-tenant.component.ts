import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Tenant } from 'src/app/models/tenant.model';

@Component({
  selector: 'app-new-tenant-form',
  templateUrl: './new-tenant.component.html',
  styleUrls: ['./new-tenant.component.css']
})
export class NewTenantComponent {

  newTenantFormGroup: FormGroup;
  @Input() newTenant: Tenant;
  @Input() number = 0;
  @Output() validTenantAdded = new EventEmitter<Tenant>();

  mouseOverSubmit = false;
  feedback = '';

  constructor() {
      this.newTenant = new Tenant();
      this.newTenantFormGroup = new FormGroup({
          firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
          lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
          dateOfBirth: new FormControl(''),
          phoneNumber: new FormControl('', Validators.minLength(7)),
          employment: new FormControl('')
      });

  }

  get firstName() { return this.newTenantFormGroup.get('firstName'); }
  get lastName() { return this.newTenantFormGroup.get('lastName'); }
  get dateOfBirth() { return this.newTenantFormGroup.get('dateOfBirth'); }
  get phoneNumber() { return this.newTenantFormGroup.get('phoneNumber'); }
  get employment() { return this.newTenantFormGroup.get('employment'); }

  addTenant() {
      this.newTenant.firstName = this.newTenantFormGroup.controls['firstName'].value;
      this.newTenant.lastName = this.newTenantFormGroup.controls['lastName'].value;
      if (this.newTenantFormGroup.controls['dateOfBirth'].value !== '') {
          this.newTenant.dateOfBirth = this.newTenantFormGroup.controls['dateOfBirth'].value;
      }
      this.newTenant.phoneNumber = this.newTenantFormGroup.controls['phoneNumber'].value;
      this.newTenant.employment = this.newTenantFormGroup.controls['employment'].value;
      this.validTenantAdded.emit(this.newTenant);
  }

  checkValidation() {
      this.mouseOverSubmit = true;
      const errors: string[] = [];
      if (this.firstName && this.firstName.invalid) { errors.push('first name'); }
      if (this.lastName && this.lastName.invalid) { errors.push('last name'); }
      if (this.phoneNumber && this.phoneNumber.invalid) { errors.push('phone number'); }
      if (errors.length === 1) { this.feedback = 'Invalid value for ' + errors[0] + '.'; }

      if (errors.length > 1) {
          this.feedback = 'Invalid values for ';
          errors.forEach(error => {
              if (errors.indexOf(error) < (errors.length - 2)) {
                  this.feedback += error + ', ';
              } else if (errors.indexOf(error) === errors.length - 2) {
                  this.feedback += error + ' ';
              } else {
                  this.feedback += 'and ' + error + '.';
              }
          });
      }
  }

  uncheckValidation() {
      this.mouseOverSubmit = false;
      this.feedback = '';
  }

}

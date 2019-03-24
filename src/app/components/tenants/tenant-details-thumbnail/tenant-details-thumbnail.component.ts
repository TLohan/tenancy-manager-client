import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Tenant } from 'src/app/models/tenant.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TenantService } from 'src/app/services/tenant.service';

@Component({
  selector: 'app-tenant-details-thumbnail',
  templateUrl: './tenant-details-thumbnail.component.html',
  styleUrls: ['./tenant-details-thumbnail.component.css']
})
export class TenantDetailsThumbnailComponent {
    @Input() tenant: Tenant = new Tenant();
    @Input() isEditable = false;

    @Output() editClicked = new EventEmitter<boolean>();

    editMode = false;
    editTenantFormGroup: FormGroup;

    constructor(private tenantsService: TenantService) {
        this.editTenantFormGroup = new FormGroup({
            firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
            lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
            dateOfBirth: new FormControl(''),
            phoneNumber: new FormControl('', Validators.minLength(7)),
            employment: new FormControl('')
        });
    }

    get firstName() { return this.editTenantFormGroup.get('firstName'); }
    get lastName() { return this.editTenantFormGroup.get('lastName'); }
    get dateOfBirth() { return this.editTenantFormGroup.get('dateOfBirth'); }
    get phoneNumber() { return this.editTenantFormGroup.get('phoneNumber'); }
    get employment() { return this.editTenantFormGroup.get('employment'); }

    edit() {
        this.editClicked.emit(true);
        this.editMode = true;
        this.editTenantFormGroup.controls['firstName'].patchValue(this.tenant.firstName);
        this.editTenantFormGroup.controls['lastName'].patchValue(this.tenant.lastName);
        this.editTenantFormGroup.controls['dateOfBirth'].patchValue(this.tenant.dateOfBirth.toString().split('T')[0]);
        this.editTenantFormGroup.controls['phoneNumber'].patchValue(this.tenant.phoneNumber);
        this.editTenantFormGroup.controls['employment'].patchValue(this.tenant.employment);
        console.log(this.tenant.dateOfBirth.toString().split('T')[0]);
    }

    save() {
        console.log('bd: ' + this.editTenantFormGroup.controls['dateOfBirth'].value);

        this.tenant.firstName =  this.editTenantFormGroup.controls['firstName'].value;
        this.tenant.lastName =  this.editTenantFormGroup.controls['lastName'].value;
        // tslint:disable-next-line:max-line-length
        this.tenant.dateOfBirth =  (this.editTenantFormGroup.controls['dateOfBirth'].value !== '') ? this.editTenantFormGroup.controls['dateOfBirth'].value : new Date();
        this.tenant.phoneNumber =  this.editTenantFormGroup.controls['phoneNumber'].value;
        this.tenant.employment =  this.editTenantFormGroup.controls['employment'].value;

        this.tenantsService.updateTenant(this.tenant).subscribe(data => {
            this.tenant = data;
        });

        this.editMode = false;
    }

}

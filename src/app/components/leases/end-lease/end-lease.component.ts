import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Lease } from 'src/app/models/lease.model';
import { FormGroup, FormControl } from '@angular/forms';
import { LeaseService } from 'src/app/services/lease.service';

@Component({
  selector: 'app-end-lease',
  templateUrl: './end-lease.component.html',
  styleUrls: ['./end-lease.component.css']
})
export class EndLeaseComponent {

  @Input() lease: Lease = new Lease();
  @Output() previousLeases = new EventEmitter<Lease[]>();
  @Output() noCurrentLeaseMode = new EventEmitter<boolean>();


  endLeaseFormGroup: FormGroup;

  constructor(private leasesService: LeaseService) {
      this.endLeaseFormGroup = new FormGroup({
          endDate : new FormControl()
      });
  }

  endLease(leaseId: number) {
      const endDate = this.endLeaseFormGroup.controls['endDate'].value;
      const patchStatement = [
          {'op': 'replace', 'path': '/endDate', 'value': endDate},
          {'op': 'replace', 'path': '/isCurrent', 'value': 'false'}
      ];
      this.leasesService.patchLease(leaseId, patchStatement).subscribe((leases: any) => {
          this.previousLeases.emit(leases);
          this.noCurrentLeaseMode.emit(true);
      });
  }
}

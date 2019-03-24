import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { RentReview } from 'src/app/models/rent-review.model';
import { Lease } from 'src/app/models/lease.model';
import { FormGroup, FormControl } from '@angular/forms';
import { RentReviewService } from 'src/app/services/rent-review.service';

@Component({
  selector: 'app-rent-review-details-thumbnail',
  templateUrl: './rent-review-details-thumbnail.component.html',
  styleUrls: ['./rent-review-details-thumbnail.component.css']
})
export class RentReviewDetailsThumbnailComponent implements OnChanges {

  @Input() rentReview: RentReview;
  @Input() lease: Lease;

  @Output() editedLease = new EventEmitter<Lease>();



  newReviewMode = false;

  newReviewFormGroup: FormGroup;

  canBeReviewed(): boolean {
      const now = Date.now();
      console.log(new Date(this.lease.nextRentReview.takesEffectOn).valueOf() - now.valueOf());
      if ((new Date(this.lease.nextRentReview.takesEffectOn).valueOf() - now.valueOf()) < 7776000000) {
          return true;
      }
      return false;
  }

  constructor(private rentReviewsService: RentReviewService) {

      this.newReviewFormGroup = new FormGroup({
          takesEffectOn: new FormControl(),
          percent: new FormControl(),
          newRent: new FormControl()
      });
  }

  ngOnChanges() {
      this.newReviewFormGroup.controls['percent'].valueChanges.subscribe(val => {
          this.newReviewFormGroup.controls['newRent'].patchValue(this.lease.rent * (100 + val) / 100 );
      });
  }

  saveReview() {
      const takesEffectOn = this.newReviewFormGroup.controls['takesEffectOn'].value;
      const percent = this.newReviewFormGroup.controls['percent'].value;
      const rentReview: RentReview = new RentReview();
      rentReview.takesEffectOn = takesEffectOn;
      rentReview.percent = percent;

      this.rentReviewsService.createRentReview(rentReview.lease.id, rentReview);
      this.newReviewMode = false;
  }

  executeReview() {
      this.rentReviewsService.executeReview(this.rentReview).subscribe(data => {
          this.editedLease.emit(data);
          this.newReviewMode = false;
      });

  }

}

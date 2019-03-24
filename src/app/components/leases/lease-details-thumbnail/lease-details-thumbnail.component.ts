import { Component, OnInit, Input } from '@angular/core';
import { Lease } from 'src/app/models/lease.model';

@Component({
  selector: 'app-lease-details-thumbnail',
  templateUrl: './lease-details-thumbnail.component.html',
  styleUrls: ['./lease-details-thumbnail.component.css']
})
export class LeaseDetailsThumbnailComponent {

  @Input() lease: Lease = new Lease();

  getLengthOfTenancySoFar(): string {
      const startDate: Date = new Date(this.lease.startDate);
      const currentDate: Date = new Date(Date.now());
      let years = currentDate.getFullYear() - startDate.getFullYear();
      let months = currentDate.getMonth() - startDate.getMonth();

      if (months < 0) {
          months = 12 + months;
          years--;
      }

      return `${years} years and ${months} months`;
  }

  getLeaseEndDate(): Date {
      const startDate: Date = new Date(this.lease.startDate);
      return new Date(startDate.setFullYear(startDate.getFullYear() + 6));
  }

  getNextRentReviewDate(): Date {
      const startDate: Date = new Date(this.lease.startDate);
      const reviewDate: Date = new Date(startDate.setFullYear(startDate.getFullYear() + 2));
      // var nextRentReviewDate: Date = new Date(this.lease.startDate.setFullYear(this.lease.startDate.getFullYear() + 2));
      return reviewDate;
  }

  getServeReviewDate(): Date {
      const reviewDate = this.getNextRentReviewDate();
      return new Date(reviewDate.setUTCMonth(reviewDate.getMonth() - 3));
  }

}

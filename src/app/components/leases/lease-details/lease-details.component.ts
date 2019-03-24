import { Component, OnInit } from '@angular/core';
import { Lease } from 'src/app/models/lease.model';
import { ActivatedRoute } from '@angular/router';
import { RentReview } from 'src/app/models/rent-review.model';
import { Tenant } from 'src/app/models/tenant.model';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-lease-details',
  templateUrl: './lease-details.component.html',
  styleUrls: ['./lease-details.component.css']
})
export class LeaseDetailsComponent implements OnInit {

  lease: Lease = new Lease();

  constructor(private route: ActivatedRoute, private paymentsService: PaymentService) {
      this.route.data.forEach((data) => {
          this.lease = data['lease'];
          if (this.lease.nextRentReview === null) {
              this.lease.nextRentReview = new RentReview();
          }
          console.log(this.lease.id);
      });

  }

  ngOnInit() {

  }

  editTenant(tenant: Tenant) {
      console.log('clicked! ' + tenant.firstName);

  }

  updateLease(lease: Lease) {
      console.log(lease.rent);
      this.lease = lease;
  }


}

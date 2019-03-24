import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { Lease } from 'src/app/models/lease.model';
import { FormGroup, FormControl } from '@angular/forms';
import { Payment } from 'src/app/models/payment.model';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-payments-list',
  templateUrl: './payments-list.component.html',
  styleUrls: ['./payments-list.component.css']
})
export class PaymentsListComponent implements OnInit, OnChanges {
  @Input() lease: Lease = new Lease();

  editRentFormGroup: FormGroup;

  payments: Payment[] = [];
  today: Date;

  months: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];


  private _rentPaidForSelectedYear = 0;
  selectedYear: number;
  selectedPayments: Payment[] = [];
  selectedPayment: Payment = new Payment();

  validYears: number[] = [];
  hasPrevYear = false;
  hasNextYear = false;

  constructor(private paymentsService: PaymentService) {
      this.today = new Date(Date.now());
      const thisYear = this.today.getFullYear();
      const thisMonth = this.today.getMonth();
      this.selectedYear = thisYear;
    }

    get rentFormControl() {return  this.editRentFormGroup.controls.rent; }

    ngOnInit() {
        this.paymentsService.getPaymentsForLease(this.lease.id).subscribe(data => {
            this.payments = data;
            this.selectedPayments = this.filterPaymentsByYear(this.selectedYear);
            this.hasPrevYear = this.checkForPreviousYear(this.selectedYear);
        });

        this.editRentFormGroup = new FormGroup({
            rent: new FormControl(this.lease.rent)
        });
    }

  ngOnChanges(changes: SimpleChanges) {
      this.getValidYears();
      console.log(this.validYears);
  }

  private getValidYears() {
      const thisYear = this.today.getFullYear();

      const startYear = new Date(this.lease.startDate).getFullYear();
      console.log(thisYear + ' ' + startYear);

      this.validYears = new Array<number>((thisYear - startYear) + 1);
      for (let index = 0; index < this.validYears.length; index++) {
          this.validYears[index] = startYear + index;
      }
  }

  private checkForPreviousYear(year: number): boolean {
      return (this.validYears.indexOf(this.selectedYear) > 0);
  }

  private checkForNextYear(year: number): boolean {
      const span = this.validYears.length;
      return (this.validYears.indexOf(year) < (span - 1));
  }

  private filterPaymentsByYear(year: number): Payment[] {
      const payments = this.payments.filter(p => p.year === year);
      for (let index = 1; index <= 12; index++) {
          if (!payments.find(p => p.month === index)) {
              const payment = new Payment();
              payment.month = index;
              payment.amount = 0;
              payments.push(payment);
          }
      }
      payments.sort(this.sortByMonth);
      return payments;
      // return this.payments.filter(p => p.year === year);
  }

  get rentPaidForSelectedYear(): number {
      let total = 0;
      this.selectedPayments.forEach(p => {
          total += p.amount;
      });
      return total;
  }

  prevYear() {
      this.selectedYear--;
      this.hasPrevYear = this.checkForPreviousYear(this.selectedYear);
      this.hasNextYear = this.checkForNextYear(this.selectedYear);
      this.selectedPayments = this.filterPaymentsByYear(this.selectedYear);
  }

  nextYear() {
      this.selectedYear++;
      this.hasNextYear = this.checkForNextYear(this.selectedYear);
      this.hasPrevYear = this.checkForPreviousYear(this.selectedYear);
      this.selectedPayments = this.filterPaymentsByYear(this.selectedYear);
  }

  saveRent() {
      this.selectedPayment.amount = this.editRentFormGroup.controls['rent'].value;
      console.log(this.selectedPayment);
      this.selectedPayment.lease = this.lease;

      if (this.selectedPayment.id === 0) {
          const dateString = `${this.selectedYear}-${this.selectedPayment.month}-1`;
          console.log(dateString);
          this.selectedPayment.date = new Date(dateString);
      }
      this.paymentsService.savePayment(this.selectedPayment).subscribe(data => {
          this.payments = data;
          this.selectedPayments = this.filterPaymentsByYear(this.selectedYear);
          this.hasPrevYear = this.checkForPreviousYear(this.selectedYear);
      });
  }

  private sortByMonth(p1: Payment, p2: Payment): number {
      if (p1.month < p2.month) { return -1; }
      if (p2.month < p1.month) { return 1; }
      return 0;
  }

  selectPayment(payment: Payment) {
      this.selectedPayment = payment;
  }
}

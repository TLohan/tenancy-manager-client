import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';

import { AppComponent } from './components/app/app.component';


import { TenantService } from './services/tenant.service';
import { HouseService } from './services/house.service';
import { FlatService } from './services/flat.service';
import { LeaseService } from './services/lease.service';
import { PaymentService } from './services/payment.service';
import { RentReviewService } from './services/rent-review.service';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { NavmenuComponent } from './components/navmenu/navmenu.component';
import { FlatDetailsComponent } from './components/flats/flat-details/flat-details.component';
import { FlatResolver } from './services/flat-resolver.service';
import { TenantDetailsThumbnailComponent } from './components/tenants/tenant-details-thumbnail/tenant-details-thumbnail.component';
import { CreateLeaseComponent } from './components/leases/create-lease/create-lease.component';
import { CurrentLeasesListComponent } from './components/leases/current-leases-list/current-leases-list.component';
import { EndLeaseComponent } from './components/leases/end-lease/end-lease.component';
import { LeaseDetailsThumbnailComponent } from './components/leases/lease-details-thumbnail/lease-details-thumbnail.component';
import { LeaseDetailsComponent } from './components/leases/lease-details/lease-details.component';
import { NewTenantComponent } from './components/tenants/new-tenant/new-tenant.component';
// tslint:disable-next-line:max-line-length
import { RentReviewDetailsThumbnailComponent } from './components/rent-reviews/rent-review-details-thumbnail/rent-review-details-thumbnail.component';
import { PaymentsListComponent } from './components/payments/payments-list/payments-list.component';
import { LeaseResolverService } from './services/lease-resolver.service';
import { StatsListComponent } from './components/stats/stats-list/stats-list.component';
import { LeaseListThumbnailComponent } from './components/leases/lease-list-thumbnail/lease-list-thumbnail.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavmenuComponent,
    FlatDetailsComponent,
    TenantDetailsThumbnailComponent,
    CreateLeaseComponent,
    CurrentLeasesListComponent,
    EndLeaseComponent,
    LeaseDetailsThumbnailComponent,
    LeaseDetailsComponent,
    NewTenantComponent,
    RentReviewDetailsThumbnailComponent,
    PaymentsListComponent,
    StatsListComponent,
    LeaseListThumbnailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'houses/:houseName/flats/:flatNumber', component: FlatDetailsComponent, resolve: { flat: FlatResolver } },
      { path: 'leases/:id', component: LeaseDetailsComponent, resolve: {lease: LeaseResolverService}},
      { path: 'currentLeases', component: CurrentLeasesListComponent },
      { path: 'stats', component: StatsListComponent },
      { path: '**', redirectTo: 'home' }
    ])
  ],
  providers: [
    HouseService,
    FlatService,
    LeaseService,
    TenantService,
    PaymentService,
    RentReviewService,
    FlatResolver,
    LeaseResolverService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

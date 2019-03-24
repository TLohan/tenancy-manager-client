import { Injectable } from '@angular/core';

import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { LeaseService } from './lease.service';

@Injectable()
export class LeaseResolverService implements Resolve<any> {


    constructor(private leasesService: LeaseService) {}

    resolve(route: ActivatedRouteSnapshot) {
        return this.leasesService.getLease(route.params['id']);
    }
}

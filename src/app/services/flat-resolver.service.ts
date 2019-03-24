import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { FlatService } from './flat.service';

@Injectable()
export class FlatResolver implements Resolve<any> {


    constructor(private flatsService: FlatService) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this.flatsService.getFlat(route.params['houseName'], +route.params['flatNumber']);
    }
}

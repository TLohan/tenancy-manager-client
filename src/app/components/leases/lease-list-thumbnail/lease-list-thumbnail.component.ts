import { Component, OnInit, Input } from '@angular/core';
import { Lease } from 'src/app/models/lease.model';

@Component({
    selector: 'app-lease-list-thumbnail',
    templateUrl: './lease-list-thumbnail.component.html',
    styleUrls: ['./lease-list-thumbnail.component.css']
})
export class LeaseListThumbnailComponent implements OnInit {

    @Input() lease: Lease;
    @Input() rowNumber: number;

    constructor() { }

    ngOnInit() {
    }

    isOdd(): boolean {
        return (this.rowNumber % 2) === 0;
    }

}

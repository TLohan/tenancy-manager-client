import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-navmenu',
  templateUrl: './navmenu.component.html',
  styleUrls: ['./navmenu.component.css']
})
export class NavmenuComponent implements OnInit {

    @Input() profile: any;

    constructor() { }

    ngOnInit() {
    }

    closeMenu() {
        const menu = <HTMLElement>document.querySelector('.navbar-toggler');
        menu.click();
    }

}

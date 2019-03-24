import { Component } from '@angular/core';
import { HouseService } from 'src/app/services/house.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tenancy-manager-client';

  constructor(private houseService: HouseService) {
    this.houseService.getHouses().subscribe(data => {
      console.log('hello');
    });
  }
}

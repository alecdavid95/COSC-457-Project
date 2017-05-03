import { Component } from '@angular/core';
import { QueryService } from './query.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  result;

  constructor(qs: QueryService) {
    //The QueryService makes an HTTP request to the api, 
    //and we subscribe this.result to the observable result that comes in
    this.result = qs.dummyGet().subscribe(result => {
      this.result = result;
    });
  }
}

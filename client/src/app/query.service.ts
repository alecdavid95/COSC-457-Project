import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class QueryService {

  constructor(private http: Http) { }

  dummyGet() {
    return this.http.get('/api/dummy')
      .map(res => res.json());
  }
}
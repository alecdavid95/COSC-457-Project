import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map'
import {serviceInterface} from '../services/serviceInterface';

@Injectable()
export class EmployeeService implements serviceInterface {
  constructor(private http: Http) {
  }
  get() {
        var result = [];
        var count = 0;
        this.http.get('/api/employee')
            .map(res => res.json()).subscribe(response => {
            for (let temp of response) {
                result[count] = {employeeID: temp[0].value, position: temp[1].value, phone: temp[2].value, fname: temp[3].value,
                    lname: temp[4].value, minit: temp[5].value, zip: temp[6].value, 
					state: temp[7].value, city: temp[8].value, street: temp[9].value};
                count++;
            }
        });
        return result;
    }
  create(record) {
    return this.http.get('/api/employee', record)
        .map(res => res.json());
  }
  remove(id) {
    return this.http.delete('/api/employee/' + id)
        .map(res => res.json());
  }
  update(record) {
    return this.http.put('/api/employee', record)
        .map(res => res.json());
  }

}
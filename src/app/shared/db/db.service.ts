import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';
import { Observable } from 'rxjs';
import { CustomerEntity } from 'src/app/app-state/entities/customer.entity';

@Injectable({
  providedIn: 'root'
})
export class DbService implements InMemoryDbService {

  constructor() { }
  createDb(reqInfo?: RequestInfo): {} | Observable<{}> | Promise<{}> {
    const customer: Array<CustomerEntity> = new Array();

    for(let i = 0 ; i< 25 ; i++) {
      customer.push({
        id: i + 1,
        firstName: 'Matan ' + (i + 1),
        lastName: 'Huja ' + (i + 1),
        address: 'Rishon Lezion',
        age: 33
      })
    }

    return { customer };
  }


  genId(customers: CustomerEntity[]): number {
    return customers.length > 0 ? Math.max(...customers.map(customer => customer.id)) + 1 : 11;
}
}

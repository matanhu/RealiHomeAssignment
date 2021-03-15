import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CustomerEntity } from '../app-state/entities/customer.entity';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private baseUrl = 'api/customer';
  constructor(
    private httpClient: HttpClient
  ) { }

  public fetchCustomers() {
    return this.httpClient.get<Array<CustomerEntity>>(`${this.baseUrl}`);
  }

  public createCustomer(customer: CustomerEntity): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}`, customer);
  }

  public editCustomer(customer: CustomerEntity): Observable<any> {
    return this.httpClient.put(`${this.baseUrl}`, customer);
  }

  public deleteCustomer(customerID: number): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/${customerID}`);
  }
}

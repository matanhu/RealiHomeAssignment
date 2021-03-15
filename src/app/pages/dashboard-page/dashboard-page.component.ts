import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CustomerEntity } from 'src/app/app-state/entities/customer.entity';
import { getCustomers } from 'src/app/app-state/selectors';

import * as Actions from '../../app-state/actions';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {

  public customerList = new Observable<Array<CustomerEntity>>();
  constructor(
    private readonly store: Store,
  ) { }

  ngOnInit(): void {
    // this.store.dispatch(Actions.fetchCustomers());
    this.customerList = this.store.select(state => getCustomers(state));
  }

  onDelete(customer: CustomerEntity): void {
    this.store.dispatch(Actions.deleteCustomer({customerID: customer.id}));
  }

}

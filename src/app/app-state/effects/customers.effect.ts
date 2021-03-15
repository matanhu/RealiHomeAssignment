/*
Listen to Action of NGRX and do Side Effects
*/
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CustomerService } from "src/app/services/customer.service";
import { map, exhaustMap, catchError, switchMap } from 'rxjs/operators';


import * as customerActions from '../actions';
import { of } from "rxjs";



@Injectable()
export class CustomerEffects {

	constructor(
		private actions$: Actions,
		private customerService: CustomerService
	) { }


	/*
			Side Effect of fetchCustomers action
			Load data from server,
			On Success dispatch fetchCustomersSuccess action
			On Failure dispatch fetchCustomersError action
		*/
	fetchCustomers$ = createEffect(() =>
		this.actions$.pipe(
			ofType(customerActions.fetchCustomers),
			switchMap((action) => this.customerService.fetchCustomers().pipe(
				map(res => customerActions.fetchCustomersSuccess({ customers: res }),
					catchError((error: any) => of(customerActions.fetchCustomersError({ error: 'Fetch customers error' }))))
			)
			)
		));


	/*
			Side Effect of createCustomer action
			Load data from server,
			On Success dispatch createCustomerSuccess action
			On Failure dispatch createCustomerError action
		*/
	createCustomer$ = createEffect(() =>
		this.actions$.pipe(
			ofType(customerActions.createCustomer),
			switchMap((action) => this.customerService.createCustomer(action.customer).pipe(
				map(res => customerActions.createCustomerSuccess({ customer: action.customer }),
					catchError((error: any) => of(customerActions.createCustomerError({ error: 'Create customer error' }))))
			)
			)
		));

	/*
			Side Effect of editCustomer action
			Load data from server,
			On Success dispatch editCustomerSuccess action
			On Failure dispatch editCustomerError action
		*/
	editCustomer$ = createEffect(() =>
		this.actions$.pipe(
			ofType(customerActions.editCustomer),
			exhaustMap((action) => this.customerService.editCustomer(action.customer).pipe(
				map(res => customerActions.editCustomerSuccess({ update: { id: action.customer.id, changes: action.customer } })),
				catchError((error: any) => {
					console.log(error);
					
					return of(customerActions.editCustomerError({ error: 'Delete customer error' }));
				})
			))
		));

	/*
		Side Effect of deleteCustomer action
		Load data from server,
		On Success dispatch deleteCustomerSuccess action
		On Failure dispatch deleteCustomerError action
	*/
	deleteCustomer$ = createEffect(() =>
		this.actions$.pipe(
			ofType(customerActions.deleteCustomer),
			exhaustMap((action) => this.customerService.deleteCustomer(action.customerID).pipe(
				map(res => customerActions.deleteCustomerSuccess({ customerID: action.customerID })),
				catchError((error: any) => {
					return of(customerActions.deleteCustomerError({ error: 'Delete customer error' }))
				})
			))
		));
}
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import {
  Action,
  createReducer,
  on
} from '@ngrx/store';
import { CustomerEntity } from '../entities/customer.entity';
import * as customerActions from '../actions';


export interface CustomersState extends EntityState<CustomerEntity> {
  isLoading: boolean;
  errorMessage: string;
}

export function selectCustomerId(customer: CustomerEntity): number {
  return customer.id;
}

export const customersAdapter: EntityAdapter<CustomerEntity> = createEntityAdapter<CustomerEntity>({
  selectId: selectCustomerId,
});

export const initialState: CustomersState = customersAdapter.getInitialState({
  isLoading: false,
  errorMessage: ''
});

export function reducer(state: CustomersState | undefined, action: Action): any {
  return customerReducer(state, action);
}

const customerReducer = createReducer(
  initialState,

  on(customerActions.fetchCustomers, (state) => {
    return { ...state, isLoading: true }
  }),
  on(customerActions.fetchCustomersSuccess, (state, { customers }) => {
    return customersAdapter.addMany(
      customers,
      { ...state, isLoading: false }
    );
  }),
  on(customerActions.fetchCustomersError, (state, { error }) => {
    return { ...state, isLoading: false, errorMessage: error }
  }),

  on(customerActions.createCustomer, (state) => {
    return { ...state, isLoading: true }
  }),
  on(customerActions.createCustomerSuccess, (state, { customer }) => {
    return customersAdapter.addOne(
      customer,
      { ...state, isLoading: false }
    );
  }),
  on(customerActions.createCustomerError, (state, { error }) => {
    return { ...state, isLoading: false, errorMessage: error }
  }),

  on(customerActions.editCustomer, (state) => {
    return { ...state, isLoading: true }
  }),
  on(customerActions.editCustomerSuccess, (state, { update }) => {
    return customersAdapter.updateOne(
      update,
      { ...state, isLoading: false }
    );
  }),
  on(customerActions.editCustomerError, (state, { error }) => {
    return { ...state, isLoading: true, errorMessage: error }
  }),

  on(customerActions.deleteCustomer, (state) => {
    return { ...state, isLoading: true }
  }),
  on(customerActions.deleteCustomerSuccess, (state, { customerID }) => {
    return customersAdapter.removeOne(
      customerID,
      { ...state, isLoading: false }
    );
  }),
  on(customerActions.deleteCustomerError, (state, { error }) => {
    return { ...state, isLoading: true, errorMessage: error }
  }),
);

// get the selectors
export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = customersAdapter.getSelectors();
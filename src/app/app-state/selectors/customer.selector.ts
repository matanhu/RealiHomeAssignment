import { Dictionary } from "@ngrx/entity";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CustomerEntity } from "../entities/customer.entity";

import * as fromCustomer from '../reducers/customers.reducer';


export const getCustomersState = createFeatureSelector<fromCustomer.CustomersState>('customers');

export const getCustomers = createSelector(
    getCustomersState,
    fromCustomer.selectAll
);

export const getCustomersEntities = createSelector(
    getCustomersState,
    fromCustomer.selectEntities
);

// Select Customer by id from NGRX Entiry 
export const getCustomer = createSelector(
    getCustomersEntities,
    (entities: Dictionary<CustomerEntity>, props: {id: string}) => {
        return entities[props.id];
    }
);
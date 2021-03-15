import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import * as fromCustomer from './reducers/customers.reducer';

export interface State {
    customers: fromCustomer.CustomersState;
}

export const reducers: ActionReducerMap<State> = {
    customers: fromCustomer.reducer,
};

// On Debug log each action to console and current state before create reducer
export function debug(reducer: ActionReducer<State>): ActionReducer<State> {
    return function (state, action) {
        console.log('state', state);
        console.log('action', action);

        return reducer(state, action);
    };
}

export const metaReducers: MetaReducer<State>[] = !environment.production ? [debug] : [];



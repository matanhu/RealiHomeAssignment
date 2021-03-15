import { Update } from "@ngrx/entity";
import { createAction, props } from "@ngrx/store";
import { CustomerEntity } from "../entities/customer.entity";

const FETCH_CUSTOMERS = '[CUSTOMER] Fetch Customers';
const FETCH_CUSTOMERS_SUCCESS = '[CUSTOMER] Fetch Customers Success';
const FETCH_CUSTOMERS_ERROR = '[CUSTOMER] Fetch Customers Error';

const CREATE_CUSTOMER = '[CUSTOMER] Create Customer';
const CREATE_CUSTOMER_SUCCESS = '[CUSTOMER] Create Customer Success';
const CREATE_CUSTOMER_ERROR = '[CUSTOMER] Create Customer Error';

const EDIT_CUSTOMER = '[CUSTOMER] Edit Customer';
const EDIT_CUSTOMER_SUCCESS = '[CUSTOMER] Edit Customer Success';
const EDIT_CUSTOMER_ERROR = '[CUSTOMER] Edit Customer Error';

const DELETE_CUSTOMER = '[CUSTOMER] Delete Customer';
const DELETE_CUSTOMER_SUCCESS = '[CUSTOMER] Delete Customer Success';
const DELETE_CUSTOMER_ERROR = '[CUSTOMER] Delete Customer Error';


export const fetchCustomers = createAction(
    FETCH_CUSTOMERS,
);
export const fetchCustomersSuccess = createAction(
    FETCH_CUSTOMERS_SUCCESS,
    props<{customers: Array<CustomerEntity>}>()
);
export const fetchCustomersError = createAction(
    FETCH_CUSTOMERS_ERROR,
    props<{error: string}>()
);


export const createCustomer = createAction(
    CREATE_CUSTOMER,
    props<{customer: CustomerEntity}>()
);
export const createCustomerSuccess = createAction(
    CREATE_CUSTOMER_SUCCESS,
    props<{customer: CustomerEntity}>()
);
export const createCustomerError = createAction(
    CREATE_CUSTOMER_ERROR,
    props<{error: string}>()
);


export const editCustomer = createAction(
    EDIT_CUSTOMER,
    props<{customer: CustomerEntity}>()
);
export const editCustomerSuccess = createAction(
    EDIT_CUSTOMER_SUCCESS,
    props<{update: Update<CustomerEntity>}>()
);
export const editCustomerError = createAction(
    EDIT_CUSTOMER_ERROR,
    props<{error: string}>()
);

export const deleteCustomer = createAction(
    DELETE_CUSTOMER,
    props<{customerID: number}>()
);
export const deleteCustomerSuccess = createAction(
    DELETE_CUSTOMER_SUCCESS,
    props<{customerID: number}>()
);
export const deleteCustomerError = createAction(
    DELETE_CUSTOMER_ERROR,
    props<{error: string}>()
);
import {
  customerList
} from './api-customer';

export const ADD_CUSTOMERS = 'ADD_CUSTOMERS';


export function addCustomers(customers) {
  return {
    type: ADD_CUSTOMERS,
    customers,
  };
}

export function fetchCustomers() {
  return (dispatch) => {
    return customerList().then(res => {
      dispatch(addCustomers(res));
    });
  };
}

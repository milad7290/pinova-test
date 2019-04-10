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

export function fetchCustomers(value) {
  return (dispatch) => {
    return customerList(value).then(res => {
      // if (res.err) {
      //   dispatch( setError(true))
      // }
      dispatch(addCustomers(res.customers));
    });
  };
}

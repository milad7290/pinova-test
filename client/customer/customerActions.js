import { customerList } from "./api-customer";

export const ADD_CUSTOMERS = "ADD_CUSTOMERS";
export const UPDSTE_AUTO = "UPDSTE_AUTO";

export function addCustomers(customers) {
  return {
    type: ADD_CUSTOMERS,
    customers
  };
}

export function fetchCustomers(value) {
  return dispatch => {
    return customerList(value).then(res => {
      dispatch(addCustomers(res.customers));
    });
  };
}

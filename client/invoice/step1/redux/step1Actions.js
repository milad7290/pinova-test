import { getNextInvoiceNumber } from "../../api-invoice";
export const UPDATE_STEP1_CUSTOMER = "UPDATE_STEP1_CUSTOMER";
export const UPDATE_STEP1_CUSTOMER_ID = "UPDATE_STEP1_CUSTOMER_ID";
export const UPDATE_STEP1_ORDER = "UPDATE_STEP1_ORDER";
export const UPDATE_STEP1_ROWS_ADD = "UPDATE_STEP1_ROWS_ADD";
export const UPDATE_STEP1_ROWS_REMOVE = "UPDATE_STEP1_ROWS_REMOVE";
export const UPDATE_STEP1_ROWS_UPDATE = "UPDATE_STEP1_ROWS_UPDATE";
export const RESET_STEP1 = "RESET_STEP1";
export const SET_STEPPER_STEP = "SET_STEPPER_STEP";
export const SET_SELECTED_PRODUCT = "SET_SELECTED_PRODUCT";

export function updateCustomer(invoiceCustomer) {
  return {
    type: UPDATE_STEP1_CUSTOMER,
    invoiceCustomer
  };
}

export function updateCustomerId(invoiceCustomerId, lable) {
  return {
    type: UPDATE_STEP1_CUSTOMER_ID,
    invoiceCustomerId,
    lable
  };
}

export function updateRow(invoiceRows) {
  return {
    type: UPDATE_STEP1_ROWS_UPDATE,
    invoiceRows
  };
}

export function setNextInvoiceNumber(invoiceNumber) {
  return {
    type: UPDATE_STEP1_ORDER,
    invoiceNumber
  };
}

export function resetStep1() {
  return {
    type: RESET_STEP1
  };
}

export function fetchNextInvoiceNumber() {
  return dispatch => {
    return getNextInvoiceNumber().then(res => {
      dispatch(setNextInvoiceNumber(res.order.toString()));
    });
  };
}


export function setSelectedProduct(selectedProduct) {
  return {
    type: SET_SELECTED_PRODUCT,
    selectedProduct
  };
}

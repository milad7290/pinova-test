import {
  UPDATE_STEP1_CUSTOMER,
  UPDATE_STEP1_CUSTOMER_ID,
  UPDATE_STEP1_ROWS_UPDATE,
  UPDATE_STEP1_ORDER,
  RESET_STEP1
} from './step1Actions';
const initialState = {
  invoiceRows: [],
  invoiceCustomer:'',
  invoiceCustomerId:'',
  invoiceNumber:'',
  lable:''
};
const Step1Reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_STEP1_CUSTOMER:
      return {...state,invoiceCustomer:action.invoiceCustomer};
    case UPDATE_STEP1_CUSTOMER_ID:
      return {...state,invoiceCustomerId:action.invoiceCustomerId,lable:action.lable};
    case UPDATE_STEP1_ROWS_UPDATE:
      return {...state,invoiceRows:[...action.invoiceRows]};
    case UPDATE_STEP1_ORDER:
      return {...state,invoiceNumber:action.invoiceNumber};
     case RESET_STEP1:
      return initialState;
      default:
      return state;
  }
};

export const getRows = (state) => {
  return state.step1.invoiceRows
};
export const getCustomer = state => {
  return state.step1.invoiceCustomer
}
export const getCustomerId = state => {
  return {invoiceCustomerId:state.step1.invoiceCustomerId,lable:state.step1.lable}
}
export const getInvoiceNumber = state => {
  return state.step1.invoiceNumber
}
export default Step1Reducer;
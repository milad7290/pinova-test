import {
  ADD_INVOICES,
  ADD_INVOICES_CONCAT,
  ADD_INVOICE,
  SET_LOADING,
  SET_SAVING
} from './invoiceActions';

const initialState = {
  data: [],
  isLoading:false,
  isSaved:false
};
const InvoiceReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INVOICE:
      return {...state,data:[...state.data,action.invoice]};
    case ADD_INVOICES:
      return {...state,data:action.invoices};
    case ADD_INVOICES_CONCAT:
      return {...state,data:[...state.data,action.invoices]};
      case SET_LOADING :
      return {...state,isLoading:action.isLoading};
      case SET_SAVING :
      return {...state,isSaved:action.isSaved};
      default:
      return state;
  }
};

export const getInvoices = (state) => {
  return state.invoices.data
};
export const getLoading = (state) => {
  return state.invoices.isLoading
};
export const getSaved = (state) => {
  console.log('getSaved',state);
  return state.invoices.isSaved
};
export const getInvoice = (state, cuid) => state.invoices.data.filter(invoice => invoice._id === cuid)[0];

export default InvoiceReducer;
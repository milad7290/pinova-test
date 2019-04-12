import {invoiceListWithFilter,create} from './api-invoice'

export const ADD_INVOICE = 'ADD_INVOICE';
export const ADD_INVOICES = 'ADD_INVOICES';
export const SET_LOADING = 'SET_LOADING';
export const ADD_INVOICES_CONCAT = 'ADD_INVOICES_CONCAT';
export const SET_SAVING = 'SET_SAVING';

export function addInvoice(invoice) {
  return {
    type: ADD_INVOICE,
    invoice,
  };
}
export function setLoading(isLoading=false) {
  return {
    type: SET_LOADING,
    isLoading,
  };
}
export function setSaved(isSaved=false) {
  return {
    type: SET_SAVING,
    isSaved,
  };
}
export function addInvoiceRequest(invoice) {
  return (dispatch) => {
    dispatch( setLoading(true))
    return create(invoice)
    .then(res => 
      {
        dispatch(setLoading(false))
        dispatch(setSaved(true))
       return( dispatch(addInvoice(res.addedInvoice))
       )});
  };
}

export function addInvoices(invoices,page) {
  return (page===0)?
  {
    type: ADD_INVOICES,
    invoices,
  }:{
    type: ADD_INVOICES_CONCAT,
    invoices,
  };
}

export function fetchInvoices(params) {
  return (dispatch) => {
    return invoiceListWithFilter(params).then(res => {
      dispatch(addInvoices(res.invoices,params.page));
    });
  };
}
import { invoiceListWithFilter, create } from "../api-invoice";
import { resetStep1 } from "../step1/redux/step1Actions";
import { resetStep2 } from "../step2/redux/step2Actions";
export const ADD_INVOICE = "ADD_INVOICE";
export const ADD_INVOICES = "ADD_INVOICES";
export const SET_LOADING_INVOICE = "SET_LOADING_INVOICE";
export const ADD_INVOICES_CONCAT = "ADD_INVOICES_CONCAT";
export const SET_SAVING = "SET_SAVING";
export const SET_FROM_DATE = "SET_FROM_DATE";
export const SET_TO_DATE = "SET_TO_DATE";
export const SET_FACTOR_TYPE = "SET_FACTOR_TYPE";
export const OPEN_CLOSE_REPORT_DRWER = "OPEN_CLOSE_REPORT_DRWER";
export const SET_REPORT_PAGE = "SET_REPORT_PAGE";

export function addInvoice(invoice) {
  return {
    type: ADD_INVOICE,
    invoice
  };
}

export function setLoading(isLoading = false) {
  return {
    type: SET_LOADING_INVOICE,
    isLoading
  };
}

export function setSaved(isSaved = false) {
  return {
    type: SET_SAVING,
    isSaved
  };
}


export function addInvoiceRequest(invoice) {
  return dispatch => {
    dispatch(setLoading(true));
    return create(invoice).then(res => {
      dispatch(setLoading(false));
      dispatch(setSaved(true));
      dispatch(resetStep1());
      dispatch(resetStep2());
      return dispatch(addInvoice(res.addedInvoice));
    });
  };
}

export function addInvoices(invoices, page) {
  return page === 0
    ? {
        type: ADD_INVOICES,
        invoices
      }
    : {
        type: ADD_INVOICES_CONCAT,
        invoices
      };
}

export function setDate(date, typeDate) {
  switch (typeDate) {
    case "fromDate":
      return {
        type: SET_FROM_DATE,
        date
      };
    case "toDate":
      return {
        type: SET_TO_DATE,
        date
      };
    default:
      break;
  }
}

export function fetchInvoices(params) {
  return dispatch => {
    return invoiceListWithFilter(params).then(res => {
      dispatch(addInvoices(res.invoices, params.page));
    });
  };
}

export function setFilterType(filterType) {
  return {
    type: SET_FACTOR_TYPE,
    filterType
  };
}

export function setReportDrwer() {
  return {
    type: OPEN_CLOSE_REPORT_DRWER
  };
}

export function setReportPage(pageNumber) {
  return {
    type: SET_REPORT_PAGE,
    pageNumber
  };
}

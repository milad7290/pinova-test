import {
  ADD_INVOICES,
  ADD_INVOICES_CONCAT,
  ADD_INVOICE,
  SET_LOADING_INVOICE,
  SET_SAVING,
  SET_TO_DATE,
  SET_FROM_DATE,
  SET_FACTOR_TYPE,
  OPEN_CLOSE_REPORT_DRWER,
  SET_REPORT_PAGE
} from "./invoiceActions";

const initialState = {
  data: [],
  isLoading: false,
  isSaved: false,
  fromDate: new Date().setFullYear(2019, 2),
  toDate: new Date(),
  filterType: "factorItems",
  filterTypeSearch: "factorItems",
  reportDrwerOpen: false,
  reportPageNumber: 0
};

const InvoiceReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INVOICE:
      return { ...state, data: [...state.data, action.invoice] };
    case ADD_INVOICES:
      return { ...state, data: action.invoices };
    case ADD_INVOICES_CONCAT:
      return { ...state, data: [...state.data.concat(action.invoices)] };
    case SET_LOADING_INVOICE:
      return { ...state, isLoading: action.isLoading };
    case SET_SAVING:
      return { ...state, isSaved: action.isSaved };
    case SET_FROM_DATE:
      return { ...state, fromDate: action.date };
    case SET_TO_DATE:
      return { ...state, toDate: action.date };
    case SET_FACTOR_TYPE:
      return { ...state, filterType: action.filterType };
    case OPEN_CLOSE_REPORT_DRWER:
      return { ...state, reportDrwerOpen: !state.reportDrwerOpen };
    case SET_REPORT_PAGE:
      return {
        ...state,
        reportPageNumber: action.pageNumber,
        filterTypeSearch:
          action.pageNumber === 0 ? state.filterType : state.filterTypeSearch
      };
    default:
      return state;
  }
};

export const getInvoices = state => {
  return state.invoices.data;
};

export const getLoading = state => {
  return state.invoices.isLoading;
};

export const getSaved = state => {
  return state.invoices.isSaved;
};

export const getFromDate = state => {
  return state.invoices.fromDate;
};

export const getToDate = state => {
  return state.invoices.toDate;
};

export const getFilterType = state => {
  return state.invoices.filterType;
};

export const getFilterTypeSearch = state => {
  return state.invoices.filterTypeSearch;
};

export const getDrwerStatus = state => {
  return state.invoices.reportDrwerOpen;
};

export const getReportPage = state => {
  return state.invoices.reportPageNumber;
};

export default InvoiceReducer;


export const getInvoices = state => {
  return state.invoices.data;
};

export const getInvoiceLoading = state => {
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


export const getRows = state => {
  return state.step1.invoiceRows;
};

export const getCustomer = state => {
  return state.step1.invoiceCustomer;
};

export const getCustomerId = state => {
  return {
    invoiceCustomerId: state.step1.invoiceCustomerId,
    lable: state.step1.lable
  };
};

export const getInvoiceNumber = state => {
  return state.step1.invoiceNumber;
};

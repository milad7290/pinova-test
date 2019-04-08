import {
  ADD_INVOICES,
  ADD_INVOICES_CONCAT,
  ADD_INVOICE
} from './invoiceActions';

const initialState = {
  data: []
};
const InvoiceReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INVOICE:
      return Object.assign({}, {
        data: [action.invoice, ...state.data]
      });
    case ADD_INVOICES:
      return {
        data: action.invoices,
      };
    case ADD_INVOICES_CONCAT:
      return Object.assign({}, {
        data: state.data.concat(action.invoices)
      });
    default:
      return state;
  }
};

export const getInvoices = (state) => {
  return state.invoices.data
};

export const getInvoice = (state, cuid) => state.invoices.data.filter(invoice => invoice._id === cuid)[0];

export default InvoiceReducer;
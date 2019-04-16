import {
  UPDATE_STEP1_CUSTOMER,
  UPDATE_STEP1_CUSTOMER_ID,
  UPDATE_STEP1_ROWS_UPDATE,
  UPDATE_STEP1_ORDER,
  RESET_STEP1,
} from "./step1Actions";
const initialState = {
  invoiceRows: [],
  invoiceCustomer: "",
  invoiceCustomerId: "",
  invoiceNumber: "",
  lable: "",
};
const Step1Reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_STEP1_CUSTOMER:
      return { ...state, invoiceCustomer: action.invoiceCustomer };
    case UPDATE_STEP1_CUSTOMER_ID:
      return {
        ...state,
        invoiceCustomerId: action.invoiceCustomerId,
        lable: action.lable
      };
    case UPDATE_STEP1_ROWS_UPDATE:
      return { ...state, invoiceRows: [...action.invoiceRows] };
    case UPDATE_STEP1_ORDER:
      return { ...state, invoiceNumber: action.invoiceNumber };
    case RESET_STEP1:
      return initialState;
    default:
      return state;
  }
};

export default Step1Reducer;

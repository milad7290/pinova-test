import { combineReducers } from "redux";

import invoices from "../invoice/redux/invoiceReducer";
import customers from "../customer/redux/customerReducer";
import products from "../product/redux/productReducer";
import step1 from "../invoice/step1/redux/step1Reducer";
import step2 from "../invoice/step2/redux/step2Reducer";
import helper from "../helper/redux/helperReducer";

export default combineReducers({
  products,
  customers,
  invoices,
  step1,
  step2,
  helper
});

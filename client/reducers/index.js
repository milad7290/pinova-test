
import { combineReducers } from 'redux';


import invoices from '../invoice/invoiceReducer';
import customers from '../customer/customerReducer';
import products from '../product/productReducer';
import step1 from '../invoice/step1/step1Reducer';
import step2 from '../invoice/step2/step2Reducer';
import helper from '../helper/helperReducer';


export default combineReducers({
  products,
  customers,
  invoices,
  step1,
  step2,
  helper
});

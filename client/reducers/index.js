/**
 * Root Reducer
 */
import { combineReducers } from 'redux';

// Import Reducers
// import app from './modules/App/AppReducer';
import invoices from '../invoice/invoiceReducer';
import customers from '../customer/customerReducer';
import products from '../product/productReducer';

// Combine all reducers into one root reducer
export default combineReducers({
  products,
  customers,
  invoices
});

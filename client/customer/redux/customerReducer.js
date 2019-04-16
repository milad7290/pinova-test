import { ADD_CUSTOMERS, UPDSTE_AUTO } from "./customerActions";

const initialState = { data: [] };

const CustomerReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CUSTOMERS:
      return { ...state, data: action.customers };
    default:
      return state;
  }
};

export default CustomerReducer;

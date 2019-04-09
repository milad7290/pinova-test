import { ADD_CUSTOMERS } from './customerActions';

const initialState = { data: [] };

const CustomerReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CUSTOMERS :
    return {
      data: action.customers,
      // isLoading:false
    };
    default:
      return state;
  }
};

export const getCustomers = state => 
{
 return state.customers.data
};

// export const getCustomer = (state, cuid) => state.customers.data.filter(customer => customer._id === cuid)[0];

export default CustomerReducer;

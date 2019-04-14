import { 
  ADD_PRODUCTS,
   ADD_PRODUCT,
   SET_LOADING,
   SET_NAME,
   SET_PRICE,
   SET_QUANTITY
  } from './productActions';

const initialState = 
{ data: [] ,
  isLoading:false,
  name: '',
  quantity: '',
  price: '',
};
const ProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCT :   
      return {...state,data:[...state.data,action.product]};
    case SET_LOADING :
      return {...state,isLoading:action.isLoading};
    case SET_NAME :
      return {...state,name:action.name};
    case SET_QUANTITY :
      return {...state,quantity:action.quantity};
    case SET_PRICE :
      return {...state,price:action.price};
    case ADD_PRODUCTS :
      return {...state,data:[...action.products]};

    default:
      return state;
  }
};

export const getProducts = state => { 
  return(state.products.data); 
};

export const getLoading = state =>{
  return(state.products.isLoading); 
  };
export const getName = state =>{
    return(state.products.name); 
  };
export const getQuantity = state =>{
    return(state.products.quantity); 
};
export const getPrice = state =>{
    return(state.products.price); 
};

export const getProduct = (state, cuid) => state.products.data.filter(product => product._id === cuid)[0];

export default ProductReducer;

import { ADD_PRODUCTS ,ADD_PRODUCT,SET_LOADING} from './productActions';

const initialState = { data: [] ,isLoading:false};
const ProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCT :
        return Object.assign({}, {data: [action.product, ...state.data],isLoading:false});      
    case SET_LOADING :
    return {
        data: state.data,
        isLoading: action.isLoading,
    }; 
    case ADD_PRODUCTS :
      return {
        data: action.products,
        isLoading: false,

      };

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

export const getProduct = (state, cuid) => state.products.data.filter(product => product._id === cuid)[0];

export default ProductReducer;

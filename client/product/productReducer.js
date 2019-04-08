import { ADD_PRODUCTS ,ADD_PRODUCT} from './productActions';

const initialState = { data: [] };
const ProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCT :
        return Object.assign({}, {data: [action.product, ...state.data]});        
    case ADD_PRODUCTS :
      return {
        data: action.products,
      };

    default:
      return state;
  }
};

export const getProducts = state => state.products.data;

export const getProduct = (state, cuid) => state.products.data.filter(product => product._id === cuid)[0];

export default ProductReducer;

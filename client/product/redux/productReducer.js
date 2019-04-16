import {
  ADD_PRODUCTS,
  ADD_PRODUCT,
  SET_LOADING,

} from "./productActions";

const initialState = {
  data: [],
  isLoading: false,
};

const ProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCT:
      return { ...state, data: [...state.data, action.product] };
    case SET_LOADING:
      return { ...state, isLoading: action.isLoading };
    case ADD_PRODUCTS:
      return { ...state, data: [...action.products] };
    default:
      return state;
  }
};

export default ProductReducer;

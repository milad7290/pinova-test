import {
  ADD_PRODUCT_OPEN,
  ADD_PRODUCT_CLOSE,
  ADD_PRODUCTS,
  ADD_PRODUCT,
  SET_LOADING,
  SET_NAME,
  SET_PRICE,
  SET_QUANTITY,
  SET_PRISTAN_FALSE
} from "./productActions";

const initialState = {
  open: false,
  data: [],
  isLoading: false,
  name: "",
  quantity: "",
  price: "",
  nameStatus: true,
  quantityStatus: true,
  priceStatus: true
};

const ProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCT_OPEN:
      return { ...state, open: true };
    case ADD_PRODUCT_CLOSE:
      return { ...state, open: false };
    case ADD_PRODUCT:
      return { ...state, data: [...state.data, action.product] };
    case SET_LOADING:
      return { ...state, isLoading: action.isLoading };
    case SET_NAME:
      return {
        ...state,
        name: action.name,
        nameStatus: false,
        quantityStatus: true,
        priceStatus: true
      };
    case SET_QUANTITY:
      return {
        ...state,
        quantity: action.quantity,
        quantityStatus: false,
        nameStatus: true,
        priceStatus: true
      };
    case SET_PRICE:
      return {
        ...state,
        price: action.price,
        priceStatus: false,
        nameStatus: true,
        quantityStatus: true
      };
    case ADD_PRODUCTS:
      return { ...state, data: [...action.products] };
    case SET_PRISTAN_FALSE:
      return {
        ...state,
        nameStatus: false,
        quantityStatus: false,
        priceStatus: false
      };
    default:
      return state;
  }
};

export const getOpenOrClose = state => {
  return state.products.open;
};

export const getProducts = state => {
  return state.products.data;
};

export const getLoading = state => {
  return state.products.isLoading;
};

export const getName = state => {
  return state.products.name;
};

export const getQuantity = state => {
  return state.products.quantity;
};

export const getPrice = state => {
  return state.products.price;
};

export const getPristainStatus = state => {
  return {
    name: state.products.nameStatus,
    quantity: state.products.quantityStatus,
    price: state.products.priceStatus
  };
};

export const getProduct = (state, cuid) =>
  state.products.data.filter(product => product._id === cuid)[0];

export default ProductReducer;

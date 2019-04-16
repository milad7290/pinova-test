import { productList, create } from "../api-product";

export const ADD_PRODUCT = "ADD_PRODUCT";
export const SET_LOADING = "SET_LOADING";
export const ADD_PRODUCTS = "ADD_PRODUCTS";
export const SET_NAME = "SET_NAME";
export const SET_QUANTITY = "SET_QUANTITY";
export const SET_PRICE = "SET_PRICE";
export const SET_PRISTAN_FALSE = "SET_PRISTAN_FALSE";
export const ADD_PRODUCT_OPEN = "ADD_PRODUCT_OPEN";
export const ADD_PRODUCT_CLOSE = "ADD_PRODUCT_CLOSE";

export function addProduct(product) {
  return {
    type: ADD_PRODUCT,
    product
  };
}

export function setLoading(isLoading = false) {
  return {
    type: SET_LOADING,
    isLoading
  };
}

export function setValue(value, type) {
  switch (type) {
    case "name":
      return {
        type: SET_NAME,
        value
      };
    case "quantity":
      return {
        type: SET_QUANTITY,
        value
      };
    case "price":
      return {
        type: SET_PRICE,
        value
      };
    default:
      break;
  }
}

export function addProductRequest(product) {
  return dispatch => {
    dispatch(setLoading(true));
    return create(product).then(res => {
      dispatch(setLoading(false));
      return dispatch(addProduct(res.addedProduct));
    });
  };
}

export function addProducts(products) {
  return {
    type: ADD_PRODUCTS,
    products
  };
}

export function fetchProducts() {
  return dispatch => {
    return productList().then(res => {
      dispatch(addProducts(res.products));
    });
  };
}

export function setPristanFalse() {
  return {
    type: SET_PRISTAN_FALSE
  };
}

export function addOpen() {
  return {
    type: ADD_PRODUCT_OPEN
  };
}

export function addClose() {
  return {
    type: ADD_PRODUCT_CLOSE
  };
}

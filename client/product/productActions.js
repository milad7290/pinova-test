import {productList,create} from './api-product'

export const ADD_PRODUCT = 'ADD_PRODUCT';
export const SET_LOADING = 'SET_LOADING';
export const ADD_PRODUCTS = 'ADD_PRODUCTS';
export const SET_NAME = 'SET_NAME';
export const SET_QUANTITY = 'SET_QUANTITY';
export const SET_PRICE = 'SET_PRICE';
export function addProduct(product) {
  return {
    type: ADD_PRODUCT,
    product,
  };
}
export function setLoading(isLoading=false) {
  return {
    type: SET_LOADING,
    isLoading,
  };
}
export function setName(name) {
  return {
    type: SET_NAME,
    name,
  };
}
export function setQuantity(quantity) {
  return {
    type: SET_QUANTITY,
    quantity,
  };
}
export function setPrice(price) {
  return {
    type: SET_PRICE,
    price,
  };
}
export function addProductRequest(product) {
  return (dispatch) => {
    dispatch( setLoading(true))
    return create(product)
    .then(res =>{ 
      dispatch(setLoading(false))
      return dispatch(addProduct(res.addedProduct)
      )
    });
  };
}

export function addProducts(products) {
  return {
    type: ADD_PRODUCTS,
    products,
  };
}

export function fetchProducts() {
  return (dispatch) => {
    return productList().then(res => {
      dispatch(addProducts(res.products));
    });
  };
}


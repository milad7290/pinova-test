import {productList,create} from './api-product'

export const ADD_PRODUCT = 'ADD_PRODUCT';
export const ADD_PRODUCTS = 'ADD_PRODUCTS';

export function addProduct(product) {
  return {
    type: ADD_PRODUCT,
    product,
  };
}

export function addProductRequest(product) {
  return (dispatch) => {
    return create(product)
    .then(res => dispatch(addProduct(res.addedProduct)));
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


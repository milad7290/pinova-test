import {
  productList,
  create
} from "../api-product";
import {
  showSnack
} from '../../helper/redux/helperActions'
import {
  updateRow
} from '../../invoice/step1/redux/step1Actions'

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

export function addProductRequest(product, rows, selectedProduct) {
  return dispatch => {
    dispatch(setLoading(true));
    return create(product).then(res => {
      dispatch(setLoading(false));
      dispatch(showSnack("محصول با موفقیت اضافه شد", "suc"))
      const index = rows.findIndex(
        x => x.productId === selectedProduct
      );
      rows[index].productName = res.addedProduct.name;
      rows[index].productId = res.addedProduct._id;
      rows[index].price = res.addedProduct.price;
      rows[index].totalPrice = rows[index].price * rows[index].count;
      if (index === rows.length - 1) {
        const productId = rows[rows.length - 1]
        const newRow = {
          productId: productId + 0,
          productName: "",
          count: 1,
          price: null,
          totalPrice: null
        };
        rows.push(newRow);
      }
      dispatch(updateRow(rows));
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
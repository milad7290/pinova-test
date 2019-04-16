export const getProducts = state => {
  return state.products.data;
};

export const getProductLoading = state => {
  return state.products.isLoading;
};

export const getProduct = (state, cuid) =>
  state.products.data.filter(product => product._id === cuid)[0];

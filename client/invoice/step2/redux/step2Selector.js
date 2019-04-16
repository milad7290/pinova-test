export const getStates = (state) => {
  const states=Object.keys(state.step2.iranStates)
  return states
};
export const getCities = state => {
  // const cities= Object.values(state.step2.iranStates[value])
  return state.step2.cities;
};

export const getSelectedState = state => {
  return state.step2.selectedState;
};

export const getSelectedCity = state => {
  return state.step2.selectedCity;
};

export const getPostType = state => {
  return state.step2.postType;
};

export const getDeliveryAmount = state => {
  return state.step2.deliveryAmount;
};

export const getDeliveryTime = state => {
  return state.step2.deliveryTime;
};


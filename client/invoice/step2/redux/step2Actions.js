import { iranStates } from "../../api-invoice";
export const STEP2_IRANSTATES = "STEP2_IRANSTATES";
export const UPDATE_STEP2_SELECTED_STATE = "UPDATE_STEP2_SELECTED_STATE";
export const UPDATE_STEP2_SELECTED_CITY = "UPDATE_STEP2_SELECTED_CITY";
export const UPDATE_STEP2_POST_TYPE = "UPDATE_STEP2_POST_TYPE";
export const UPDATE_STEP2_DELIVERY_AMOUNT = "UPDATE_STEP2_DELIVERY_AMOUNT";
export const SET_REDIRECT = "SET_REDIRECT";
export const UPDATE_STEP2_DELIVERY_TIME = "UPDATE_STEP2_DELIVERY_TIME";
export const RESET_STEP2 = "RESET_STEP2";

export function addIranStates(iranStates) {
  return {
    type: STEP2_IRANSTATES,
    iranStates
  };
}

export function fetchIranStates() {
  return dispatch => {
    return iranStates().then(res => {
      dispatch(addIranStates(res.iranStates));
    });
  };
}

export function updateSelectedState(selectedState) {
  return {
    type: UPDATE_STEP2_SELECTED_STATE,
    selectedState
  };
}

export function updateSelectedCity(selectedCity) {
  return {
    type: UPDATE_STEP2_SELECTED_CITY,
    selectedCity
  };
}

export function updatePostType(postType) {
  return {
    type: UPDATE_STEP2_POST_TYPE,
    postType
  };
}

export function updateDeliveryAmount(deliveryAmount) {
  return {
    type: UPDATE_STEP2_DELIVERY_AMOUNT,
    deliveryAmount
  };
}

export function updateDeliveryTime(deliveryTime) {
  return {
    type: UPDATE_STEP2_DELIVERY_TIME,
    deliveryTime
  };
}

export function resetStep2() {
  return {
    type: RESET_STEP2
  };
}
export function setRedirect() {
  return {
    type: SET_REDIRECT
  };
}


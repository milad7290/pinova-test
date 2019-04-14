import {
  STEP2_IRANSTATES,
  UPDATE_STEP2_SELECTED_STATE,
  UPDATE_STEP2_SELECTED_CITY,
  UPDATE_STEP2_POST_TYPE,
  UPDATE_STEP2_DELIVERY_AMOUNT,
  UPDATE_STEP2_DELIVERY_TIME,
  RESET_STEP2
} from './step2Actions';
const initialState = {
  iranStates:[],
  cities:[],
  selectedState:'',
  selectedCity:'',
  deliveryAmount:'',
  deliveryTime:'',
  postType:''
};
const Step2Reducer = (state = initialState, action) => {
  switch (action.type) {
    case STEP2_IRANSTATES:
      return {...state,iranStates:action.iranStates};
    case UPDATE_STEP2_SELECTED_STATE:
      return {...state,selectedState:action.selectedState,cities:Object.values(state.iranStates[action.selectedState])};
    case UPDATE_STEP2_SELECTED_CITY:
      return {...state,selectedCity:action.selectedCity};
    case UPDATE_STEP2_POST_TYPE:
      return {...state,postType:action.postType};
    case UPDATE_STEP2_DELIVERY_AMOUNT:
      return {...state,deliveryAmount:action.deliveryAmount};
    case UPDATE_STEP2_DELIVERY_TIME:
      return {...state,deliveryTime:action.deliveryTime};      
    case RESET_STEP2:
      return initialState;
    default:
      return state;
  }
};

export const getStates = (state) => {
  console.log('getRows state',state);
  const states=Object.keys(state.step2.iranStates)
  return states
};
export const getCities = (state) => {
  // const cities= Object.values(state.step2.iranStates[value])
  return state.step2.cities
};
export const getSelectedState = state => {
  return state.step2.selectedState
}
export const getSelectedCity = state => {
  return state.step2.selectedCity
}
export const getPostType = state => {
  return state.step2.postType
}
export const getDeliveryAmount = state => {
  return state.step2.deliveryAmount
}
export const getDeliveryTime = state => {
  return state.step2.deliveryTime
}

export default Step2Reducer;
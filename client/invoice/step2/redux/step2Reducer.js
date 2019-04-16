import {
  STEP2_IRANSTATES,
  UPDATE_STEP2_SELECTED_STATE,
  UPDATE_STEP2_SELECTED_CITY,
  UPDATE_STEP2_POST_TYPE,
  UPDATE_STEP2_DELIVERY_AMOUNT,
  UPDATE_STEP2_DELIVERY_TIME,
  RESET_STEP2
} from "./step2Actions";

const initialState = {
  iranStates: [],
  cities: [],
  selectedState: "",
  selectedCity: "",
  deliveryAmount: "",
  deliveryTime: "",
  postType: ""
};

const Step2Reducer = (state = initialState, action) => {
  switch (action.type) {
    case STEP2_IRANSTATES:
      return { ...state, iranStates: action.iranStates };
    case UPDATE_STEP2_SELECTED_STATE:
      return {
        ...state,
        selectedState: action.selectedState,
        cities: Object.values(state.iranStates[action.selectedState])
      };
    case UPDATE_STEP2_SELECTED_CITY:
      return { ...state, selectedCity: action.selectedCity };
    case UPDATE_STEP2_POST_TYPE:
      return { ...state, postType: action.postType };
    case UPDATE_STEP2_DELIVERY_AMOUNT:
      return { ...state, deliveryAmount: action.deliveryAmount };
    case UPDATE_STEP2_DELIVERY_TIME:
      return { ...state, deliveryTime: action.deliveryTime };
    case RESET_STEP2:
      return initialState;
    default:
      return state;
  }
};

export default Step2Reducer;

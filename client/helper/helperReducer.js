import { SHOW_SNACK, HIDE_SNACK } from "./helperActions";

const initialState = {
  open: false,
  message: "",
  type: ""
};

const HelperReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_SNACK:
      return {
        ...state,
        open: true,
        message: action.message,
        type: action.messageType
      };
    case HIDE_SNACK:
      return initialState;
    default:
      return state;
  }
};

export const getSnackInfo = state => {
  return {
    open: state.helper.open,
    message: state.helper.message,
    type: state.helper.type
  };
};

export default HelperReducer;

export const getSnackInfo = state => {
  return {
    open: state.helper.open,
    message: state.helper.message,
    type: state.helper.type
  };
};


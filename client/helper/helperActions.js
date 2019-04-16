export const SHOW_SNACK = "SHOW_SNACK";
export const HIDE_SNACK = "HIDE_SNACK";

export function showSnack(message, messageType) {
  return {
    type: SHOW_SNACK,
    message,
    messageType
  };
}

export function hideSnack() {
  return {
    type: HIDE_SNACK
  };
}

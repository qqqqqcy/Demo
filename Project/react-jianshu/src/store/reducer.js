import { HANDLE_INPUT_FOCUS, HANDLE_INPUT_BLUR } from "./actionTypes";

const defaultState = {
  focused: false
};

export default (state = defaultState, action) => {
  let newState = JSON.parse(JSON.stringify(state));
  // eslint-disable-next-line

  switch (action.type) {
    case HANDLE_INPUT_FOCUS:
      newState.focused = true;
      return newState;
    case HANDLE_INPUT_BLUR:
      newState.focused = false;
      return newState;
    default:
      return state;
  }
};

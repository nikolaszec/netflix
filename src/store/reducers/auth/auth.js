import * as actionTypes from "../../actionTypes";

const initialState = {
  token: null,
  loading: false,
  error: null,
  signedUp: false,
  userData: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_START:
      return { ...state, loading: true };
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        token: action.token
      };
    case actionTypes.LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        userData:{},
        token: null
      };
    case actionTypes.SIGNUP_START:
      return {
        ...state,
        loading: true
      };
    case actionTypes.SIGNUP:
      return {
        ...state,
        signedUp: action.signedUp,
        loading: false
      };
    case actionTypes.SIGNUP_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case actionTypes.SET_USER_DATA_FAIL:
      return {
        ...state,
        error: action.error
      };
    case actionTypes.SET_USER_DATA:
      return {
        ...state,
        userData: action.userData
      };

    default:
      return state;
  }
};

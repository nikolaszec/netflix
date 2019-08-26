import * as actionTypes from "./../actionTypes";
import axios from "../../axios/axios";
// -------------LOGIN------------//
const loginStart = () => {
  return {
    type: actionTypes.LOGIN_START
  };
};

const tryLogin = token => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    token: token
  };
};

const loginFail = error => {
  return {
    type: actionTypes.LOGIN_FAIL,
    error: error
  };
};

export const login = (email, password) => {
  return dispatch => {
    dispatch(loginFail(null));
    dispatch(loginStart());

    axios
      .post("/user/login", { email, password })
      .then(res => {
        console.log(res)
        //1h expiration time definisano na serveru
        // if (res.data.error) {
        //   dispatch(loginFail(res.data.error));
        // } else {
          const expirationTime = 3600; //1h
          const expirationDate = new Date(
            new Date().getTime() + expirationTime * 1000
           );
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("expirationDate", expirationDate);
          dispatch(tryLogin(res.data.token));
          dispatch(checkAuthTimeout(expirationTime));
        // }
      })
      .catch(err => {
        dispatch(loginFail(err.response.data.message));
        console.log(err.response.data.message)
      });
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  return {
    type: actionTypes.LOGOUT
  };
};

export const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        dispatch(tryLogin(token));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};

// -------------LOGIN------------//

// -------------SIGNUP-----------//

const signUpStart = () => {
  return {
    type: actionTypes.SIGNUP_START
  };
};

const signUpSucces = result => {
  return {
    type: actionTypes.SIGNUP,
    signedUp: result
  };
};

const signUpFail = err => {
  return {
    type: actionTypes.SIGNUP_FAIL,
    error: err
  };
};

export const signUp = newUserData => {
  return dispatch => {
    

    dispatch(signUpFail(null))
    dispatch(signUpStart());
    
    const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };
    axios
      .post("/user/signup", newUserData, config)
      .then(res => {
          if(res.data.error){
              dispatch(signUpFail(res.data.error))
          }else{
          dispatch(signUpSucces(true));
        }
      })
      .catch(err => {
        dispatch(signUpFail(err));
      });
  };
};

// -------------SIGNUP------------//

export const isAuth = () => {
  return dispatch => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout);
    } else {
      dispatch(tryLogin(token));
    }
  };
};

//User info

const setUserData = userData => {
    return {
        type:actionTypes.SET_USER_DATA,
        userData:userData
    }
}

const setUserDataFail = err => {
    return {
        type:actionTypes.SET_USER_DATA_FAIL,
        error:err
    }
}

export const userInfo = (token) => {
  const config = {
  
    headers: {
      "Authorization": "Bearer " + token,
      "Content-Type": "application/json"
    }
  };
  const AUTH_STR = "Bearer " + token
    return dispatch => {
     
      axios
        .get("/user/info",{ params:{}, headers: { 'Authorization': AUTH_STR } })
        .then(res => {
          if (res.data) {
            dispatch(setUserData(res.data));
          } 
        })
        .catch(err => {
          dispatch(setUserDataFail(err));
        });
    };
  };
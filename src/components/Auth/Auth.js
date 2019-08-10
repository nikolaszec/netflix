import React, { useState } from "react";
import Login from "./LoginForm/index";
import SignUp from "./SignUpForm/index";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import { Redirect } from "react-router-dom";

const Auth = props => {
  const [signUpMode, setSignUpMode] = useState(false);

  const switchToSignUp = () => {
    setSignUpMode(prevSignUpMode => !prevSignUpMode);
  };

  //switch back to login component
  const switchToLogin = () => {
    setSignUpMode(prevSignUpMode => !prevSignUpMode);
  };

  //Default form is Login Form
  let displayForm = (
    <Login
      error={props.error}
      changeToSignUp={switchToSignUp}
      handleLogin={props.login}
    />
  );
  if (signUpMode) {
    displayForm = (
      <SignUp
        handleSignUp={props.signUp}
        signedUp={props.signedUp}
        error={props.error}
        changeToLogin={switchToLogin}
      />
    );
  }

  return (
    <React.Fragment>
      {props.token ? <Redirect to="/" /> : null}

      {displayForm}
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    token: state.authReducer.token,
    error: state.authReducer.error,
    signedUp: state.authReducer.signedUp
  };
};

const mapDispatchToProps = dispatch => {
  return {
    isAuth: () => dispatch(actions.authCheckState()),
    login: (email, password) => dispatch(actions.login(email, password)),
    signUp: newUserData => dispatch(actions.signUp(newUserData))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);

import React from "react";
import { Formik } from "formik";
import Form from "./Login";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/styles";
import * as Yup from "yup";
import colors from "../../../styles/colors";

const useStyles = makeStyles({
  paper: {
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 10,
    backgroundColor: colors.onyx,
    color: colors.red
  },
  container: {
    display: "flex",
    width: "90%",
    margin: "0 auto",
    marginTop: "60px",
    color: colors.snow,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    minHeight: "100vh"
  }
});

const InputForm = props => {
  const handleSignUp = props.changeToSignUp;
  const handleLogin = props.handleLogin;

  const classes = useStyles();
  const values = { email: "", password: "" };
  return (
    <React.Fragment>
      {
        <div className={classes.container}>
          <Paper elevation={10} className={classes.paper}>
            <h2>Login</h2>
            {props.error ? <p>{props.error}</p> : null}
            <Formik
              render={props => <Form {...props} handleSignUp={handleSignUp} />}
              validationSchema={validationSchema}
              initialValues={values}
              onSubmit={(values, setSubmitting) => {
                const { email, password } = values;
                handleLogin(email, password);
              }}
            />
          </Paper>
        </div>
      }
    </React.Fragment>
  );
};

const validationSchema = Yup.object({
  email: Yup.string("Provide valide email").required("Email is required"),
  password: Yup.string("Provide valide password").required(
    "Password is required"
  )
});

export default InputForm;

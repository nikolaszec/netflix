import React from "react";
import { Formik } from "formik";
import  Form  from "./SignUp";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/styles";
import * as Yup from "yup";
import colors from '../../../styles/colors'

const useStyles = makeStyles({
  paper: {
    margin:'0 auto',
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding:5,
    backgroundColor:colors.onyx,
    color:colors.red,
   
  },
  container: {
    display:'flex',
    width: "60%",
    margin:'0 auto',
    marginTop:'60px',
    color:colors.snow,
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    textAlign:'center',
    minHeight:'100vh'
  }
});

const InputForm = props => {
  const handleBacktoLogin = props.changeToLogin;
  const signup = props.handleSignUp;

  const classes = useStyles();
  const values = {
    email: "",
    password: "",
    city: "",
    country: "",
    address: "",
    firstName: "",
    lastName: ""
  };

  if (props.signedUp) {
    handleBacktoLogin();
  }
  return (
    <React.Fragment>
      {
        <div className={classes.container}>
          <Paper elevation={10} className={classes.paper}>
            <h2>SignUp</h2>
            <Formik
              render={props => (
                <Form {...props} handleBacktoLogin={handleBacktoLogin} />
              )}
              validationSchema={validationSchema}
              initialValues={values}
              onSubmit={(values, setSubmit) => {
                const {
                  email,
                  password,
                  firstName,
                  lastName,
                  city,
                  country,
                  address
                } = values;
                const data = {
                  email,
                  password,
                  firstName,
                  lastName,
                  location: {
                    city,
                    country,
                    address
                  }
                };

                signup(data);
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
  ),
  firstName: Yup.string("Provide valide firstName").required(
    "FirstName is required"
  ),
  lastName: Yup.string("Provide valide lastName").required(
    "LastName is required"
  )
});

export default InputForm;

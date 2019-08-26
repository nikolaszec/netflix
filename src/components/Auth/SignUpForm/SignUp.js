import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Typography } from "@material-ui/core";
import colors from "../../../styles/colors";
import { withStyles, createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

const theme = createMuiTheme({
  overrides: {
    MuiInputLabel: {
      // Name of the component ⚛️ / style sheet
      root: {
        // Name of the rule
        color: colors.red,
        "&$focused": {
          // increase the specificity for the pseudo class
          color: colors.red
        }
      }
    }
  }
});

const styles = {
  textField: {
    color: colors.red,
    background: colors.gunmetal,
    border: "none"
  }
};

const Form = props => {
  const { classes } = props;

  const {
    values: { email, password, firstName, lastName, city, country, address },
    errors,
    touched,
    handleSubmit,
    handleChange,
    isValid,
    setFieldTouched
  } = props;

  const change = (name, e) => {
    e.persist();
    handleChange(e);
    setFieldTouched(name, true, false);
  };
  return (
    <form onSubmit={handleSubmit}>
      <ThemeProvider theme={theme}>
        <TextField
          type="email"
          id="email"
          variant="outlined"
          name="email"
          label="Email"
          fullWidth
          margin="normal"
          value={email}
          helperText={touched.email && errors.email ? errors.email : ""}
          error={Boolean(errors.email && touched.email)}
          onChange={e => change("email", e)}
          required
          InputLabelProps={{
            shrink: true
          }}
          InputProps={{
            className: classes.textField
          }}
        />
        <TextField
          id="password"
          name="password"
          label="Password"
          fullWidth
          type="password"
          variant="outlined"
          margin="normal"
          helperText={
            touched.password && errors.password ? errors.password : ""
          }
          error={Boolean(errors.password && touched.password)}
          onChange={e => change("password", e)}
          required
          value={password}
          InputLabelProps={{
            shrink: true
          }}
          InputProps={{
            className: classes.textField
          }}
        />
        <TextField
          id="firstName"
          name="firstName"
          label="FirstName"
          fullWidth
          type="firstName"
          variant="standard"
          margin="normal"
          helperText={
            touched.firstName && errors.firstName ? errors.firstName : ""
          }
          error={Boolean(errors.firstName && touched.firstName)}
          onChange={e => change("firstName", e)}
          required
          value={firstName}
          InputLabelProps={{
            shrink: true
          }}
          InputProps={{
            className: classes.textField
          }}
        />

        <TextField
          id="lastName"
          name="lastName"
          label="LastName"
          fullWidth
          type="lastName"
          variant="standard"
          margin="normal"
          helperText={
            touched.lastName && errors.lastName ? errors.lastName : ""
          }
          error={Boolean(errors.lastName && touched.lastName)}
          onChange={e => change("lastName", e)}
          required
          value={lastName}
          InputLabelProps={{
            shrink: true
          }}
          InputProps={{
            className: classes.textField
          }}
        />
        <TextField
          id="city"
          name="city"
          label="City"
          fullWidth
          type="city"
          variant="standard"
          margin="normal"
          onChange={e => change("city", e)}
          value={city}
          InputLabelProps={{
            shrink: true
          }}
          InputProps={{
            className: classes.textField
          }}
        />
        <TextField
          id="country"
          name="country"
          label="Country"
          fullWidth
          type="country"
          variant="standard"
          margin="normal"
          onChange={e => change("country", e)}
          value={country}
          InputLabelProps={{
            shrink: true
          }}
          InputProps={{
            className: classes.textField
          }}
        />

        <TextField
          id="address"
          name="address"
          label="Address"
          fullWidth
          type="address"
          variant="standard"
          margin="normal"
          onChange={e => change("address", e)}
          value={address}
          InputLabelProps={{
            shrink: true
          }}
          InputProps={{
            className: classes.textField
          }}
        />
      </ThemeProvider>
      <Button
        style={{ color: colors.lightwhite }}
        type="submit"
        fullWidth
        variant="text"
        color="primary"
        disabled={!isValid}
      >
        SignUp
      </Button>
      <Typography style={{ textAlign: "center", color: "green" }}>
        or
      </Typography>
      <Button
        onClick={() => props.handleBacktoLogin()}
        type="button"
        fullWidth
        variant="text"
        color="secondary"
      >
        Login
      </Button>
    </form>
  );
};

export default withStyles(styles)(Form);

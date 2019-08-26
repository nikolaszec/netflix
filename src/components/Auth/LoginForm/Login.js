import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Typography } from "@material-ui/core";
import { withStyles, createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import colors from "../../../styles/colors";

const styles = {
  textField: {
    color: colors.red,
    background: colors.gunmetal,
    border: "none"
  }
};

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

const Form = props => {
  const { classes } = props;
  const {
    values: { email },
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
          InputProps={{
            className: classes.textField
          }}
          InputLabelProps={{
            shrink: true
          }}
        />
      </ThemeProvider>

      <TextField
        id="password"
        name="password"
        label="Password"
        fullWidth
        type="password"
        variant="outlined"
        margin="normal"
        helperText={touched.password && errors.password ? errors.password : ""}
        error={Boolean(errors.password && touched.password)}
        onChange={e => change("password", e)}
        required
        className={classes.textField}
        InputLabelProps={{
          shrink: true
        }}
      />

      <Button
        style={{ color: colors.lightwhite }}
        type="submit"
        fullWidth
        variant="text"
        color="primary"
        disabled={!isValid}
      >
        Login
      </Button>
      <Typography style={{ textAlign: "center", color: "green" }}>
        or
      </Typography>
      <Button
        onClick={() => props.handleSignUp()}
        type="button"
        fullWidth
        variant="text"
        color="secondary"
      >
        SignUp
      </Button>
    </form>
  );
};

export default withStyles(styles)(Form);

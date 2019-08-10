import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { withStyles, createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import colors from "../../../styles/colors";

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
    values: {
      title,
      storyline,
      year,
      releaseDate,
      genres = [],
      actors,
      duration,
      posterurl
    },
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

  const date = new Date(releaseDate);
  const dateToDisplay = `${date.getFullYear()}-${
    date.getMonth() < 10 ? "0" + date.getMonth() : date.getMonth()
  }-${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}`;

  return (
    <form onSubmit={handleSubmit}>
      <ThemeProvider theme={theme}>
        <TextField
          id="title"
          name="title"
          label="Title"
          fullWidth
          margin="dense"
          value={title || ""}
          helperText={touched.title && errors.title ? errors.title : ""}
          error={Boolean(errors.title && touched.title)}
          onChange={e => change("title", e)}
          required
          InputLabelProps={{
            shrink: true
          }}
          InputProps={{
            className: classes.textField
          }}
        />
        <TextField
          id="storyline"
          name="storyline"
          label="Storyline"
          fullWidth
          multiline
          variant="outlined"
          margin="dense"
          value={storyline}
          onChange={e => change("storyline", e)}
          InputLabelProps={{
            shrink: true
          }}
          InputProps={{
            className: classes.textField
          }}
        />
        <TextField
          id="year"
          name="year"
          label="Year"
          type="number"
          margin="dense"
          variant="outlined"
          required
          helperText={touched.year && errors.year ? errors.year : ""}
          error={Boolean(errors.year && touched.year)}
          onChange={e => change("year", e)}
          value={year}
          InputLabelProps={{
            shrink: true
          }}
          InputProps={{
            className: classes.textField
          }}
        />
        <TextField
          id="releaseDate"
          name="releaseDate"
          label="Release Date"
          type="date"
          fullWidth
          margin="dense"
          helperText={
            touched.releaseDate && errors.releaseDate ? errors.releaseDate : ""
          }
          error={Boolean(errors.releaseDate && touched.releaseDate)}
          onChange={e => change("releaseDate", e)}
          required
          value={dateToDisplay ? dateToDisplay : "2000-01-01"}
          InputLabelProps={{
            shrink: true
          }}
          InputProps={{
            className: classes.textField
          }}
        />
        <TextField
          id="genres"
          name="genres"
          label="Genres"
          type="text"
          margin="dense"
          fullWidth
          variant="outlined"
          required
          helperText={touched.genres && errors.genres ? errors.genres : ""}
          error={Boolean(errors.genres && touched.genres)}
          onChange={e => change("genres", e)}
          value={genres}
          InputLabelProps={{
            shrink: true
          }}
          InputProps={{
            className: classes.textField
          }}
        />
        <TextField
          id="actors"
          name="actors"
          label="Actors"
          type="text"
          margin="dense"
          fullWidth
          variant="outlined"
          value={actors}
          required
          helperText={touched.actors && errors.actors ? errors.actors : ""}
          error={Boolean(errors.actors && touched.actors)}
          onChange={e => change("actors", e)}
          InputLabelProps={{
            shrink: true
          }}
          InputProps={{
            className: classes.textField
          }}
        />
        <TextField
          id="duration"
          name="duration"
          label="Duration"
          type="text"
          margin="dense"
          onChange={e => change("duration", e)}
          value={duration}
          InputLabelProps={{
            shrink: true
          }}
          InputProps={{
            className: classes.textField
          }}
        />
        <TextField
          id="posterurl"
          name="posterurl"
          label="PosterUrl"
          type="text"
          margin="dense"
          fullWidth
          value={posterurl}
          onChange={e => change("posterurl", e)}
          InputLabelProps={{
            shrink: true
          }}
          InputProps={{
            className: classes.textField
          }}
        />
      </ThemeProvider>
      <Button
        type="submit"
        fullWidth
        variant="text"
        disabled={!isValid}
        style={{ color: colors.lightwhite }}
      >
        Submit
      </Button>
    </form>
  );
};
export default withStyles(styles)(Form);

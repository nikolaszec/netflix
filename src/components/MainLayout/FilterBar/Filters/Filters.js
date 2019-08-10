import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { withStyles } from "@material-ui/core/styles";
import colors from "../../../../styles/colors";
import Input from "@material-ui/core/Input";

const styles = {
  root: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    textAlign: "center"
  },
  formControl: {
    margin: 5,
    minWidth: 100,

    color: "red"
  },
  selectEmpty: {
    marginTop: 5
  },
  filtersWrapper: {
    margin: "0 auto"
  },
  dropdownStyle: {
    backgroundColor: colors.onyx,
    color: colors.snow,
    border: "2px solid green",
    borderStyle: "none",
    "&:focus": {
      borderStyle: "none",
      color: colors.darkgunmetal
    }
  },
  outlined: {
    border: "1px solid orange"
  },
  selectStyle: {
    backgroundColor: "lightgrey",
    color: "white"
  },
  selectMenu: {
    backgroundColor: "green"
  },
  inputLabel: {
    color: colors.red
  },
  inputLabelFocused: {
    color: colors.red
  },
  underline: {
    borderStyle: "none",
    "&:after": {
      borderBottom: `1px solid ${colors.red}`
    }
  }
};

const Filters = props => {
  const { classes } = props;
  const handleChange = name => event => {
    if (name === "genres") {
      props.handleGenres(event.target.value);
    }
    if (name === "year") {
      props.handleYear(event.target.value);
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.filtersWrapper}>
        <FormControl component="div" className={classes.formControl}>
          <InputLabel
            style={{ color: colors.red, fontWeight: "700" }}
            htmlFor="year"
          >
            Sort by Year
          </InputLabel>
          <Select
            classes={{ root: classes.dropdownStyle }}
            native
            onChange={handleChange("year")}
            inputProps={{
              name: "year",
              id: "year"
            }}
            input={
              <Input
                classes={{
                  underline: classes.underline
                }}
                name="age"
                id="age-helper"
              />
            }
          >
            <option value={""}>Sort by</option>
            <option value={"most-recent"}>Most Recent movies</option>
            <option value={"oldest"}>Oldest </option>
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel
            style={{ color: colors.red, fontWeight: "700" }}
            className={classes.inputLabel}
            htmlFor="genres"
          >
            Genres
          </InputLabel>
          <Select
            classes={{
              root: classes.dropdownStyle,
              outlined: classes.outlined
            }}
            native
            input={
              <Input
                classes={{
                  underline: classes.underline
                }}
                name="age"
                id="age-helper"
              />
            }
            onChange={handleChange("genres")}
            inputProps={{
              name: "genres",
              id: "genres"
            }}
          >
            <option value="">All</option>
            <option value={"action"}>Action</option>
            <option value={"adventure"}>Adventure</option>
            <option value={"drama"}>Drama </option>
            <option value={"romance"}>Romance </option>
            <option value={"comedy"}>Comedy </option>
            <option value={"sc-fi"}>Sc-Fi </option>
            <option value={"fantasy"}>Fantasy</option>
          </Select>
        </FormControl>
      </div>
    </div>
  );
};

export default withStyles(styles)(Filters);

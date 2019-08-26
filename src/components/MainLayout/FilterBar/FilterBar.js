import React from "react";
import { TextField } from "@material-ui/core";
import Filters from "./Filters/Filters";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/filters";
import colors from "../../../styles/colors";
import { withStyles } from "@material-ui/core/styles";


const styles = {
  root: {
    width: "85%",
    boxSizing: "border-box",
    margin: "0 auto",
    marginBottom: 10,
    color: colors.red,
    display: "flex",
    flexDirection: "column"
  },
  searchBar: {
    width: "90%",
    margin: "10px auto",
    display: "flex"
  },
  searchIcon: {
    alignSelf: "center",
    marginLeft: 10
  },
  searchBox: {
    background: colors.darkgunmetal,
    color: colors.snow,
    transition: "background 0.6s ease-in, color 0.6s ease-in",
    borderRadius: "3px",
    "&:focus": {
      background: colors.onyx,
      color: colors.lightwhite
    }
  }
};

const FilterBar = props => {

  const { classes } = props;

  return (
    <div className={classes.root}>
      <div className={classes.searchBar}>
        <TextField
          fullWidth
          placeholder="Search movie by title"
          variant="outlined"
          value={props.value}
          onChange={e => props.handleFilterByTitle(e.target.value)}
          inputProps={{ className: classes.searchBox }}
        />
      </div>
      <Filters
        handleGenres={props.handleGenres}
        handleYear={props.handleYear}
      />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    value: state.filterReducer.filterTitle
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleFilterByTitle: input => dispatch(actions.filterByTitle(input)),
    handleGenres: genre => dispatch(actions.filterByGenre(genre)),
    handleYear: year => dispatch(actions.filterByYear(year))
  };
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(FilterBar)
);

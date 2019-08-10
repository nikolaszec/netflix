import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputForm from "./Movie/InputForm/index";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../store/actions/index";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,

    margin: "80px auto 0 auto",
    boxSizing: "border-box",
    width: "70%",
    height: "100vh",
    display: "flex"
  },
  paper: {
    height: "1999%",
    width: 400,

    textAlign: "center",
    margin: "0 auto"
  },
  cardContainer: {
    margin: "0 auto",
    width: "100%"
  },
  control: {
    padding: theme.spacing(2)
  }
}));

const CreateMovie = props => {
  const classes = useStyles();

  useEffect(() => {
    if (props.match.params.id) {
      props.getMovieToUpd(props.match.params.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const values = {
    title: "",
    storyline: "",
    year: "",
    releaseDate: "",
    genres: "",
    actors: "",
    duration: "",
    posterurl: ""
  };

  let formToDisplay = (
    <InputForm
      error={props.hasErrors}
      createInitials={values}
      handleCreateMovie={(movie, token) => props.createMovie(movie, token)}
    />
  );

  if (props.movieToUpd !== null && props.match.params.id) {
    formToDisplay = (
      <InputForm
        editInitials={props.movieToUpd}
        error={props.hasErrors}
        id={props.match.params.id}
        movieToUpd={props.movieToUpd}
        handleEdit={(id, movie, token) => props.updateMovie(id, movie, token)}
      />
    );
  }

  return (
    <React.Fragment>
      {props.createdSuccesfully ? <Redirect to={"/"} /> : null}
      <div className={classes.root}>{formToDisplay}</div>
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    createdSuccesfully: state.moviesReducer.movieCreated,
    hasErrors: state.moviesReducer.error,
    movieToUpd: state.moviesReducer.movieInfo
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createMovie: (movie, token) => dispatch(actions.createMovie(movie, token)),
    getMovieToUpd: id => dispatch(actions.getSingleMovie(id)),
    updateMovie: (id, movie, token) => dispatch(actions.edit(id, movie, token))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateMovie);

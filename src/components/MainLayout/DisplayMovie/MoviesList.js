import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Spinner from "../../../UI/Spinner/Spinner";
import Movie from "../DisplayMovie/Movie";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginTop: 80,
    marginRight: -50,
    boxSizing: "border-box"
  },
  paper: {
    height: 140,
    width: 100,
    margin: 20,
    marginTop: 10,
    margin: "auto",
    textAlign: "center",
    marginBottom: 30,
    boxSizing: "border-box"
  },
  cardContainer: {
    marginBottom: 10,
    boxSizing: "border-box",
    display: "flex",
    justifyContent: "center"
  }
}));

const MoviesList = props => {
  const classes = useStyles();

  let display = (
    <Grid container justify="center" spacing={1}>
      <Grid className={classes.cardContainer} item>
        <Spinner />
      </Grid>
    </Grid>
  );
  if (!props.loading) {
    display = (
      <Grid container justify="center" spacing={2}>
        {props.movies.map(movie => (
          <Grid
            className={classes.cardContainer}
            key={movie._id}
            item
            xs={10}
            sm={8}
            md={6}
            lg={3}
            xl={2}
          >
            <Movie
              id={movie._id}
              title={movie.title}
              ratings={movie.ratings}
              genres={movie.genres}
              posterUrl={movie.posterurl}
              className={classes.paper}
            />
          </Grid>
        ))}
      </Grid>
    );
  }

  return <React.Fragment>{display}</React.Fragment>;
};

export default MoviesList;

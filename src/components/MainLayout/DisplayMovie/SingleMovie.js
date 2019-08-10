import React, { useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";
import { Button } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import colors from "../../../styles/colors";

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: "transparent",
    height: "100vh",
    display: "flex"
  },
  snglMovieCont: {
    margin: "0 auto",
    alignSelf: "center"
  },
  card: {
    width: "100%",
    backgroundColor: colors.darkgunmetal,
    boxShadow: `0px 1px 14px -1px ${colors.gunmetal}`,
    transition: "box-shadow 0.3s ease-in",
    "&:hover": {
      boxShadow: `0px 1px 20px -1px ${colors.snow}`
    }
  },
  cardMedia: {},
  imgContainer: {
    opacity: 0.75,
    minWidth: 300,
    boxShadow: `0px 1px 5px -1px ${colors.snow}`,
    transition: "box-shadow 0.3s ease-in",
    "&:hover": {
      boxShadow: `0px 1px 7px -1px ${colors.snow}`
    },
    height: "250px",
    backgroundSize: "100% 100%"
  },
  singleDataRed: {
    color: colors.red
  },
  singleDataWhite: {
    color: colors.lightwhite
  },
  buttonCont: {
    marginLeft: "10px",
    marginBottom: "10px"
  }
}));

const SingleMovie = props => {
  const classes = useStyles();

  useEffect(() => {
    props.getMovie(props.match.params.id);
    props.checkAuth();
  }, []);

  let rating = 0;
  let genres = "";
  let actors = "";
  let duration = "";
  let releaseDate = "";
  if (props.operationSucces) {
    rating = Number.parseFloat(
      props.movie.ratings.reduce((previous, current) => {
        return previous + current;
      }, 0) / props.movie.ratings.length
    ).toFixed(1);

    rating = !isNaN(rating) ? rating : "No rating yet.";
    genres = props.movie.genres.join(",");
    actors = props.movie.actors.join(",");
    duration =
      props.movie.duration !== undefined
        ? props.movie.duration.slice(2, props.movie.duration.length - 1)
        : "*";
    releaseDate = new Date(props.movie.releaseDate).toLocaleDateString();
  }

  let buttonToDisplay = (
    <Button color="secondary" title={"You must be logged in"} disabled>
      Edit
    </Button>
  );

  if (props.token) {
    buttonToDisplay = (
      <Button
        onClick={() =>
          props.history.push("/movie/create/" + props.match.params.id)
        }
        variant="outlined"
        color="secondary"
      >
        Edit movie
      </Button>
    );
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <div className={classes.root}>
          <div className={classes.snglMovieCont}>
            <Card className={classes.card}>
              <CardActionArea>
                <div
                  className={classes.imgContainer}
                  style={{
                    backgroundImage: `url(${
                      props.movie.posterurl
                        ? props.movie.posterurl
                        : "https://energywater.gr/wp-content/uploads/2017/12/noimage.png"
                    }`
                  }}
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="h2"
                    className={classes.singleDataWhite}
                  >
                    {props.movie.title}
                  </Typography>
                  <Typography
                    className={classes.singleDataWhite}
                    gutterBottom
                    variant="subtitle2"
                    component="p"
                  >
                    <span className={classes.singleDataRed}>Year: </span>
                    {props.movie.year}
                  </Typography>
                  <Typography
                    className={classes.singleDataWhite}
                    gutterBottom
                    variant="subtitle2"
                    component="p"
                  >
                    <span className={classes.singleDataRed}>Rating: </span>
                    {rating}
                  </Typography>
                  <Typography
                    className={classes.singleDataWhite}
                    variant="subtitle2"
                    component="p"
                  >
                    <span className={classes.singleDataRed}> Genres: </span>
                    {genres}
                  </Typography>
                  <Typography
                    className={classes.singleDataWhite}
                    variant="subtitle2"
                    component="p"
                  >
                    <span className={classes.singleDataRed}>Actors: </span>
                    {actors}
                  </Typography>
                  <Typography
                    className={classes.singleDataWhite}
                    variant="subtitle2"
                    component="p"
                  >
                    <span className={classes.singleDataRed}>Duration: </span>
                    {duration ? duration : "120"} {duration ? "" : "minutes"}
                  </Typography>
                  <Typography
                    className={classes.singleDataWhite}
                    variant="subtitle2"
                    component="p"
                  >
                    <span className={classes.singleDataRed}>
                      Release Date:{" "}
                    </span>
                    {releaseDate}
                  </Typography>
                </CardContent>
              </CardActionArea>

              <CardActions />
              <div className={classes.buttonCont}>{buttonToDisplay}</div>
            </Card>
          </div>
        </div>
      </Container>
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    movie: state.moviesReducer.movieInfo,
    isLoading: state.moviesReducer.loading,
    operationSucces: state.moviesReducer.operationSucces,
    token: state.authReducer.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getMovie: id => dispatch(actions.getSingleMovie(id)),
    checkAuth: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SingleMovie)
);

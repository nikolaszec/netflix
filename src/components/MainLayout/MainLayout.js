import React,{useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import FilterBar from "./FilterBar/FilterBar";
import {connect} from 'react-redux'
import * as actions from '../../store/actions/index'
import MoviesList from './DisplayMovie/MoviesList'

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
    boxSizing:'border-box'
  },
  cardContainer: {
    marginBottom: 10,
    boxSizing: "border-box",
    display: "flex",
    justifyContent: "center"
  }
}));

const MainLayout = (props) => {
  const classes = useStyles();

  useEffect(() => {
    props.getMovies()
    return () => {
      console.log('cleanUp')
    };
  }, [])

  return (
    <Grid container className={classes.root} spacing={0}>
      <FilterBar />
      <Grid item xs={12} ls={12}>
      <MoviesList movies={props.movies} loading={props.loading}/>
       {/* <Grid container justify="center" spacing={1}>
          {props.movies.map(value => (
            <Grid
              className={classes.cardContainer}
              key={value._id}
              item
              xs={10}
              sm={6}
              md={4}
            >
              <Card className={classes.paper} />
            </Grid>
          ))}
          </Grid>*/}
      </Grid>
    </Grid>
  );
};

const mapStateToProps = state => {

  return {
    movies:actions.filterByTitleSelector(state),
    loading:state.moviesReducer.loading,
   
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getMovies: () => dispatch(actions.fetchMovies())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(MainLayout);

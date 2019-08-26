import * as actionTypes from "../actionTypes";
import axios from "../../axios/axios";

//FETCHING ----------------------//
export const getMovies = movies => {
  return {
    type: actionTypes.FETCHING_MOVIES,
    payload: { moviesArr: movies.movie }
  };
};

const fetchingMoviesStart = () => {
  return {
    type: actionTypes.FETCHING_MOVIES_START
  };
};

const fetchingMoviesEnd = error => {
  return {
    type: actionTypes.FETCHING_MOVIES_END,
    error: error
  };
};

export const fetchMovies = () => {
  return dispatch => {
    dispatch(fetchingMoviesStart());
    axios
      .get("/movie/info")
      .then(res => {
        dispatch(getMovies(res.data));
        dispatch(fetchingMoviesEnd(null));
      })
      .catch(err => dispatch(fetchingMoviesEnd(err)));
  };
};

export const fetchSingleMovie = movie => {
  return {
    type: actionTypes.FETCHING_MOVIE,
    payload: movie.movie,
    operationSucces: true
  };
};

const fetchMovieStart = () => {
  return {
    type: actionTypes.FETCHING_MOVIE_START,
    operationSucces: false
  };
};

const fetchMovieEnd = () => {
  return {
    type: actionTypes.FETCHING_MOVIE_END
  };
};

export const getSingleMovie = id => {
  return dispatch => {
    dispatch(fetchMovieStart());
    axios
      .get("/movie/info/" + id)
      .then(res => {
        dispatch(fetchSingleMovie(res.data));
        dispatch(fetchMovieEnd());
      })
      .catch(err => {
        dispatch(fetchMovieEnd());
        console.log(err);
      });
  };
};
//FETCHING ----------------------//

//CREATE ----------------------//
const createMovieStart = () => {
  return {
    type: actionTypes.CREATE_MOVIE_START
  };
};

const createMovieSucces = success => {
  return {
    type: actionTypes.CREATE_MOVIE_SUCCESS,
    createdSuccessfully: success
  };
};

const createMovieFail = error => {
  return {
    type: actionTypes.CREATE_MOVIE_FAIL,
    error: error
  };
};

export const createMovie = (movie, token) => {
  return dispatch => {
    const config = {
      headers: { Authorization: "Bearer " + token }
    };
    dispatch(createMovieStart());
    axios
      .post("/movie/create", movie, config)
      .then(res => {
        if (res.data.error) {
          dispatch(createMovieFail(res.data.error));
        } else if (!res.data.error) {
          dispatch(createMovieSucces(true));
        }
      })
      .catch(error => {
        dispatch(createMovieFail(error));
      });
  };
};
//CREATE ----------------------//

//EDIT ----------------------//
const editMovieStart = () => {
  return {
    type: actionTypes.EDIT_MOVIE_START
  };
};

const editMovieSucces = editResult => {
  return {
    type: actionTypes.EDIT_MOVIE,
    movieEdited: editResult
  };
};

const editMovieFail = error => {
  return {
    type: actionTypes.EDIT_MOVIE_FAIL,
    error: error
  };
};

export const edit = (movieId, updatedMovie, token) => {
  return dispatch => {
    const config = {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/x-www-form-urlencoded"
      }
    };
    dispatch(editMovieStart());
    axios
      .post("/movie/edit/" + movieId, { ...updatedMovie }, config)
      .then(res => {
        if (res) {
          dispatch(editMovieSucces(true));
        } else {
          dispatch(editMovieFail("went wrong"));
        }
      })
      .catch(err => {
        dispatch(editMovieFail(err));
      });
  };
};

//EDIT ----------------------//

//SEARCH FILTER ----------------------//
export const searchFilter = value => {
  return {
    type: actionTypes.SEARCH_FILTER,
    searchFilterVal: value
  };
};
//SEARCH FILTER ----------------------//

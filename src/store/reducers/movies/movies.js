import * as actionTypes from "../../actionTypes";

const initialState = {
  movies: [],
  loading: false,
  movieInfo: {},
  error: null,
  movieCreated: false,
  movieEdited: false,
  searchFilterVal: "",
  operationSucces:false
};

export default (
  state = initialState,
  { type, operationSucces, payload, createdSuccessfully, error, movieEdited, searchFilterVal }
) => {
  switch (type) {
    case actionTypes.FETCHING_MOVIES_START: {
      return {
        ...state,
        loading: true
      };
    }
    case actionTypes.FETCHING_MOVIES:
      return {
        ...state,
        movies: payload.moviesArr,
        loading: false,
        movieCreated:false
      };
    case actionTypes.FETCHING_MOVIES_END:
      return {
        ...state,
        loading: false,
        error: error
      };
    case actionTypes.FETCHING_MOVIE_START:
      return {
        ...state,
        loading: true
      };
    case actionTypes.FETCHING_MOVIE_END:
      return {
        ...state,
        loading: false
      };
    case actionTypes.FETCHING_MOVIE:
      return {
        ...state,
        movieInfo: payload,
        loading: false,
        operationSucces:operationSucces
      };
    case actionTypes.CREATE_MOVIE_START:
      return {
        ...state,
        loading: true
      };
    case actionTypes.CREATE_MOVIE_SUCCESS:
      return {
        ...state,
        movieCreated: createdSuccessfully,
        loading: false
      };

    case actionTypes.CREATE_MOVIE_FAIL:
      return {
        ...state,
        loading: false,
        error: error
      };
    case actionTypes.EDIT_MOVIE_START:
      return {
        ...state,
        loading: true
      };
    case actionTypes.EDIT_MOVIE:
      return {
        ...state,
        loading: false,
        movieEdited: movieEdited
      };
    case actionTypes.EDIT_MOVIE_FAIL:
      return {
        ...state,
        loading: false,
        error: error
      };
    case actionTypes.SEARCH_FILTER:
      const updatedMovies = { movie: [].concat(state.movies.movie) };
      const movies = updatedMovies.movie.filter(movie => {
        return movie.title
          .toLowerCase()
          .includes(searchFilterVal.toLowerCase());
      });
      console.log("movies", movies);
      console.log("updatedMovies,", updatedMovies);
      return {
        ...state,
        movies: { movie: movies },
        //  movies:{movie:updatedMovies.filter((movie)=>movie.title.trim().includes(searchFilterVal.trim()))},
        searchFilterVal
      };

    default:
      return state;
  }
};

import * as actionTypes from "../../actionTypes";

const initialState = {
  filterTitle:'',
  filterYear:'most-recent',
  filterGenre:''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FILTER_BY_TITLE:
      return {
        ...state,
        filterTitle:action.filterTitle
      };
      case actionTypes.FILTER_BY_YEAR:
        return {
          ...state,
          filterYear:action.filterYear
        };
        case actionTypes.FILTER_BY_GENRE:
        return {
          ...state,
          filterGenre:action.filterGenre
        };
    
  

    default:
      return state;
  }
};

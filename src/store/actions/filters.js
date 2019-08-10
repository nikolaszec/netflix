import * as actionTypes from "../actionTypes";

export const filterByTitle = (title) => {

    return {
        type:actionTypes.FILTER_BY_TITLE,
        filterTitle:title
    }
}


export const filterByYear = (year) => {

    return {
        type:actionTypes.FILTER_BY_YEAR,
        filterYear:year
    }
}

export const filterByGenre = (genre) => {

    return {
        type:actionTypes.FILTER_BY_GENRE,
        filterGenre:genre
    }
}

export const filterByTitleSelector = state => {

    
    let moviesArr = state.moviesReducer.movies
    const filterRed = state.filterReducer

    if(filterRed.filterTitle){
        moviesArr = moviesArr.filter((movie)=>movie.title.toLowerCase().includes(filterRed.filterTitle.toLowerCase()))
    }else if(filterRed.filterGenre){
        moviesArr = moviesArr.filter((movie)=>movie.genres.map((genre)=>genre.toLowerCase()).includes(filterRed.filterGenre))
    }else if(filterRed.filterYear){
        if(filterRed.filterYear === 'most-recent'){
        
            moviesArr =  [...moviesArr.sort((a,b)=>(a.year > b.year)?-1:1)]
            
        }else if(filterRed.filterYear === 'oldest'){
            moviesArr =  [...moviesArr.sort((a,b)=>(a.year > b.year)?1:-1)]
        }else{
            moviesArr = [...moviesArr]
        }
    }

    return moviesArr
    

}
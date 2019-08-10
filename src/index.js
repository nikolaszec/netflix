import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {
    BrowserRouter
} from 'react-router-dom'
import {
    Provider
} from 'react-redux'
import {
    createStore,
    combineReducers,
    applyMiddleware,
    compose
} from 'redux'
import moviesReducer from './store/reducers/movies/movies'
import authReducer from './store/reducers/auth/auth'
import filterReducer from './store/reducers/filters/filters'
import thunk from 'redux-thunk'


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;



const rootReducer = combineReducers({
    moviesReducer: moviesReducer,
    authReducer: authReducer,
    filterReducer:filterReducer
})

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
))

const app = (
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

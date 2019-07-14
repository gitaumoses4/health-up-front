import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import axios from 'axios';
import rootReducer from '../reducers';
import rootSaga from '../middleware';

const token = localStorage.getItem('jwt-token');
if( token ) {
  axios.defaults.headers.common['Authorization'] = token;
}


const sagaMiddleware = createSagaMiddleware();
const tool = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const composeEnhancers = tool;
const middleware = composeEnhancers(applyMiddleware(sagaMiddleware));
const store = createStore(rootReducer, middleware);

sagaMiddleware.run(rootSaga);

export default store;

import { applyMiddleware, createStore, compose } from 'redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';

const middleware = [thunk];
/**
 * Process: store.dispatch => action => reducer => state
 * component need to be changed, it get state and aciont, then generate state
 * rootRedicer, it is used to give a new state after receive action, then view can start change, the process of calculate the state is called reducer
 * {} is the initial value
 * applyMiddleware will combine all middleware into a arrary
 */
const store = createStore(
  rootReducer,
  {},
  compose(
    applyMiddleware(...middleware),
    // debugging
    //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_REVTOLLS_EXTENSION__()
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
)

export default store;
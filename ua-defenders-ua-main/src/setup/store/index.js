import { combineReducers } from 'redux';
import { coursesReducer } from './courses/reducer';
// import { authorsReducer } from './authors/reducer';
import { projectReducer } from './projects/reducer';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

export const rootReducer = combineReducers({
	coursesReducer,
	projectReducer
});
export const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(thunk))
);

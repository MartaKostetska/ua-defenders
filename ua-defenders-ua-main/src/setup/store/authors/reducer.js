import {
	AUTHORS_SAVE_NEW_AUTHOR,
	AUTHORS_GET_AUTHOR,
	AUTHOR_LOAD_FETCH,
	AUTHOR_LOAD_RECEIVE,
	AUTHOR_LOAD_ERROR,
} from './actionTypes';

const initialState = [];

export const authorsReducer = (state = initialState, action) => {
	switch (action.type) {
		case AUTHORS_SAVE_NEW_AUTHOR:
			return [...state, action.payload];
		case AUTHORS_GET_AUTHOR:
			return [...action.payload];
		case AUTHOR_LOAD_FETCH:
			return state;
		case AUTHOR_LOAD_RECEIVE:
			return [...state, action.payload];
		case AUTHOR_LOAD_ERROR:
			alert('Bad request. Not found.');
			return state;
		default:
			return state;
	}
};

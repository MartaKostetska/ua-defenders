import {
	PROJECT_GET_PENDING,

	PROJECT_FETCH,
	PROJECT_ERROR,

} from './projectTypes';

export const initialState = [];

export const projectReducer = (state = initialState, action) => {
	switch (action.type) {
		case PROJECT_GET_PENDING:
			return action.payload;
		case PROJECT_FETCH:
			return state;
		case PROJECT_ERROR:
			alert('Bad request. Not found.');
			return state;
		default:
			return state;
	}
};

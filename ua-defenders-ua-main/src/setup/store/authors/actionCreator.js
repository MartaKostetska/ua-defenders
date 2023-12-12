import {
	AUTHORS_SAVE_NEW_AUTHOR,
	AUTHORS_GET_AUTHOR,
	AUTHOR_LOAD_FETCH,
	AUTHOR_LOAD_RECEIVE,
	AUTHOR_LOAD_ERROR,
} from './actionTypes';

export const saveNewAuthorCreator = (payload) => {
	return {
		type: AUTHORS_SAVE_NEW_AUTHOR,
		payload: payload,
	};
};

export const getAuthorCreator = (payload) => {
	return {
		type: AUTHORS_GET_AUTHOR,
		payload: payload,
	};
};

export const authorFetchPostCreator = () => {
	return {
		type: AUTHOR_LOAD_FETCH,
	};
};

export const authorReceivePostCreator = (post) => {
	return {
		type: AUTHOR_LOAD_RECEIVE,
		payload: post,
	};
};

export const authorReceiveErrorCreator = () => {
	return {
		type: AUTHOR_LOAD_ERROR,
	};
};

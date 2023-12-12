import {
	PROJECT_GET_PENDING,

	PROJECT_FETCH,
	PROJECT_ERROR,

} from './projectTypes';

export const savePendingProjectCreator = (payload) => {
	return {
		type: PROJECT_GET_PENDING,
		payload: payload,
	};
};


export const projectFetchPostCreator = () => {
	return {
		type: PROJECT_FETCH,
	};
};

export const projectErrorCreator = () => {
	return {
		type: PROJECT_ERROR,
	};
};


import {
	COURSES_SAVE_NEW_COURSE,
	COURSES_DELETE_COURSE,
	COURSES_GET_COURSE,
	COURSES_LOAD_FETCH,
	COURSES_LOAD_ERROR,
	COURSES_LOAD_RECEIVE_SAVE,
	COURSES_LOAD_RECEIVE_DELETE,
	COURSES_LOAD_RECEIVE_UPDATE,
} from './actionTypes';

export const saveNewCourseCreator = (payload) => {
	return {
		type: COURSES_SAVE_NEW_COURSE,
		payload: payload,
	};
};

export const deleteCourseCreator = (payload) => {
	return {
		type: COURSES_DELETE_COURSE,
		payload: payload,
	};
};

export const getCourseCreator = (payload) => {
	return {
		type: COURSES_GET_COURSE,
		payload: payload,
	};
};

export const coursesFetchPostCreator = () => {
	return {
		type: COURSES_LOAD_FETCH,
	};
};

export const coursesReceiveErrorCreator = () => {
	return {
		type: COURSES_LOAD_ERROR,
	};
};
export const coursesReceiveSavePostCreator = (post) => {
	return {
		type: COURSES_LOAD_RECEIVE_SAVE,
		payload: post,
	};
};

export const coursesReceiveDeletePostCreator = (id) => {
	return {
		type: COURSES_LOAD_RECEIVE_DELETE,
		payload: id,
	};
};
export const coursesReceiveUpdatePostCreator = (post) => {
	return {
		type: COURSES_LOAD_RECEIVE_UPDATE,
		payload: post,
	};
};

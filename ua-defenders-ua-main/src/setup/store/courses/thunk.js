import {
	coursesFetchPostCreator,
	coursesReceiveSavePostCreator,
	coursesReceiveErrorCreator,
	coursesReceiveDeletePostCreator,
	coursesReceiveUpdatePostCreator,
} from './actionCreator';
import { store } from '..';

export const coursesLoadThunkCreator = (postToAdd) => {
	const options = {
		method: 'POST',
		body: JSON.stringify(postToAdd),
		headers: {
			'Content-Type': 'application/json; charset=UTF-8',
			Authorization: localStorage.getItem('token'),
		},
	};
	store.dispatch(coursesFetchPostCreator());
	return function (dispatch) {
		return fetch(`http://localhost:4000/courses/add`, options)
			.then((data) => data.json())
			.then((data) => {
				if (data.statusText === 'Not Found') {
					throw new Error('No such user found!!');
				} else dispatch(coursesReceiveSavePostCreator(data.result));
			})
			.catch((err) => dispatch(coursesReceiveErrorCreator()));
	};
};

export const coursesDeleteThunkCreator = (idPostDelete) => {
	const options = {
		method: 'DELETE',
		headers: {
			Authorization: localStorage.getItem('token'),
		},
	};
	store.dispatch(coursesFetchPostCreator());
	return function (dispatch) {
		return fetch(`http://localhost:4000/courses/${idPostDelete}`, options)
			.then((data) => data.json())
			.then((data) => {
				if (data.statusText === 'Not Found') {
					throw new Error('No such user found!!');
				} else dispatch(coursesReceiveDeletePostCreator(idPostDelete));
			})
			.catch((err) => dispatch(coursesReceiveErrorCreator()));
	};
};
export const coursesUpdateThunkCreator = (postToUpdate) => {
	const options = {
		method: 'PUT',
		body: JSON.stringify(postToUpdate),
		headers: {
			'Content-Type': 'application/json; charset=UTF-8',
			Authorization: localStorage.getItem('token'),
		},
	};
	store.dispatch(coursesFetchPostCreator());
	return function (dispatch) {
		return fetch(`http://localhost:4000/courses/${postToUpdate.id}`, options)
			.then((data) => data.json())
			.then((data) => {
				if (data.statusText === 'Not Found') {
					throw new Error('No such user found!!');
				} else {
					dispatch(coursesReceiveUpdatePostCreator(data.result));
				}
			})
			.catch((err) => dispatch(coursesReceiveErrorCreator()));
	};
};

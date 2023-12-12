import {
	savePendingProjectCreator,
	projectFetchPostCreator,
	projectErrorCreator,

} from './projectCreator';
import { store } from '..';

export const projectPendingThunkCreator = () => {
	const options = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json; charset=UTF-8',
			'Authorization': `Bearer ${localStorage.getItem('token')}`,
		},
	};
	store.dispatch(projectFetchPostCreator());
	return function (dispatch) {
		return fetch(`http://localhost:8080/api/charityProject/pending`, options)
			.then((data) => data.json())
			.then((data) => {
				console.log(data);
				dispatch(savePendingProjectCreator(data.pendingProjects));
			})
			.catch((err) => dispatch(projectErrorCreator()));
	};
};

// export const coursesDeleteThunkCreator = (idPostDelete) => {
// 	const options = {
// 		method: 'DELETE',
// 		headers: {
// 			Authorization: localStorage.getItem('token'),
// 		},
// 	};
// 	store.dispatch(coursesFetchPostCreator());
// 	return function (dispatch) {
// 		return fetch(`http://localhost:4000/courses/${idPostDelete}`, options)
// 			.then((data) => data.json())
// 			.then((data) => {
// 				if (data.statusText === 'Not Found') {
// 					throw new Error('No such user found!!');
// 				} else dispatch(coursesReceiveDeletePostCreator(idPostDelete));
// 			})
// 			.catch((err) => dispatch(coursesReceiveErrorCreator()));
// 	};
// };
// export const coursesUpdateThunkCreator = (postToUpdate) => {
// 	const options = {
// 		method: 'PUT',
// 		body: JSON.stringify(postToUpdate),
// 		headers: {
// 			'Content-Type': 'application/json; charset=UTF-8',
// 			Authorization: localStorage.getItem('token'),
// 		},
// 	};
// 	store.dispatch(coursesFetchPostCreator());
// 	return function (dispatch) {
// 		return fetch(`http://localhost:4000/courses/${postToUpdate.id}`, options)
// 			.then((data) => data.json())
// 			.then((data) => {
// 				if (data.statusText === 'Not Found') {
// 					throw new Error('No such user found!!');
// 				} else {
// 					dispatch(coursesReceiveUpdatePostCreator(data.result));
// 				}
// 			})
// 			.catch((err) => dispatch(coursesReceiveErrorCreator()));
// 	};
// };

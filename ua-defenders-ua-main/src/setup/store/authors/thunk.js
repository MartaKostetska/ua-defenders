import {
	authorFetchPostCreator,
	authorReceivePostCreator,
	authorReceiveErrorCreator,
} from './actionCreator';
import { store } from '..';
import URL from '../../../common/helper/url';

export const authorLoadThunkCreator = (postToAdd, setAuthors) => {
	const options = {
		method: 'POST',
		body: JSON.stringify(postToAdd),
		headers: {
			'Content-Type': 'application/json; charset=UTF-8',
			Authorization: localStorage.getItem('token'),
		},
	};
	store.dispatch(authorFetchPostCreator());
	return function (dispatch) {
		return fetch(`${URL}/authors/add`, options)
			.then((data) => data.json())
			.then((data) => {
				if (data.statusText === 'Not Found') {
					throw new Error('No such user found!!');
				} else {
					dispatch(authorReceivePostCreator(data.result));
					setAuthors((prev) => [...prev, data.result]);
				}
			})
			.catch((err) => dispatch(authorReceiveErrorCreator()));
	};
};

import { useState } from 'react';

import URL from '../helper/url';

const useFetch = (typePost) => {
	const [responseData, setResponseData] = useState({});

	const fetchData = (dataForm) => {
		console.log(dataForm, typePost);
		fetch(`${URL}/api/auth/${typePost}`, {
			method: 'POST',
			body: JSON.stringify(dataForm),
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((response) => response.json())
			.then((post) => {
				setResponseData({ ...post });
			})
			.catch((error) => console.log(error));
	};
	return { responseData, fetchData };
};

export default useFetch;

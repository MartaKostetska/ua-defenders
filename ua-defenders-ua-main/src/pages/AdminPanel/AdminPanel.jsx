import React, { useState, useEffect } from 'react';
import Panel from './components/Panel';
import Feed from './components/Feed';
import styles from './adminPanel.module.css';

import URL from '../../common/helper/url';

const AdminPanel = () => {
	const [activeType, setActiveType] = useState('charityProject');
	const [data, setData] = useState([]);

	useEffect(() => {
		const options = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		};

		fetch(`${URL}/api/${activeType}/pending`, options)
			.then((data) => data.json())
			.then((data) => {
				console.log(data);
				const fieldName = Object.keys(data)[0];
				const fieldValue = data[fieldName];
				setData(fieldValue);
			})
			.catch((err) => console.log('error'));
	}, [activeType]);

	console.log(data);

	const handleCardMenuClick = (type) => {
		setActiveType(type);
	};

	return (
		<div>
			<Panel activeType={activeType} onCardMenuClick={handleCardMenuClick} />
			{data && data.length > 0 ? (
				<Feed data={data} typeCard={activeType} />
			) : (
				<p>No data to display.</p>
			)}
		</div>
	);
};

export default AdminPanel;
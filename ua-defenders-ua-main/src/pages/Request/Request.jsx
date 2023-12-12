import React, { useState, useEffect } from 'react';

import Button from '../../common/components/Button';
import CardMenu from '../../common/components/CardMenu';
import styles from './request.module.css'
import RequestFeed from './RequestFeed';
import FilterSelect from '../../common/components/FilterSelect';
import generateQueryString from '../../common/helper/generateQueryString';

import ProjectImg from '../../assets/images/project.png';
import { Link } from 'react-router-dom';

import URL from '../../common/helper/url';

const Request = () => {
	const [activeType, setActiveType] = useState('offers');
	const [data, setData] = useState([]);
	const [selectFilter, setSelectFilter] = useState({
		text: "",
		selectedOption: null,
	});
	const handleSelectFilter = (text, selectedOption) => {
		setSelectFilter({ text, selectedOption });
	};

	useEffect(() => {

		const options = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${localStorage.getItem('token')}`,
			},
		};

		fetch(`${URL}/api/helpRequest/${activeType}${generateQueryString(selectFilter)}`, options)
			.then((data) => data.json())
			.then((data) => {
				console.log(data);
				setData(data.receivedHelpRequests);
				console.log(`${URL}/api/helpRequest/${activeType}${generateQueryString()}`);
			})
			.catch((err) => console.log('error'));

	}, [activeType, selectFilter]);
	const handleTypeChange = (type) => {
		setActiveType(type);
	};
	return (
		<div className={styles.wrapper}>
			<div className={styles.main}>
				<div className={styles.menu}>
					<h1>
						Запити матеріальної допомоги
					</h1>
					<p>
						Наша мета: допомогти волонтерам, активним громадянам, які хочуть долучитися до ініціатив та людям, які потребують допомогу — знайти одне одного.
					</p>




					<div className={styles.buttons}>
						<Link to="/form-request-offer">
							<Button text="Надаю допомогу" />
						</Link>
						<Link to="/form-request-request">
							<Button text="Прошу допомоги" />
						</Link>
					</div>
				</div>

				<img className={styles.postimg} src={ProjectImg} alt="project" />

			</div>
			<FilterSelect text={selectFilter.text} option={selectFilter.selectedOption} handleFilter={handleSelectFilter} />


			<div className={styles.cklickers}>
				<h4 className={activeType === 'offers' ? styles.active : ''} onClick={() => handleTypeChange('offers')}>
					Пропозиції
				</h4>
				<h4 className={activeType === 'request' ? styles.active : ''} onClick={() => handleTypeChange('request')}>
					Прохання
				</h4>
			</div>
			<RequestFeed data={data} />
		</div>
	);
}

export default Request;
import React, { useState, useEffect } from 'react';

import Button from '../../common/components/Button';
import CardMenu from '../../common/components/CardMenu';
import styles from './project.module.css'
import ProjectFeed from './ProjectFeed/ProjectFeed';
import FilterSelect from '../../common/components/FilterSelect';
import generateQueryString from '../../common/helper/generateQueryString';

import ProjectImg from '../../assets/images/project.png';
import { Link } from 'react-router-dom';

import URL from '../../common/helper/url';

const Project = () => {
	// const [activeType, setActiveType] = useState('charityProject');
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

		fetch(`${URL}/api/charityProject${generateQueryString(selectFilter)}`, options)
			.then((data) => data.json())
			.then((data) => {
				console.log(data);
				setData(data.receivedCharityProjects);
			})
			.catch((err) => console.log('error'));

	}, [selectFilter]);

	return (
		<div className={styles.wrapper}>
			<div className={styles.main}>
				<div className={styles.menu}>
					<h1>
						Благодійні проекти
					</h1>
					<p>
						Ми відібрали пріоритетні проекти по забезпеченні наших військових. Зараз кожна гривня може врятувати чиєсь життя або суттєво допомогти. Приєднуйтесь!
					</p>
					<div className={styles.buttons}>
						<Link to="/form-project">
							<Button text="Подати заявку" />
						</Link>
					</div>
				</div>
				<img className={styles.postimg} src={ProjectImg} alt="project" />
			</div>
			<FilterSelect text={selectFilter.text} option={selectFilter.selectedOption} handleFilter={handleSelectFilter} />
			<ProjectFeed data={data} />
		</div>
	);
}

export default Project;
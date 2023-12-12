import React, { useState, useEffect } from 'react';

import Button from '../../common/components/Button';
import CardMenu from '../../common/components/CardMenu';
import styles from './warrior.module.css'
import WarriorFeed from './WarriorFeed/WarriorFeed';
// import InputSign from '../../common/components/InputSign/InputSign';
import FilterInput from '../../common/components/FilterInput';


import WarriorImg from '../../assets/images/warrior.png';
import { Link } from 'react-router-dom';

import URL from '../../common/helper/url';

const Warrior = () => {
	const [filter, setFilter] = useState('');
	const [data, setData] = useState([]);


	const generateNameStringQuery = () => filter.length === 0 ? '' : `?name=${filter}`;

	const handleChange = (e) => {
		setFilter(e.target.value);
	}
	useEffect(() => {

		const options = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${localStorage.getItem('token')}`,
			},
		};

		fetch(`${URL}/api/warriorRehabilitation${generateNameStringQuery()}`, options)
			.then((data) => data.json())
			.then((data) => {
				console.log(data);
				setData(data.receivedwarriorRehabilitation);
				console.log(`${URL}/api/warriorRehabilitation${generateNameStringQuery()}`);
			})
			.catch((err) => console.log('error'));

	}, [filter]);

	return (
		<div className={styles.wrapper}>
			<div className={styles.main}>
				<div className={styles.menu}>
					<h1>
						Реабілітація військових
					</h1>
					<p>
						Тут зібрана інформація щодо військових, які потребують нашої допомоги. Зараз кожна гривня може врятувати чиєсь життя або суттєво допомогти. Приєднуйтесь!
					</p>
					<div className={styles.buttons}>
						<Link to="/form-warrior">
							<Button text="Подати заявку, якщо ви військовий" />
						</Link>
					</div>
				</div>
				<img className={styles.postimg} src={WarriorImg} alt="project" />
			</div>
			<FilterInput handleFilter={handleChange} name='filter' />
			<WarriorFeed data={data} />
		</div>
	);
}

export default Warrior;
import React, { useState } from 'react';
import Stub from '../../../assets/images/stub.png';
import Button from '../Button';
import CardWrapper from '../../HOCS/CardWrapper';
import Modal from '../Modal';
import styles from './helpCard.module.css';

import URL from '../../helper/url';

const HelpCard = ({ id, img = Stub, category, contact, created_by, btnState = true, created_date, description, email, location, title, type }) => {
	const [btn, setBtn] = useState(btnState);

	const acceptRequest = async (id) => {

		const options = {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${localStorage.getItem('token')}`,
			},
		};
		console.log(`Bearer ${localStorage.getItem('token')}`);
		fetch(`${URL}/api/helpRequest/accept/${id}`, options)
			.then((data) => data.json())
			.then((data) => {
				console.log(data);
				setBtn(false);
			})
			.catch((err) => console.log('error'));

	};

	const rejectRequest = async (id) => {
		const options = {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${localStorage.getItem('token')}`,
			},
		};
		console.log(`Bearer ${localStorage.getItem('token')}`);
		fetch(`${URL}/api/helpRequest/reject/${id}`, options)
			.then((data) => data.json())
			.then((data) => {
				console.log(data);
				setBtn(false);
			})
			.catch((err) => console.log('error'));
	};
	return (
		<div className={styles.card}>
			<div className={styles.content}>
				<div className={styles.text}>
					<h1 className={styles.title}>{title}</h1>
					<p>{description}</p>
					<p>
						<span className={styles.static}>Контакти:</span> {contact}
					</p>
					{/* <p>
						<span className={styles.static}>Тип:</span> {type === 'offers' ? 'Пропоную допомогу' : 'Потребую допомигу'}
					</p> */}
				</div>
{/* 				<img className={styles.img} src={img} alt="vizualization" /> */}
			</div>
			<div className={styles.buttons}>
				<Modal name={title} detail={description} contact={contact} />
				{btn ? <div className="controllers">
					<Button className={styles.btn} text="Прийняти" fn={acceptRequest} id={id} />
					<Button className={styles.btn} text="Відхилити" fn={rejectRequest} id={id} />
				</div> : null}
			</div>
		</div>
	);
};

export default CardWrapper(HelpCard);
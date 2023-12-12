import React, { useState } from 'react';
import Stub from '../../../assets/images/stub.png';
import Button from '../Button';
import CardWrapper from '../../HOCS/CardWrapper';
import Modal from '../Modal';
import styles from './feedbackCard.module.css';

import URL from '../../helper/url';

const FeedbackCard = ({ id, img = Stub, email, message, contact, btnState = true }) => {
	const [btn, setBtn] = useState(btnState);



	const deleteRequest = async (id) => {

		const options = {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${localStorage.getItem('token')}`,
			},
		};
		console.log(`Bearer ${localStorage.getItem('token')}`);
		fetch(`${URL}/api/feedback/${id}`, options)
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
					<h1 className={styles.email}>{email}</h1>
					<p>{message}</p>
					<p>
						<span className={styles.static}>Контакти:</span> {contact}
					</p>
				</div>
{/* 				<img className={styles.img} src={img} alt="vizualization" /> */}
			</div>
			<div className={styles.buttons}>
				<Modal name={message} detail={contact} />
				{btn ? <div className="controllers">
					<Button className={styles.btn} text="Видалити" fn={deleteRequest} id={id} />
				</div> : null}
			</div>
		</div>
	);
};

export default CardWrapper(FeedbackCard);
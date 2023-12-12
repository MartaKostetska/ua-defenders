import React, { useState } from 'react';

import styles from './requestCard.module.css';

const RequestCard = ({ id, email, location, title, description, category, contact, status, type }) => {

	return (
		<div className={styles.card}>
			<div className={styles.content}>
				<div className={styles.text}>
					<h1 className={styles.title}>
						{title}
					</h1>
					<p>
						{description}
					</p>
					<p>
						<span className={styles.strong}>Контакти:</span>  {contact} {email}
					</p>
					<p className={styles.category}>{category}</p>
				</div>
			</div>
			{/* <Button text="Детальна інформація" /> */}
		</div>
	);
};

export default RequestCard;



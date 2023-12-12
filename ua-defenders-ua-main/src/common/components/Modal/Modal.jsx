import React, { useState } from "react";
import styles from './modal.module.css';

function Modal({ name = '', contact = '', detail = '', btn = 'Детальна інформація' }) {
	const [showModal, setShowModal] = useState(false);

	const handleOpenModal = () => {
		setShowModal(true);
	};

	const handleCloseModal = () => {
		setShowModal(false);
	};

	return (
		<div>
			<button className={styles.button} onClick={handleOpenModal}>{btn}</button>
			{showModal && (
				<div className={styles.modal}>
					<div className={styles.content}>
						<span className={styles.close} onClick={handleCloseModal}>
							&times;
						</span>
						<h1>{name}</h1>
						<p>{contact}</p>
						<p>{detail}</p>
						<button className={styles.button} onClick={handleCloseModal}>Закрити</button>
					</div>
				</div>
			)}
		</div>
	);
}

export default Modal;
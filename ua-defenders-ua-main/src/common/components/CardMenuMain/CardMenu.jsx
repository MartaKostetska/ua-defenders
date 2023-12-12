import React from 'react';
import Heart from '../../../assets/images/heart.png';
import styles from './cardMenu.module.css';

const CardMenu = ({ isActive, img = Heart, text, onClick }) => {
	const altName = `card-menu-${text}`;

	return (
		<div className={`${styles.card} ${isActive ? styles.active : ''}`} onClick={onClick}>
			<img className={styles.img} src={img} alt={altName} />
			<h5 className={styles.text}>{text}</h5>
		</div>
	);
};

export default CardMenu;
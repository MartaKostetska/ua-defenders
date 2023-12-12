import React from 'react';

import { Link } from 'react-router-dom';
import Button from '../../common/components/Button';

import styles from "./notFound.module.css";

const NotFound = () => {
	return (
		<div className={styles.container}>
			<h1 className={styles.title}>404</h1>
			<p className={styles.text}>Упс.. Схоже ви потрапили на неіснуючу сторінку</p>
			<Link to="/">
				<Button text="На головну" />
			</Link>
		</div>
	);
};

export default NotFound;
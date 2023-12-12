import React from 'react';

import styles from './cardWrapper.module.css'

function CardWrapper(WrappedComponent) {

	return function Wrapper(props) {
		return (
			<div className={styles.wrapper}>
				<WrappedComponent {...props} />
			</div>
		);
	}

}

export default CardWrapper;
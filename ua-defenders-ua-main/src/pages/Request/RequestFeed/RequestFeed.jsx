import React, { useState } from 'react';
import styles from './requestFeed.module.css';
// import CharityCard from '../../../common/components/CharityCard';
import RequestCard from '../../../common/components/RequestCard/RequestCard';
const RequestFeed = ({ data }) => {

	return (
		<div className={styles.wrapper}>
			<ul className={styles.list}>
				{data.map((item) => (
					<li key={item._id} className={styles.item}>
						<RequestCard
							id={item._id}
							location={item.location}
							title={item.title}
							description={item.description}
							category={item.category}
							contact={item.contact}
							status={item.status}
							type={item.type}
						/>
					</li>
				))}
			</ul>
		</div>
	);
};

export default RequestFeed;
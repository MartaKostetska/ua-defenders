import React, { useState } from 'react';
import styles from './warriorFeed.module.css';
import CharityCard from '../../../common/components/CharityCard';
import WarriorCard from '../../../common/components/WarriorCard/WarriorCard';
const WarriorFeed = ({ data }) => {

	return (
		<div className={styles.wrapper}>
			<ul className={styles.list}>
				{data.map((item) => (
					<li key={item._id} className={styles.item}>
						<WarriorCard
							img={item.img}
							btnState={false}
							id={item._id}
							name={item.name}
							history={item.history}
							location={item.location}
							militaryPoint={item.militaryPoint}
							cost={item.cost}
							details={item.details}
							status={item.status}
							contact={item.contact}
						/>
					</li>
				))}
			</ul>
		</div>
	);
};

export default WarriorFeed;
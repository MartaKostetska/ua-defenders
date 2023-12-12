import React, { useState } from 'react';
import styles from './projectFeed.module.css';
import CharityCard from '../../../common/components/CharityCard';

const ProjectFeed = ({ data }) => {

	return (
		<div className={styles.wrapper}>
			<ul className={styles.list}>
				{data.map((item) => (
					<li key={item._id} className={styles.item}>
						<CharityCard
							id={item._id}
							title={item.title}
							description={item.description}
							location={item.location}
							category={item.category}
							email={item.email}
							contact={item.contact}
							details={item.details}
							status={item.status}
							btnState={false}
						/>
					</li>
				))}
			</ul>
		</div>
	);
};

export default ProjectFeed;
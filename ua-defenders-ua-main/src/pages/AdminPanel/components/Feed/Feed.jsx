import React, { useState } from 'react';
import CharityCard from '../../../../common/components/CharityCard';
import WarriorCard from '../../../../common/components/WarriorCard';
// import HelpCard from '../../../../common/components/HelpCard';
import HelpCard from '../../../../common/components/HelpCard';
import FeedbackCard from '../../../../common/components/FeedbackCard';
// import RequestCard from '../../../../common/components/RequestCard';
import Button from '../../../../common/components/Button';
import styles from './feed.module.css';
const Feed = ({ data, typeCard }) => {
	const getCard = (item) => {
		switch (typeCard) {
			case 'charityProject':
				return (
					<CharityCard
						id={item._id}
						title={item.title}
						description={item.description}
						location={item.location}
						category={item.category}
						contact={item.contact}
						details={item.details}
						status={item.status}
						img={item.img}
						document={item.document}
					/>
				);
			case 'warriorRehabilitation':
				return (
					<WarriorCard
						id={item._id}
						name={item.name}
						history={item.history}
						location={item.location}
						militaryPoint={item.militaryPoint}
						sum={item.sum}
						details={item.details}
						status={item.status}
						contact={item.contact}
						img={item.img}
						document={item.document}
					/>
				);
			case 'helpRequest':
				return (
					<HelpCard
						id={item._id}
						category={item.category}
						contact={item.contact}
						created_by={item.created_by}
						created_date={item.created_date}
						description={item.description}
						location={item.location}
						title={item.title}
						type={item.type}
					/>
				);
			case 'feedback':
				return (
					<FeedbackCard
						id={item._id}
						contact={item.contact}
						message={item.message}
					/>
				);
			default:
				return null;
		}
	};

	return (
		<div className={styles.wrapper}>
			<ul className={styles.list}>
				{data.map((item) => (
					<li key={item._id} className={styles.item}>
						{getCard(item)}
					</li>
				))}
			</ul>
		</div>
	);
};

export default Feed;
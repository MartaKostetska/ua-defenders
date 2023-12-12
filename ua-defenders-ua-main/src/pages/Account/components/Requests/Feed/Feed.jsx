import React, { useState } from 'react';

import styles from './feed.module.css';
import CharityCard from "./components/CharityCard";
import WarriorCard from "./components/WarriorCard";
import HelpCard from "./components/HelpCard";

const Feed = ({ data, typeCard, handleDelete }) => {
	const getCard = (item) => {
		switch (typeCard) {
			case 'charityProject':
				return (
					<CharityCard
						id={item._id}
						title={item.title}
						description={item.description}
						sum={item.sum}
						details={item.details}
						img={item.img}
						document={item.document}
						handleDelete={handleDelete}
					/>
				);
			case 'warriorRehabilitation':
				return (
					<WarriorCard
						id={item._id}
						name={item.name}
						medicine={item.medicine}
						history={item.history}
						militaryPoint={item.militaryPoint}
						sum={item.sum}
						location={item.location}
						details={item.details}
						img={item.img}
						document={item.document}
						handleDelete={handleDelete}
					/>
				);
			case 'helpRequest':
				return (
					<HelpCard
						id={item._id}
						title={item.title}
						description={item.description}
						location={item.location}
						contact={item.contact}
						handleDelete={handleDelete}
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
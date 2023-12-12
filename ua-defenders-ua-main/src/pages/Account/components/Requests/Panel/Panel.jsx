import React from 'react';

import styles from './panel.module.css';
import CardMenu from "../../../../../common/components/CardMenu";

const Panel = ({ activeType, onCardMenuClick }) => {
	return ( <>
		<div class={styles.wrapper}>
			<CardMenu
				text="Благодійні Проекти"
				isActive={activeType === 'charityProject'}
				onClick={() => onCardMenuClick('charityProject')}
			/>
			<CardMenu
				text="Реабілітація військових"
				isActive={activeType === 'warriorRehabilitation'}
				onClick={() => onCardMenuClick('warriorRehabilitation')}
			/>
			<CardMenu
				text="Запити матеріальної допомоги"
				isActive={activeType === 'helpRequest'}
				onClick={() => onCardMenuClick('helpRequest')}
			/>
		</div>
			<div className={styles.line}></div>
		</>
	);
};

export default Panel;
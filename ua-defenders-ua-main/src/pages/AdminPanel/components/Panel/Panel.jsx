import React from 'react';
import CardMenu from '../../../../common/components/CardMenu';
import Button from '../../../../common/components/Button';
import styles from './panel.module.css';

const Panel = ({ activeType, onCardMenuClick }) => {
	return (
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
			<CardMenu
				text="Зворотній зв'язок"
				isActive={activeType === 'feedback'}
				onClick={() => onCardMenuClick('feedback')}
			/>
		</div>
	);
};

export default Panel;
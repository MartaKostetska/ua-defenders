import React from 'react';
import styles from './filterSelect.module.css'

const FilterSelect = ({ text, option, handleFilter }) => {

	const handleFilterInput = (e) => {
		handleFilter(e.target.value, option)
	}

	const handleFilterSelect = (e) => {
		handleFilter(text, e.target.value)
	}

	return (
		<div className={styles.container}>
			<input className={styles.input} type="text" value={text} onChange={handleFilterInput} placeholder="Локація" />
			<select className={styles.select} value={option} onChange={handleFilterSelect}>
				<option value="">Категорія</option>
				<option value="Автомобілі">Автомобілі</option>
				<option value="Бронежелети">Бронежелети</option>
				<option value="Тепловізори">Тепловізори</option>
				<option value="Військовий одяг">Військовий одяг</option>
				<option value="Рація">Рація</option>
				<option value="Генератори">Генератори</option>
				<option value="Дрони">Дрони</option>
				<option value="Медикаменти">Медикаменти</option>
				<option value="Військове спорядження">Військове спорядження</option>
				<option value="Інше">Інше</option>
			</select>
		</div>
	);
}

export default FilterSelect;
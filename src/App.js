import { useState } from 'react';
import styles from './App.module.css';
import { DateTime } from 'luxon';

function App() {
	const [values, addNewValue] = useState([]);
	const [userValue, setUserValue] = useState(null);
	const [isErrorMsg, hideErrorMsg] = useState(false);

	function onInputButtonClick() {
		const userValue = prompt('Введите значение');
		if (userValue?.length < 3) {
			hideErrorMsg(true);
			return;
		} else hideErrorMsg(false);
		const createDateTime = DateTime.now().toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS);
		setUserValue({ id: Date.now(), createDate: createDateTime, text: userValue });
	}
	function onAddButtonClick() {
		addNewValue([...values, userValue]);
		console.log(values);
		setUserValue(null);
	}

	const emptyListMessage = <p className={styles['no-margin-text']}>Нет добавленных элементов</p>;

	const valuesList = (
		<ul className={styles.list}>
			{values.map((value) => (
				<li className={styles['list-item']} key={value.id}>
					<span className={styles.createDate}>{value.createDate}</span>- <b>{value.text}</b>
				</li>
			))}
		</ul>
	);

	const errorMessage = <div className={styles.error}>Введенное значение должно содержать минимум 3 символа</div>;
	return (
		<div className={styles.app}>
			<h1 className={styles['page-heading']}>Ввод значения</h1>
			<p className={styles['no-margin-text']}>
				Текущее значение <code>value</code>: "
				<output className={styles['current-value']}>{userValue?.text}</output>"
			</p>
			{isErrorMsg && errorMessage}
			<div className={styles['buttons-container']}>
				<button className={styles.button} onClick={onInputButtonClick}>
					Ввести новое
				</button>
				<button className={styles.button} onClick={onAddButtonClick} disabled={!userValue?.text?.length}>
					Добавить в список
				</button>
			</div>
			<div className={styles['list-container']}>
				<h2 className={styles['list-heading']}>Список:</h2>
				{values.length === 0 ? emptyListMessage : valuesList}
			</div>
		</div>
	);
}

export default App;

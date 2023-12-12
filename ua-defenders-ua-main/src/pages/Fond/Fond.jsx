import React from 'react';

import Button from '../../common/components/Button';
import CardMenu from '../../common/components/CardMenu';
import styles from './fond.module.css'
import NationalBankFond from '../../assets/images/fond6.png';
import BackAliveFond from '../../assets/images/fond5.png';
import SosFond from '../../assets/images/fond4.png';
import UkrExportFond from '../../assets/images/fond3.png';
import PrytulaFond from '../../assets/images/fond2.png';
import FeniksWingsFond from '../../assets/images/fond1.png';
import Modal from '../../common/components/Modal';

const Fond = () => {
	return (
		<div className={styles.wrapper}>
			<h1>Фонди допомоги українським військовим</h1>
			<div className={styles.net}>
				<div className={styles.info}>
					<img className={styles.img} src={NationalBankFond} alt="Рахунок Національного банку України" />
					<div className={styles.content}>
						<h2>
							Рахунок Національного банку України
						</h2>
						<p>
							Національний банк України відкрив спеціальний рахунок для збору коштів на підтримку Збройних Сил України.За перші два тижні війни на цей рахунок було зібрано понад 11 мільйонів гривень.
						</p>
						<Modal btn='Реквізити' />
					</div>
				</div>
				<div className={styles.info}>
					<img className={styles.img} src={BackAliveFond} alt="Фонд «Повернись живим»" />
					<div className={styles.content}>
						<h2>
							Фонд «Повернись живим»
						</h2>
						<p>
							Організація не використовує кошти на закупівлю зброї. Її місія полягає виключно в постачанні технологій, навчання та боєприпасів, щоб допомогти врятувати життя українців і допомогти воїнам захищати Україну.
						</p>
						<Modal btn='Реквізити' />

					</div>
				</div>
				<div className={styles.info}>
					<img className={styles.img} src={SosFond} alt="Фонд «АРМІЯ SOS»" />
					<div className={styles.content}>
						<h2>
							Фонд «АРМІЯ SOS»
						</h2>
						<p>
							Громадська ініціатива АРМІЯ SOS допомагає Армії України у високотехнологічних напрямках – система управління та вогневої поразки «Кропива», повітряна розвідка та радіотехнічна розвідка.
						</p>
						<Modal btn='Реквізити' />

					</div>
				</div>
				<div className={styles.info}>
					<img className={styles.img} src={UkrExportFond} alt="ДК «Укрспецекспорт»" />
					<div className={styles.content}>
						<h2>
							ДК «Укрспецекспорт»
						</h2>
						<p>
							Направляти кошти на державний концерн «Укрспецекспорт» — це найшвидший спосіб для закупівлі озброєння, чим через будь-який фонд. Компанія має всі ліцензії та дозволи на закупівлю озброєння та військової техніки.
						</p>
						<Modal btn='Реквізити' />

					</div>
				</div>
				<div className={styles.info}>
					<img className={styles.img} src={PrytulaFond} alt="Благодійний фонд Сергія Притули" />
					<div className={styles.content}>
						<h2>
							Благодійний фонд Сергія Притули
						</h2>
						<p>
							Сергій Притула — відомий український телеведучій, якого обожнює вся країна. Він займається волонтерською допомогою українській армії з 2014 року, відколи росія почала окупацію Криму та Донбасу.
						</p>
						<Modal btn='Реквізити' />

					</div>
				</div>
				<div className={styles.info}>
					<img className={styles.img} src={FeniksWingsFond} alt="Крила Фенікса" />
					<div className={styles.content}>
						<h2>
							Фонд допомоги країні «Крила Фенікса»
						</h2>
						<p>
							Завдання Фонду - одягнути, взути, захистити та покращити Українську Армію у найкоротші терміни. До діючих підрозділів вже було доставлено тисячі касок, бронежилетів, сотні рацій, прицілів.
						</p>
						<Modal btn='Реквізити' />

					</div>
				</div>
			</div>
		</div>
	);
}

export default Fond;
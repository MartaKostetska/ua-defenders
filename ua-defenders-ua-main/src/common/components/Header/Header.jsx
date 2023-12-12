import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../../assets/svg/Logo.svg';
import { ReactComponent as Exit } from '../../../assets/svg/Exit.svg';
import { ReactComponent as Account } from '../../../assets/svg/Account.svg';
import styles from './header.module.css';
import { useAuth } from '../../hook/useAuth';

import URL from '../../helper/url';

const Header = () => {
	const { signout } = useAuth();
	const [isAdmin, setIsAdmin] = useState(false);

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const response = await fetch(`${URL}/api/users/me`, {
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				});
				if (response.ok) {
					const data = await response.json();
					setIsAdmin(data.user.type === 'admin');
				} else {
					signout();
				}
			} catch (error) {
				console.log(error);
			}
		};

		fetchUser();
	}, [signout]);

	const handleExit = () => {
		console.log('exit');
		signout();
	};

	return (
		<header className={styles.header}>
			<Link to="/">
				<Logo className={styles.logo} />
			</Link>
			{localStorage.length !== 0 && (<nav className={styles.nav}>
				<Link to="/about-us">Хто ми</Link>

				<Link to="/form-feedback">Зворотній зв'язок</Link>
				{isAdmin && (
					<Link to="/admin-panel" className={styles.adminPanel}>
						adminPanel
					</Link>
				)}
				{isAdmin && (
					<Link to="/">
						<Exit className={styles.exit} onClick={handleExit} />
					</Link>
				)}
				{!isAdmin && (
					<Link to="/account">
						<Account className={styles.exit} />
					</Link>
				)}
			</nav>)}
		</header>
	);
};

export default Header;
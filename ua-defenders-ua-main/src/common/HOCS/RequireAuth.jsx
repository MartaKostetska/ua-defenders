import React, { useState, useEffect } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../hook/useAuth';

import URL from '../helper/url';

const RequireAuth = ({ children }) => {
	const location = useLocation();
	const [authChecked, setAuthChecked] = useState(false);
	const { user, signout } = useAuth();

	useEffect(() => {
		const checkAuth = async () => {
			if (user) {
				try {
					console.log('try');
					const response = await fetch(`${URL}/api/users/me`, {
						headers: {
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${localStorage.getItem('token')}`
						}
					});
					if (!response.ok) {
						console.log('400');
						signout();
						setAuthChecked(true);
						return;
					}
				} catch (error) {
					console.log(error);
				}
			}

			if (!user) {
				console.log('try!user');
				setAuthChecked(true);
				return;
			}

			setAuthChecked(true);
		};

		checkAuth();
	}, [user, signout]);

	if (!authChecked) {
		console.log('!!authChecked');
		return null;
	}

	if (!user) {
		console.log('!user');
		return <Navigate to="../sign-in" state={{ from: location }} />;
	}

	return <>{children}</>;
};

export default RequireAuth;
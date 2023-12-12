import React from 'react';
import { createContext, useState } from 'react';

export const AuthContext = createContext(null);



export const AuthProvider = ({ children }) => {
	console.log('AuthProvider');
	const [user, setUser] = useState(null);

	const signin = (newUser, cb) => {

		setUser(newUser);
		cb();
	};
	const signout = () => {
		localStorage.clear();
		setUser(null);
	};

	const value = { user, signin, signout };

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

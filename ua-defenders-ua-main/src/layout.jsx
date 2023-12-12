import { Outlet } from 'react-router-dom';

import Header from './common/components/Header';
import Footer from './common/components/Footer';

const Layout = () => {
	return (
		<>
			<Header />

			<Outlet />
			{/* <Footer /> */}		</>
	)
}

export default Layout;
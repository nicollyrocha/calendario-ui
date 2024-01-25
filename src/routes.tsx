import { Route, BrowserRouter, Routes } from 'react-router-dom';

import { Login } from './pages/Login';
import { Home } from './pages/Home';

const RoutesApp = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route Component={Login} path='/' />
				<Route Component={Home} path='/home' />
			</Routes>
		</BrowserRouter>
	);
};

export default RoutesApp;

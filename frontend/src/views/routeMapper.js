import { Route, Routes } from 'react-router-dom';

import Login from './Login';
import Home from './Home';
import Error from '../components/Error.js';
import CreateNewUrl from './CreateNewUrl';
import useUserId from '../hooks/useUserId.js';
import { useLocation, Navigate } from 'react-router-dom';
import Register from './Register';
import EditUrl from './EditUrl';
function RequireAuth(props) {
	const id = useUserId();
	const location = useLocation();
	return id === null ? <Navigate to='/login' replace state={{ path: location.pathname }} /> : props.children;
}

export default function RouteMapper() {
	return (
		<div>
			<Routes>
				<Route path='*' element={<Error error={404} message='Not found' />} />
				<Route path='/login' element={<Login />} />
				<Route path='/register' element={<Register />} />
				<Route
					path='/'
					element={
						<RequireAuth>
							<Home />
						</RequireAuth>
					}
				/>
				<Route
					path='/new-url'
					element={
						<RequireAuth>
							<CreateNewUrl />
						</RequireAuth>
					}
				/>
				<Route
					path={`/editUrl/:id`}
					element={
						<RequireAuth>
							<EditUrl />
						</RequireAuth>
					}
				/>
			</Routes>
		</div>
	);
}

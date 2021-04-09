import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

import './App.css';

import { AuthProvider } from './context/auth';
import AuthRoute from './utils/AuthRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import MenuBar from './components/MenuBar';
import SinglePost from './pages/SinglePost';
import UserProfile from './pages/UserProfile';
import UsersPage from './pages/UsersPage';
import EditProfile from './pages/EditProfile';

function App() {
	return (
		<AuthProvider>
			<Router>
				<Container className='container'>
					<MenuBar />
					<Route exact path='/' component={Home} />
					<AuthRoute exact path='/login' component={Login} />
					<AuthRoute exact path='/register' component={Register} />
					<Route exact path='/posts/:postID' component={SinglePost} />
					<Route exact path='/user/:id' component={UserProfile} />
					<Route exact path='/user/:id/edit' component={EditProfile} />
					<Route exact path='/users/' component={UsersPage} />
				</Container>
			</Router>
		</AuthProvider>
	);
}

export default App;

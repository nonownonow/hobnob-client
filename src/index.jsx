import React from 'react'
import ReactDOM from 'react-dom'
import RegistrationForm from './components/Registration-form/index.jsx'
import LoginForm from './components/login-form/index.jsx'
import {BrowserRouter, Route} from 'react-router-dom'

ReactDOM.render(
	<BrowserRouter>
		<Route exact path="/register" component={RegistrationForm}/>
		<Route exact path="/login" component={LoginForm}/>
	</BrowserRouter>,
	document.getElementById('renderTarget')
)


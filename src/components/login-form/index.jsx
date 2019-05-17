import bcrypt from 'bcryptjs'
import { validator } from '../../utils'
import register from '../../utils/register'
import Button from '../button/index.jsx'
import Input from '../input/index.jsx'
import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'

class LoginForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      token: '',
      email: {
        value: '',
        valid: null,
      },
      password: {
        value: '',
        valid: null
      },
    }
  }

  getSalt = (email) => {
    const url = new URL('http://%%API_SERVER_HOST%%:%%API_SERVER_PORT%%/salt')
    url.search = new URLSearchParams({ email })
    const request = new Request(url, {
        method: 'GET',
        mode: 'cors',
      }
    )
    return fetch(request)
      .then(response => {
        if (response.status === 200) {
          return response.text()
        } else {
          throw new Error('Error retrieving salt')
        }
      })
  }
  logIn = (email, digest) => {
    console.log(email, digest)
    const url = 'http://%%API_SERVER_HOST%%:%%API_SERVER_PORT%%/login'
    const request = new Request(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      mode: 'cors',
      body: JSON.stringify({ email, digest })
    })
    return fetch(request)
      .then(response => {
        if (response.status === 200) {
          return response.text()
        } else {
          throw new Error('Error logging in')
        }
      })
  }
  handleLogin = (event) => {
    event.preventDefault()
    event.stopPropagation()
    const hasValidParams = this.state.email.valid && this.state.password.valid
    if (!hasValidParams) {
      console.error('Invalid Parameters')
      return
    }
    const email = this.state.email.value
    const password = this.state.password.value
    this.getSalt(email)
      .then(salt => {
        console.log(salt)
        return bcrypt.hashSync(password, salt)
      })
      .then(digest => {
        console.log(this)
        return this.logIn(email, digest)
      })
      .then(token => this.setState({ token }))
      .catch(console.error)
  }

  handleInputChange = (name, e) => {
    const value = e.target.value
    const valid = validator[name](value)
    this.setState({
      [name]: { value, valid },
    })
  }

  render () {
    if(this.state.token){
      return (
        <div id="login-success">
          <h1>You have logged in successfully!</h1>
          <p>Where do you want to go next?</p>
          <Link to='/'><Button title="Home"></Button></Link>
          <Link to='/profile'><Button title="Profile"></Button></Link>
        </div>
      )
    }else {
      return [
        <form onSubmit={this.handleLogin}>
          <Input id="email" label="Email" type="email" name="email" value={this.state.email.value}
                 valid={this.state.email.valid} onChange={this.handleInputChange}/>
          <Input id="password" label="Password" type="password" name="password" value={this.state.password.value}
                 valid={this.state.password.valid} onChange={this.handleInputChange}/>
          <Button id="login-button" title="login" disabled={!(this.state.email.valid && this.state.password.valid)}/>
        </form>,
        <p>Don't have an account? <Link to='/register'>Register</Link></p>
      ]
    }
  }
}

export default LoginForm

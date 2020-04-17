import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import axios from 'axios';
import { 
  changeUsername,
  changePassword, 
  changeSigninState, 
  validateUsername, 
  validatePassword 
} from '../redux/actions'


const mapStateToProps = (state) => {
  return({ 
    username: state.userInfo.username,
    password: state.userInfo.password,
    isSignedin: state.userInfo.isSignedin,
    usernameErr: state.errors.usernameErr,
    passwordErr: state.errors.passwordErr
  })
}

const mapDispatchToProps = (dispatch) => {
  return({ 
    onUsernameChange: (event) => dispatch(changeUsername(event.target.value)),
    onPasswordChange: (event) => dispatch(changePassword(event.target.value)),
    onRegister: () => dispatch(changeSigninState()),
    validateUsername: (text) => dispatch(validateUsername(text)),
    validatePassword: (text) => dispatch(validatePassword(text))
  })
}

class Signin extends Component {
  validate = () => {
    const { username,password,validateUsername,validatePassword } = this.props
    if(!username && !password) {
      validateUsername('Username is required!')
      validatePassword('password is required!')
    }
    else if(!username){
      validateUsername('Username is required!')
      validatePassword('')
    } 
    else if(!password){
      validatePassword('password is required!')
      validateUsername('')
    } 
    else {
      validatePassword('')
      validateUsername('')
      return true;
    }
    return false;
  }

  onFormSubmit = (e) =>{
    e.preventDefault();
    const {username,password,onRegister,history,validateUsername} = this.props
    if(this.validate()) {
      axios.post('http://localhost:4000/signin', {
        username: username,
        password: password
      })
      .then(data => {
        onRegister()
        history.push('/chat')
      })
      .catch(err => {
        if(err.response){
          validateUsername(err.response.data)
        } else {
          validateUsername('Please try again later!')
        }
      });
    }
  }
  
  render(){
    const { usernameErr, onUsernameChange, passwordErr, onPasswordChange } = this.props
    return (
      <div className='container-sm'>
        <h1>Sign In</h1>
        <form className='' onSubmit={this.onFormSubmit}>
          <small className='text-danger'>{usernameErr}</small>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Username</label>
            <input 
              onChange={onUsernameChange}
              name='username'
              type="text" 
              className="form-control" 
              aria-describedby="emailHelp" 
            />
          </div>
          <small className='text-danger'>{passwordErr}</small>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input 
              onChange={onPasswordChange}
              name='password'
              type="password" 
              className="form-control" 
              id="exampleInputPassword1" 
            />
          </div>
          <button type="submit" className="btn btn-primary">Sign In</button>
          <div>
            <Link to="/register">Don't have an account? Sign Up</Link>
          </div> 
        </form>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Signin));
import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import axios from 'axios';
import { 
  changeUsername, 
  changePassword, 
  changePasswordConfirmation,
  changeSigninState,
  validateUsername,
  validatePassword,
  validatePasswordConfirmation
} from '../redux/actions'



const mapStateToProps = (state) => {
  return ({
    username: state.userInfo.username,
    password: state.userInfo.password,
    passwordConfirmation: state.userInfo.passwordConfirmation,
    isSignedin: state.userInfo.isSignedin,
    usernameErr: state.errors.usernameErr,
    passwordErr: state.errors.passwordErr,
    passwordConfirmationErr: state.errors.passwordConfirmationErr
  })
}

const mapDispatchToProps = (dispatch) => {
  return ({
    onUsernameChange: (event) => dispatch(changeUsername(event.target.value)),
    onPasswordChange: (event) => dispatch(changePassword(event.target.value)),
    onPasswordConfirmationChange: (event) => dispatch(changePasswordConfirmation(event.target.value)),
    onRegister: () => dispatch(changeSigninState()),
    validateUsername: (text) => dispatch(validateUsername(text)),
    validatePassword: (text) => dispatch(validatePassword(text)),
    validatePasswordConfirmation: (text) => dispatch(validatePasswordConfirmation(text))
  })
}


class Register extends Component {

  validate = () => {
    const {username, password, passwordConfirmation, validateUsername, validatePassword, validatePasswordConfirmation  } = this.props
    if(!username && !password && !passwordConfirmation) {
      validateUsername('Username is required!')
      validatePassword('password is required!')
      validatePasswordConfirmation('password Confirmation is required!')
    }
    else if(!username){
      validateUsername('Username is required!')
      validatePassword('')
      validatePasswordConfirmation('')
    } 
    else if(!password){
      validatePassword('password is required!')
      validateUsername('')
    } 
    else if(!passwordConfirmation){
      validatePasswordConfirmation('password Confirmation is required!')
      validatePassword('')
    } 
    else if (password !== passwordConfirmation) {
      validatePasswordConfirmation('password confirmation is not correct!')
    }
    else {
      validatePassword('')
      validateUsername('')
      validatePasswordConfirmation('')
      return true;
    }
    return false;
  }

  onFormSubmit = (e) =>{
    e.preventDefault();
    const { username, password, onRegister, history, validateUsername } = this.props
    if(this.validate()) {
      axios.post('https://fathomless-taiga-86436.herokuapp.com/register', {
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
    const { usernameErr, onUsernameChange, passwordErr, onPasswordChange, passwordConfirmationErr, onPasswordConfirmationChange } = this.props
    return (
      <div className='container'>
        <h1>Register</h1>
        <form className='w-75' onSubmit={this.onFormSubmit}>
          <small className='text-danger'>{usernameErr}</small>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Username</label>
            <input 
              onChange={onUsernameChange}
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
            />
          </div>
          <small className='text-danger'>{passwordConfirmationErr}</small>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Confirm Password</label>
            <input 
              onChange={onPasswordConfirmationChange}
              name='confirmPassword'
              type="password" 
              className="form-control" 
            />
          </div>
          <button type="submit" className="btn btn-primary">Register</button>
          <div>
            <Link to="/">Already have an account? Sign In</Link>
          </div> 
        </form>
      </div>
    );
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Register)) 
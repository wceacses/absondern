import React from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import {reactLocalStorage} from 'reactjs-localstorage'

import { auth } from '../../firebase/firebase.utils';
import Hypnosis from "../../loader";

import './sign-in.styles.scss';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      datafetched: true,
    };
  }

  handleSubmit = async event => {
    event.preventDefault();
    this.setState({ datafetched: false });
    const { email, password } = this.state;

    try {
      reactLocalStorage.removeItem("timer")
      await auth.signInWithEmailAndPassword(email, password);
      this.setState({ email: '', password: '' });
      this.setState({ datafetched: true });
    } catch (error) {
      this.setState({ datafetched: true });
      alert("Email Id or Passsword Didn't Match In Our Record, Please Check Again");
      // //console.log(error);
    }
  };

  handleChange = event => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
  };

  render() {
    const { datafetched } = this.state;
    if (!datafetched) {
      return ( <Hypnosis />)
    } else
      return (
        <div className='sign-in'>
          <h2>All the best, enjoy the story</h2>
          <span>Sign in with your email and password</span>

          <form onSubmit={this.handleSubmit}>
            <FormInput
              name='email'
              type='email'
              handleChange={this.handleChange}
              value={this.state.email}
              label='email'
              required
            />
            <FormInput
              name='password'
              type='password'
              value={this.state.password}
              handleChange={this.handleChange}
              label='password'
              required
            />
            <div className='buttons'>
              <CustomButton type='submit'> Sign in </CustomButton>
              {/* <CustomButton onClick={signInWithGoogle} isGoogleSignIn>
              Sign in with Google
            </CustomButton> */}
            </div>
          </form>
        </div>
      );
  }
}

export default SignIn;

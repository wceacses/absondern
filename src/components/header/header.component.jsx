import React from 'react';
import { Link } from 'react-router-dom';

import { auth } from '../../firebase/firebase.utils';

import { ReactComponent as Logo } from '../../assets/crown.svg';
import Timer from '../timer/timer'

import './header.styles.scss';

const Header = ({ totalTime,displayName,score,email }) => (
  <div className='header'>
    <Link className='logo-container' to='/level1'>
      <Logo className='logo' />
    </Link>
    {
        console.log("from Header")
    }
   
    <div className='options'>
      {email? (
          <div className='option'>
             <Timer uid={totalTime}></Timer>
          </div>
        ) :null
      }
      <div className='option'>
        {displayName}
      </div>
      <div className='option'>
       {score}
      </div>
      {email? (
        <div className='option' onClick={() => auth.signOut()}>
          <a href="/">SIGN OUT</a>
        </div>
      ) : (
        <Link className='option' to='/'>
          SIGN IN
        </Link>
      )}
    </div>
  </div>
);

export default Header;

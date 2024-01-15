import React from 'react';
import styles from './SignUpConfirmation.module.css';
import { Link } from 'react-router-dom';

function SignUpConfirmation({setSignUpSuccess}) {

  const handleLinkClick = () => {
    setSignUpSuccess(false)
  }
  return (
    <div className={styles.signUpConfirmModal}>
      Sign up Successful!
      Click <Link onClick={handleLinkClick} to='/'>here</Link> to return to the home page where you can log in.
    </div>
  )
}

export default SignUpConfirmation;
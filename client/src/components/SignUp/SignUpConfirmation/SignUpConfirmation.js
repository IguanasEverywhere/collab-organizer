import React from 'react';
import styles from './SignUpConfirmation.module.css';
import { Link } from 'react-router-dom';

function SignUpConfirmation({setSignUpSuccess}) {

  const handleLinkClick = () => {
    setSignUpSuccess(false)
  }
  return (
    <div className={styles.signUpConfirmModal}>
      <h1>🎉 🎹 🎉</h1>
      <h2>Sign up Successful!</h2>
      <p>Click <Link onClick={handleLinkClick} to='/'>here</Link> to return to the home page where you can log in.</p>

    </div>
  )
}

export default SignUpConfirmation;
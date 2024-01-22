import React, { useState, useEffect } from 'react';
import * as yup from "yup";
import { useFormik } from "formik";
import SignUpConfirmation from './SignUpConfirmation/SignUpConfirmation';
import styles from './SignUp.module.css';
import Backdrop from '../Backdrop/Backdrop';
import { useHistory } from 'react-router-dom';

function SignUp() {


  // redirect to welcome page if user already logged in if they access signup directly for some reason
  const history = useHistory();

  useEffect(() => {
    fetch('/api/check-session')
      .then(r => r.json()).then(response => {
        if (response) {
          history.push('/welcome')
        }
      })
  })

  const [signUpSuccess, setSignUpSuccess] = useState(false)

  const signUpSchema = yup.object().shape({
    username: yup.string().required().min(4),
    password: yup.string().required().min(5),
    organization: yup.string().required(),
  })

  const signUpFormik = useFormik({
    initialValues: {
      username: '',
      password: '',
      organization: '',
    },
    validationSchema: signUpSchema,
    onSubmit: (values) => {
      fetch('/api/coordinator', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      }).then(r => r.json())
        .then(signedUpData => {
          console.log(signedUpData)
          setSignUpSuccess(true)
        })
    }
  })


  return (
    <div className={styles.signUpBody}>
      <h2>Sign up for your free PianOrganizer account today!</h2>
      <form className={styles.signUpForm} onSubmit={signUpFormik.handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          name="username"
          onChange={signUpFormik.handleChange}
          value={signUpFormik.values.username}>
        </input>
        <small>{signUpFormik.errors.username}</small>

        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          onChange={signUpFormik.handleChange}
          value={signUpFormik.values.password}>
        </input>
        <small>{signUpFormik.errors.password}</small>

        <label htmlFor="organization">Organization</label>
        <input
          id="organization"
          name="organization"
          onChange={signUpFormik.handleChange}
          value={signUpFormik.values.organization}>
        </input>
        <small>{signUpFormik.errors.organization}</small>

        <button type="submit">Sign Up</button>
        {signUpSuccess ?
          <>
            <Backdrop />
            <SignUpConfirmation setSignUpSuccess={setSignUpSuccess} />
          </>
          : null}

      </form>

    </div>
  )
}

export default SignUp;
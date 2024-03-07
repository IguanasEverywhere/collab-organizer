import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch } from 'react-redux';
import { changeLoggedInUser } from '../../reduxSlices/loggedInUserSlice';
import styles from './Login.module.css';


function Login() {

  const dispatch = useDispatch();

  const [failedLogin, setFailedLogin] = useState(false);

  const schema = yup.object().shape({
    username: yup.string().required("Please enter username"),
    password: yup.string().required("Please enter password")
  })


  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      fetch('/api/login', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      }).then(r => {
        console.log(r);
        if (r.status !== 200) {
          setFailedLogin(true)
        } else {
          setFailedLogin(false)
          return r.json()
        }

      })
        .then(loggedInCoord => dispatch(changeLoggedInUser(loggedInCoord)))
    }
  })



  return (
    <div className={styles.loginBody}>
      <form className={styles.formBody} onSubmit={formik.handleSubmit}>
        <input
          id="username"
          name="username"
          placeholder="username"
          onChange={formik.handleChange}
          value={formik.values.username}>
        </input>


        <input
          id="password"
          name="password"
          placeholder="password"
          onChange={formik.handleChange}
          value={formik.values.password}>
        </input>

        <button type="submit">Login</button>

      </form>
      <small>{formik.errors.username} </small>
      <small>{formik.errors.password}</small>
      {failedLogin ? <small>Login failed! Please try again</small> : null}
    </div>
  )
}

export default Login;
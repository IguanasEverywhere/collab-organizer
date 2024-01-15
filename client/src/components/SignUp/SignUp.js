import React from 'react';
import * as yup from "yup";
import { useFormik } from "formik";

function SignUp() {

  // we may need to check login status first in case a user navigates here manually for some reason while already logged in

  // add more validation to shape for length of input, etc

  const signUpSchema = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required(),
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
      }).then (r => r.json())
      .then(signedUpData => console.log(signedUpData))
    }
  })

  return (
    <div>
      <form onSubmit={signUpFormik.handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
        id="username"
        name="username"
        onChange={signUpFormik.handleChange}
        value={signUpFormik.values.username}>
        </input>

        <label htmlFor="password">Password</label>
        <input
        id="password"
        name="password"
        onChange={signUpFormik.handleChange}
        value={signUpFormik.values.password}>
        </input>

        <label htmlFor="organization">Organization</label>
        <input
        id="organization"
        name="organization"
        onChange={signUpFormik.handleChange}
        value={signUpFormik.values.organization}>
        </input>

        <button type="submit">Sign Up</button>

      </form>
    </div>
  )
}

export default SignUp;
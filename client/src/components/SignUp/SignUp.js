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
      Sign up
    </div>
  )
}

export default SignUp;
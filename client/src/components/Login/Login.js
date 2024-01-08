import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch } from 'react-redux';
import { changeLoggedInUser } from '../../reduxSlices/loggedInUserSlice';


function Login() {

  const dispatch = useDispatch();

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
      fetch('api/login', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      }).then(r => r.json())
        .then(loggedInCoord => dispatch(changeLoggedInUser(loggedInCoord)))
    }
  })



  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <input
          id="username"
          name="username"
          placeholder="username"
          onChange={formik.handleChange}
          value={formik.values.username}>
        </input>
        <p>{formik.errors.username}</p>

        <input
          id="password"
          name="password"
          placeholder="password"
          onChange={formik.handleChange}
          value={formik.values.password}>
        </input>
        <p>{formik.errors.password}</p>

        <button type="submit">Login!</button>

      </form>
    </div>
  )
}

export default Login;
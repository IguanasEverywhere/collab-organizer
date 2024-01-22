import React from 'react';
import Backdrop from '../../Backdrop/Backdrop';
import lightStyles from './NewStudentModalLight.module.css';
import darkStyles from './NewStudentModalDark.module.css';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

function NewStudentModal({ setModalVisible }) {

  const history = useHistory();

  const viewMode = useSelector(state => state.viewMode.value)
  const currentStyle = viewMode === "light" ? lightStyles : darkStyles

  const newStudentSchema = yup.object().shape({
    name: yup.string().required(),
    instrument: yup.string().required(),
    teacher: yup.string().required(),
    email: yup.string().email().required(),
  })

  const studentFormik = useFormik({
    initialValues: {
      name: "",
      instrument: "",
      teacher: "",
      email: ""
    },
    validationSchema: newStudentSchema,
    onSubmit: (values) => {
      fetch('/api/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      }).then(r => r.json()).then(newStudent => {
        setModalVisible((prevVis) => !prevVis);
        history.go(0)
      })
    }
  })

  const handleCloseClick = () => {
    setModalVisible((prevVis) => !prevVis)
  }

  return (
    <div className={currentStyle.modalContainer}>
      <Backdrop />
      <div className={currentStyle.modalBody}>
        <div className={currentStyle.closeBtnArea}>
          <button onClick={handleCloseClick} className={currentStyle.closeBtn}>
            &nbsp;X&nbsp;
          </button>
        </div>
        <form onSubmit={studentFormik.handleSubmit}>
          <label htmlFor="name">Student Name</label>
          <input
            name="name"
            id="name"
            onChange={studentFormik.handleChange}
            value={studentFormik.values.name}></input>
          <small>{studentFormik.errors.name}</small>

          <label htmlFor="email">Student Email</label>
          <input
            name="email"
            id="email"
            onChange={studentFormik.handleChange}
            value={studentFormik.values.email}></input>
          <small>{studentFormik.errors.email}</small>

          <label htmlFor="instrument">Instrument</label>
          <input
            name="instrument"
            id="instrument"
            onChange={studentFormik.handleChange}
            value={studentFormik.values.instrument}></input>
          <small>{studentFormik.errors.instrument}</small>

          <label htmlFor="teacher">Teacher Name</label>
          <input
            name="teacher"
            id-="teacher"
            onChange={studentFormik.handleChange}
            value={studentFormik.values.teacher}></input>
          <small>{studentFormik.errors.teacher}</small>

          <button className={currentStyle.submitBtn} type="submit">Add New Student</button>

        </form>
      </div>
    </div>
  )
}

export default NewStudentModal;
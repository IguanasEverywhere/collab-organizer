import React from 'react';
import lightStyles from './NewPianistModalLight.module.css';
import darkStyles from './NewPianistModalDark.module.css';
import Backdrop from '../../Backdrop/Backdrop';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';


function NewPianistModal({ setModalVisible }) {

  const history = useHistory();

  const viewMode = useSelector(state => state.viewMode.value)
  const currentStyle = viewMode === "light" ? lightStyles : darkStyles

  const newPianistSchema = yup.object().shape({
    name: yup.string().required(),
    role: yup.string().required(),
    email: yup.string().email().required(),
  })

  const pianistFormik = useFormik({
    initialValues: {
      name: '',
      role: 'staff',
      email: ''
    },
    validationSchema: newPianistSchema,
    onSubmit: (values) => {
      fetch('/api/pianists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      }).then(r => r.json()).then(newPianist => history.go(0))
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
        <form onSubmit={pianistFormik.handleSubmit}>

          <label htmlFor="name">Pianist Name</label>
          <input
            id="name"
            name="name"
            value={pianistFormik.name}
            onChange={pianistFormik.handleChange}></input>
          <small>{pianistFormik.errors.name}</small>

          <label htmlFor="role">Pianist Role</label>
          <select
            id="role"
            name="role"
            value={pianistFormik.role}
            onChange={pianistFormik.handleChange}>
            <option>staff</option>
            <option>student</option>
            <option>TA</option>
          </select>

          <label htmlFor="email">Pianist Email</label>
          <input
            id="email"
            name="email"
            value={pianistFormik.email}
            onChange={pianistFormik.handleChange}></input>
          <small>{pianistFormik.errors.email}</small>


          <button className={currentStyle.submitBtn} type="submit">Add New Pianist</button>

        </form>

      </div>
    </div>
  )
}

export default NewPianistModal;
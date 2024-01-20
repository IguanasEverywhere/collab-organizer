import React from 'react';
import styles from './NewPianistModal.module.css';
import Backdrop from '../../Backdrop/Backdrop';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';

function NewPianistModal({ setModalVisible }) {

  const history = useHistory();

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
    <div className={styles.modalContainer}>
      <Backdrop />
      <div className={styles.modalBody}>
        <div className={styles.closeBtnArea}>
          <button onClick={handleCloseClick} className={styles.closeBtn}>
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


          <button className={styles.submitBtn} type="submit">Add New Pianist</button>

        </form>

      </div>
    </div>
  )
}

export default NewPianistModal;
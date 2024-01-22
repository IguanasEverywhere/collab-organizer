import React from "react";
import lightStyles from './ConfirmDeleteModalLight.module.css';
import darkStyles from './ConfirmDeleteModalDark.module.css';
import { useParams, useHistory } from 'react-router-dom';
import Backdrop from '../Backdrop/Backdrop';
import { useSelector } from 'react-redux';

function ConfirmDeleteModal({ setDeleteModalVisible }) {

  const params = useParams();
  const history = useHistory();

  const viewMode = useSelector(state => state.viewMode.value)
  const currentStyle = viewMode === "light" ? lightStyles : darkStyles

  const handleCancelClick = () => {
    setDeleteModalVisible((modalVisible) => !modalVisible)
  }

  const handleYesClick = () => {
    fetch(`/api/events/${params.id}`, {
      method: 'DELETE'
    }).then(r => r.json()).then(confirmation => history.push('/events'))
  }

  return (
    //put backdrop here
    <>
      <Backdrop />
      <div className={currentStyle.modalBody}>
        <h3>Are you sure you want to delete this event?</h3>
        <div className={currentStyle.buttonsArea}>
          <button onClick={handleYesClick}>Yes</button>
          <button onClick={handleCancelClick}>Cancel</button>
        </div>
      </div>
    </>
  )
}

export default ConfirmDeleteModal;
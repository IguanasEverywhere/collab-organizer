import React from "react";
import lightStyles from './ConfirmDeleteModalLight.module.css';
import {useParams, useHistory} from 'react-router-dom';

function ConfirmDeleteModal({ setDeleteModalVisible }) {

  const params = useParams();
  const history = useHistory();

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
    <div className={lightStyles.modalBody}>
      <h3>Are you sure you want to delete this event?</h3>
      <button onClick={handleYesClick}>Yes</button>
      <button onClick={handleCancelClick}>Cancel</button>
    </div>
  )
}

export default ConfirmDeleteModal;
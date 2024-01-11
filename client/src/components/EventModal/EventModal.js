import React from 'react';
import lightStyles from './EventModalLight.module.css';
import Backdrop from '../Backdrop/Backdrop';

function EventModal({setModalVisible}) {

  function handleClose() {
    setModalVisible((modalVisible) => !modalVisible)
  }

  return (
    <>
      <Backdrop />
      <div className={lightStyles.modalBody}>
        <form>
          <input></input>
        </form>
        <button onClick={handleClose}>Close</button>
      </div>
    </>
  )
}

export default EventModal;
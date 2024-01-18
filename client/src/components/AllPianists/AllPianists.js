import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import darkStyles from './AllPianistsDark.module.css';
import lightStyles from './AllPianistsLight.module.css';
import { Link } from 'react-router-dom';
import NewPianistModal from './NewPianistModal/NewPianistModal';

function AllPianists() {

  const [allPianists, setAllPianists] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const viewMode = useSelector(state => state.viewMode.value)
  const coordinator = useSelector(state => state.loggedInUser.value)

  useEffect(() => {
    fetch('/api/pianists')
      .then(r => r.json())
      .then(pianistData => setAllPianists(pianistData))
  }, [])

  const currentStyle = viewMode === "light" ? lightStyles : darkStyles

  const handleAddNewClick = () => {
    setModalVisible((prevVisibility) => !prevVisibility)
  }

  return (
    <div className={currentStyle.mainBody}>
      {modalVisible ? <NewPianistModal /> : null}
      <h1>All pianists for coordinator: {coordinator.payload.username}</h1>
      <div className={currentStyle.pianistsListingArea}>
        <button onClick={handleAddNewClick} className={currentStyle.addNewBtn}>Add New Pianist</button>
        {allPianists.map((pianist) => <Link to={`/pianists/${pianist.id}`}
          key={pianist.id}
          className={currentStyle.pianistListing}
        >{pianist.name}
        </Link>)}
      </div>
    </div>
  )
}

export default AllPianists;
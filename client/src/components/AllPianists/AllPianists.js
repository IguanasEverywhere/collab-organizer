import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import darkStyles from './AllPianistsDark.module.css';
import lightStyles from './AllPianistsLight.module.css';

function AllPianists() {

  const [allPianists, setAllPianists] = useState([]);

  const viewMode = useSelector(state => state.viewMode.value)
  const coordinator = useSelector(state => state.loggedInUser.value)

  useEffect(() => {
    fetch('/api/pianists')
      .then(r => r.json())
      .then(pianistData => setAllPianists(pianistData))
  }, [])

  const currentStyle = viewMode === "light" ? lightStyles : darkStyles

  return (
    <div className={currentStyle.mainBody}>
      <h1>All pianists</h1>
      <div className={currentStyle.pianistsListingArea}>
        {allPianists.map((pianist) => <div
        key={pianist.id}
        className={currentStyle.pianistListing}
        >{pianist.name}
        </div>)}
      </div>
      <h2>{coordinator.payload.username}</h2>
    </div>
  )
}

export default AllPianists;
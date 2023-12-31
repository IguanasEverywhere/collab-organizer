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
      <h4>{viewMode}</h4>
      <ul>
        {allPianists.map((pianist) => <li key={pianist.id}>{pianist.name}</li>)}
      </ul>
      <h2>{coordinator.payload.username}</h2>
    </div>
  )
}

export default AllPianists;
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function AllPianists() {

  const [allPianists, setAllPianists] = useState([]);

  const viewMode = useSelector(state => state.viewMode.value)

  useEffect(() => {
    fetch('/api/pianists')
      .then(r => r.json())
      .then(pianistData => setAllPianists(pianistData))
  }, [])

  return (
    <div>
      <h1>All pianists</h1>
      <h4>{viewMode}</h4>
      <ul>
        {allPianists.map((pianist) => <li key={pianist.id}>{pianist.name}</li>)}
      </ul>
    </div>
  )
}

export default AllPianists;
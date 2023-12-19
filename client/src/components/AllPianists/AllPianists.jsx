import React, { useEffect, useState } from 'react';

function AllPianists() {

  const [allPianists, setAllPianists] = useState([]);

  useEffect(() => {
    fetch('/api/pianists')
      .then(r => r.json())
      .then(pianistData => setAllPianists(pianistData))
  }, [])

  return (
    <div>
      <h1>All pianists</h1>
      <ul>
        {allPianists.map((pianist) => <li key={pianist.id}>{pianist.name}</li>)}
      </ul>
    </div>
  )
}

export default AllPianists;
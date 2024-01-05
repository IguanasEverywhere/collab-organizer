import React from 'react';
import { useSelector } from 'react-redux';

function AllEvents() {

  const viewMode = useSelector(state => state.viewMode)
  console.log(viewMode)
  return (
    <div>
      All Events
      <h3>{viewMode.value}</h3>
    </div>
  )
}

export default AllEvents;
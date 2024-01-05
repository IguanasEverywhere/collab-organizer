import React from 'react';
import { Counter } from '../../features/Counter';
import { Link } from 'react-router-dom'

function AllEvents() {
  return (
    <div>
      All Events
      <Counter />
      <Link to="/pianists"><button>Go To Pianists</button></Link>
    </div>
  )
}

export default AllEvents;
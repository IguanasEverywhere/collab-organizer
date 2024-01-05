import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { changeView } from '../../reduxSlices/darkModeSlice';


function NavBar() {

  const viewMode = useSelector(state => state.viewMode.value)
  const dispatch = useDispatch();


  const handleDarkClick = () => {
    dispatch(changeView())
  }

  return (
    <div>
      NavBar
      <h5>{viewMode}</h5>
      <Link to='/events'>Events</Link>
      <Link to='/pianists'>Pianists</Link>
      <button onClick={handleDarkClick}>Toggle Light Mode / Dark Mode</button>
    </div>
  )
}

export default NavBar;

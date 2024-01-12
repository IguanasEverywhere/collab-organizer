import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { changeView } from '../../reduxSlices/darkModeSlice';
import { changeLoggedInUser } from '../../reduxSlices/loggedInUserSlice';
import lightStyles from './NavBarLight.module.css';
import darkStyles from './NavBarDark.module.css';


function NavBar() {

  const viewMode = useSelector(state => state.viewMode.value)
  const coordinator = useSelector(state => state.loggedInUser.value)

  const dispatch = useDispatch();
  const history = useHistory();

  const handleDarkClick = () => {
    let newView = viewMode === 'light' ? 'dark' : 'light'
    dispatch(changeView(newView))
    // maybe here is where you do the fetch PATCH to change it
    fetch(`/api/coordinator/${coordinator.payload.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 'viewMode': newView })
    }).then(r => r.json()).then(console.log('changed view'))

  }

  const handleLogout = () => {
    // fetch(`/api/coordinator/${coordinator.payload.id}`, {
    //   method: 'PATCH',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({ 'viewMode': viewMode })
    // }).then(r => r.json()).then(
      fetch('/api/logout', {
        method: 'DELETE',
      }).then(r => {
        history.push('/')
        dispatch(changeLoggedInUser(null))
      })//)
  }

  const currentStyle = viewMode === "light" ? lightStyles : darkStyles

  return (
    <div className={currentStyle.header}>
      <Link to='/events'>Events</Link>
      <Link to='/pianists'>Pianists</Link>
      <Link to='/students'>Students</Link>
      <p onClick={handleLogout}>Logout</p>
      <button onClick={handleDarkClick}>Toggle Light Mode / Dark Mode</button>
      <h2>{coordinator.username}</h2>
    </div>
  )
}

export default NavBar;

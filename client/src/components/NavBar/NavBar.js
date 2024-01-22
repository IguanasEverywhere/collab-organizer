import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
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

    fetch(`/api/coordinator/${coordinator.payload.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 'viewMode': newView })
    }).then(r => r.json())

  }

  const handleLogout = () => {
    fetch('/api/logout', {
      method: 'DELETE',
    }).then(r => {
      history.push('/')
      dispatch(changeLoggedInUser(null))
    })
  }

  const currentStyle = viewMode === "light" ? lightStyles : darkStyles

  return (
    <div className={currentStyle.header}>
      <h2>🎵🎹PianOrganizer</h2>
      <NavLink
        to='/welcome'
        className={(isActive) => (isActive ? currentStyle.navLink : currentStyle.unSelectedNavLink)}>Home
      </NavLink>

      <NavLink
        to='/events'
        className={(isActive) => (isActive ? currentStyle.navLink : currentStyle.unSelectedNavLink)}>Events
      </NavLink>

      <NavLink
      to='/pianists'
      className={(isActive) => (isActive ? currentStyle.navLink : currentStyle.unSelectedNavLink)}>Pianists
      </NavLink>

      <NavLink
      to='/students'
      className={(isActive) => (isActive ? currentStyle.navLink : currentStyle.unSelectedNavLink)}>Students
      </NavLink>


      <p onClick={handleLogout}>Logout</p>
      <button className={currentStyle.darkModeBtn} onClick={handleDarkClick}>☀️ / 🌙</button>
      <h2>{coordinator.username}</h2>
    </div>
  )
}

export default NavBar;

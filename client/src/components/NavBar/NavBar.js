import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { changeView } from '../../reduxSlices/darkModeSlice';
import { changeLoggedInUser } from '../../reduxSlices/loggedInUserSlice';
import styles from './NavBar.module.css';


function NavBar() {

  const viewMode = useSelector(state => state.viewMode.value)
  const coordinator = useSelector(state => state.loggedInUser.value)

  const dispatch = useDispatch();
  const history = useHistory();


  const handleDarkClick = () => {
    let newView = viewMode === 'light' ? 'dark' : 'light'
    dispatch(changeView(newView))
  }

  const handleLogout = () => {
    fetch(`/api/coordinator/${coordinator.payload.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({'viewMode': viewMode})
    }).then(r => r.json()).then(
      fetch('/api/logout', {
        method: 'DELETE',
      }).then(r => {
        history.push('/')
        dispatch(changeLoggedInUser(null))
      }))
  }

  return (
    <div className={styles.header}>
      NavBar
      <h5>{viewMode}</h5>
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

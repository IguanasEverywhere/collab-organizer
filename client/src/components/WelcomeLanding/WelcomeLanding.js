import React from 'react';
import {useSelector} from 'react-redux';
import lightStyles from './WelcomeLandingLight.module.css';
import darkStyles from './WelcomeLandingDark.module.css';

function WelcomeLanding() {

  const viewMode = useSelector(state => state.viewMode.value)

  const currentStyle = viewMode === "light" ? lightStyles : darkStyles

  return (
    <div className={currentStyle.body}>
      <h1>Welcome!</h1>
    </div>
  )
}

export default WelcomeLanding;
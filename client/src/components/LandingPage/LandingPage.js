import React from 'react';
import Login from '../Login/Login';
import styles from './LandingPage.module.css';
import logoImg  from '../../assets/pianowithSinger.jpeg'

function LandingPage() {

  return (

    <div className={styles.landingPageBody}>

      <section className={styles.landingTop}>
        <div className={styles.landingTopLeft}>
          <h2>PianOrganizer ♫</h2>
          <h1 className={styles.subTitle}>The tool for organizing all your Collaborative Pianist Projects</h1>
          <button className={styles.signUpBtn}>Sign Up</button>
        </div>
        <div className={styles.landingTopRight}>
          <Login />
          <p className={styles.featuresHeading}>With <em>PianOrganizer</em>, you can:</p>
          <ul>
            <li>Easily view all recitals, juries, and other events for your organization</li>
            <li>Create new events, delete old events, and edit existing events</li>
            <li>Manage pianist assignments</li>
            <li>...and much more!</li>
          </ul>
          <img
          src={logoImg}
          alt="logo-img"
          className={styles.logoImg}></img>
        </div>


      </section>
      <section className={styles.landingMiddle}>
        Middle section
      </section>

      <section className={styles.landingBottom}>

        <h2>Login thing goes here</h2>
        <Login />
      </section>

    </div>
  )
}

export default LandingPage;
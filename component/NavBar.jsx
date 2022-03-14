import React,{ useState } from 'react'

import Avatar from 'react-avatar';
import styles from '../styles/NavBar.module.css';

function NavBar() {

  const [showMe, setShowMe] = useState(false);
  

  function toggle(){
    setShowMe(!showMe);
  }
  return (

    <div className={styles.navBarContainer}>
      <div className={styles.avtarProfile} onClick={toggle}>
      <Avatar color={Avatar.getRandomColor( ['red' , 'cyan'])} name="Foo Bar" round={true} size="70"/>
      </div>
     
    
      <div style={{
        display: showMe?"block":"none"
      }} className={styles.avatarMenu} >
      
        <div className={styles.arrowUp}></div>
        <div className={styles.MenuContainer}>
          <div className={styles.menuItem} onClick={()=>handleMenuAvatar('\profile')} >
            Profile
          </div>
          <div className={styles.menuItem}>
            Dashboard
          </div>
          <div className={styles.menuItem}>
            Setting
          </div>
          <div className={styles.menuItem}>
            Logout
          </div>
        </div>
      </div>
    </div>
  )
}

export default NavBar
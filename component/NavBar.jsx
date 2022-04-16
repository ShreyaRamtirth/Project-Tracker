import React,{ useState, useEffect } from 'react'

import Avatar from 'react-avatar';
import styles from '../styles/NavBar.module.css';
import cookieCutter from "cookie-cutter";
function NavBar() {

  const [showMe, setShowMe] = useState(false);
  const [username, setUsername] = useState("");
  useEffect(() => {
    setUsername(cookieCutter.get("username"));
    
  }, []);

  function toggle(){
    setShowMe(!showMe);
  }
  return (

    <div className={styles.navBarContainer}>
      <div className={styles.avtarProfile} onClick={toggle}>
      <Avatar color={Avatar.getRandomColor( ['red' , 'cyan'])} name={username} round={true} size="70"/>
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
            Logout
          </div>
        </div>
      </div>
    </div>
  )
}

export default NavBar
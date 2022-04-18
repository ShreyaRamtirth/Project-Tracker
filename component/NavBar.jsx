import React,{ useState, useEffect } from 'react'
import Link from "next/link";
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
          <div className={styles.menuItem} >
            <Link href="/profileinfo">
                <a>Profile</a>
              </Link>
          </div>
          <div className={styles.menuItem}>
            <Link href="/dashboard">
                <a>Dashboard</a>
              </Link>
          </div>
          <div className={styles.menuItem}>
          <Link href="/">
                <a onClick={()=>{
                  cookieCutter.set("jwt","");
                  cookieCutter.set("role","");
                  cookieCutter.set("username","");
                 console.log( "done" ); 
              }} >Logout</a>
              </Link>
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default NavBar
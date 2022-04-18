import Sidebarmenu from "./Sidebarmenu";
import styles from '../styles/Layout.module.css';
import {authenticateUser} from "./authenticateUser";
import NavBar from "./NavBar";

const Layout=( {children} )=>{
  
    if( children.type.name === 'Home' || children.type.name === 'forgotpass' || children.type.name === 'resetpass' || children.type.name === 'getuser' ){
        return(
            <>
                {children}
            </>
        )
    }    
    else{
      
        if(authenticateUser())
        {
            console.log("true");
        return(

            <div className={styles.bodyContainer} >
                <div className={styles.sidebarContainer}>
                    <Sidebarmenu />
                    
                </div>
                
                <div className={styles.mainContainer}>
                <NavBar></NavBar>
                 {children}</div>
            </div>
        )}else
        {
            console.log("false");
            return (<div></div>)
        }
    }
}
export default Layout;
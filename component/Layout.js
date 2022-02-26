import Sidebarmenu from "./Sidebarmenu";
import styles from '../styles/Layout.module.css';
const Layout=( {children} )=>{
    console.log(children.type.name);
  
    if( children.type.name === 'Home' ){
        return(
            <>
                {children}
            </>
        )
    }    
    else{
        return(
            <div className={styles.bodyContainer}>
                <div className={styles.sidebarContainer}>
                    <Sidebarmenu />
                </div>
                <div className={styles.mainContainer}>
                 {children}</div>
            </div>
        )
    }
}
export default Layout;
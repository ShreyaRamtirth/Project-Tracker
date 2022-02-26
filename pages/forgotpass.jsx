import React from 'react'
import ReactCodeInput from 'react-verification-code-input';
import styles from '../styles/Home.module.css';
import image from '../public/Vias-Logo.png';
import Image from 'next/image';
import { ToastContainer, toast } from 'react-toastify';
function forgotpass() {

    const verify=()=>{
        
    }
  return (
    <div>
         <form className="w-full" >
    <div className={styles.LoginPage}>
        <div className={styles.loginbox}>
            <div className={styles.loginlogo}>
                {/* Login */}
                <Image src={image} />
            </div>
         
            <div className={styles.loginContainer}>
            <div className={styles.loginText}>Verify to reset your password</div>
            <div className={styles.usernameBox}>
                <span className={styles.LabelUsername}><p>Enter Code Here</p></span>
                <ReactCodeInput  />
            </div>
            
            {/* <div className={styles.passwordBox}>
                <span className={styles.LabelPassword}><RiLockPasswordFill /></span>
                 <input className={passerror ? styles.TextPassword : styles.errorline}
                            type="password" 
                            onChange={s=> {setPasswordFields(s.target.value) , Formvalidation()  }} 
                            autoComplete="off"
                            required
                            />
            </div> */}
            {/* {passerror ?  '' : <p className={styles.error}>Your Password is invalid</p> } */}
            <div className={styles.Loginbutton}>
                <span><input   className={styles.loginBtn} type="button" value="Verify"/></span>
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    />
                    <ToastContainer />
            </div>
            <div className={styles.forgot}>
                <span className={styles.forgotText}>Back to Login</span>
            </div>
            </div>
        </div>
    </div>
    </form>
    </div>
  )
}

export default forgotpass